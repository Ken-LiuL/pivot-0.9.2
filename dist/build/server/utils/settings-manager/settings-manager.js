"use strict";
var Q = require('q');
var plywood_1 = require('plywood');
var general_1 = require('../../../common/utils/general/general');
var index_1 = require('../../../common/models/index');
var index_2 = require('../../../common/manifests/index');
var file_1 = require('../file/file');
var file_manager_1 = require('../file-manager/file-manager');
var cluster_manager_1 = require('../cluster-manager/cluster-manager');
var updater_1 = require('../updater/updater');
var SettingsManager = (function () {
    function SettingsManager(settingsLocation, options) {
        var _this = this;
        var logger = options.logger;
        this.logger = logger;
        this.verbose = Boolean(options.verbose);
        this.anchorPath = options.anchorPath;
        this.settingsLocation = settingsLocation;
        this.fileManagers = [];
        this.clusterManagers = [];
        this.initialLoadTimeout = options.initialLoadTimeout || 30000;
        this.appSettings = index_1.AppSettings.BLANK;
        switch (settingsLocation.location) {
            case 'transient':
                this.currentWork = settingsLocation.initAppSettings ? this.reviseSettings(settingsLocation.initAppSettings) : Q(null);
                break;
            case 'local':
                this.currentWork = Q.fcall(function () {
                    var appSettingsJS = file_1.loadFileSync(settingsLocation.uri, 'yaml');
                    appSettingsJS = general_1.inlineVars(appSettingsJS, process.env);
                    return index_1.AppSettings.fromJS(appSettingsJS, { visualizations: index_2.MANIFESTS });
                })
                    .then(function (appSettings) {
                    return _this.reviseSettings(appSettings);
                })
                    .catch(function (e) {
                    logger.error("Fatal settings load error: " + e.message);
                    throw e;
                });
                break;
            default:
                throw new Error("unknown location " + settingsLocation.location);
        }
        this.makeMaxTimeCheckTimer();
    }
    SettingsManager.prototype.addClusterManager = function (cluster, dataSources) {
        var _a = this, verbose = _a.verbose, logger = _a.logger, anchorPath = _a.anchorPath;
        var initialExternals = dataSources.map(function (dataSource) {
            return {
                name: dataSource.name,
                external: dataSource.toExternal(),
                suppressIntrospection: dataSource.introspection === 'none'
            };
        });
        // Make a cluster manager for each cluster and assign the correct initial externals to it.
        logger.log("Adding cluster manager for '" + cluster.name + "' with " + general_1.pluralIfNeeded(dataSources.length, 'dataSource'));
        var clusterManager = new cluster_manager_1.ClusterManager(cluster, {
            logger: logger,
            verbose: verbose,
            anchorPath: anchorPath,
            initialExternals: initialExternals,
            onExternalChange: this.onExternalChange.bind(this, cluster),
            generateExternalName: this.generateDataSourceName.bind(this)
        });
        this.clusterManagers.push(clusterManager);
        return clusterManager.init();
    };
    SettingsManager.prototype.removeClusterManager = function (cluster) {
        this.clusterManagers = this.clusterManagers.filter(function (clusterManager) {
            if (clusterManager.cluster.name !== cluster.name)
                return true;
            clusterManager.destroy();
            return false;
        });
    };
    SettingsManager.prototype.addFileManager = function (dataSource) {
        if (dataSource.engine !== 'native')
            throw new Error("data source '" + dataSource.name + "' must be native to have a file manager");
        var _a = this, verbose = _a.verbose, logger = _a.logger, anchorPath = _a.anchorPath;
        var fileManager = new file_manager_1.FileManager({
            logger: logger,
            verbose: verbose,
            anchorPath: anchorPath,
            uri: dataSource.source,
            onDatasetChange: this.onDatasetChange.bind(this, dataSource.name)
        });
        this.fileManagers.push(fileManager);
        return fileManager.init();
    };
    SettingsManager.prototype.removeFileManager = function (dataSource) {
        if (dataSource.engine !== 'native')
            throw new Error("data source '" + dataSource.name + "' must be native to have a file manager");
        this.fileManagers = this.fileManagers.filter(function (fileManager) {
            if (fileManager.uri !== dataSource.source)
                return true;
            fileManager.destroy();
            return false;
        });
    };
    SettingsManager.prototype.getSettings = function (opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        var currentWork = this.currentWork;
        // Refresh all clusters
        var currentWork = currentWork.then(function () {
            // ToDo: utilize dataSourceOfInterest
            return Q.all(_this.clusterManagers.map(function (clusterManager) { return clusterManager.refresh(); }));
        });
        var timeout = opts.timeout || this.initialLoadTimeout;
        if (timeout !== 0) {
            currentWork = currentWork.timeout(timeout)
                .catch(function (e) {
                _this.logger.error("Settings load timeout hit, continuing");
            });
        }
        return currentWork.then(function () { return _this.appSettings; });
    };
    SettingsManager.prototype.reviseSettings = function (newSettings) {
        var tasks = [
            this.reviseClusters(newSettings),
            this.reviseDataSources(newSettings)
        ];
        this.appSettings = newSettings;
        return Q.all(tasks);
    };
    SettingsManager.prototype.reviseClusters = function (newSettings) {
        var _this = this;
        var _a = this, verbose = _a.verbose, logger = _a.logger;
        var oldSettings = this.appSettings;
        var tasks = [];
        updater_1.updater(oldSettings.clusters, newSettings.clusters, {
            onExit: function (oldCluster) {
                _this.removeClusterManager(oldCluster);
            },
            onUpdate: function (newCluster) {
                logger.log(newCluster.name + " UPDATED cluster");
            },
            onEnter: function (newCluster) {
                tasks.push(_this.addClusterManager(newCluster, newSettings.getDataSourcesForCluster(newCluster.name)));
            }
        });
        return Q.all(tasks);
    };
    SettingsManager.prototype.reviseDataSources = function (newSettings) {
        var _this = this;
        var _a = this, verbose = _a.verbose, logger = _a.logger;
        var oldSettings = this.appSettings;
        var tasks = [];
        var oldNativeDataSources = oldSettings.getDataSourcesForCluster('native');
        var newNativeDataSources = newSettings.getDataSourcesForCluster('native');
        updater_1.updater(oldNativeDataSources, newNativeDataSources, {
            onExit: function (oldDataSource) {
                if (oldDataSource.engine === 'native') {
                    _this.removeFileManager(oldDataSource);
                }
                else {
                    throw new Error("only native datasources work for now"); // ToDo: fix
                }
            },
            onUpdate: function (newDataSource) {
                logger.log(newDataSource.name + " UPDATED datasource");
            },
            onEnter: function (newDataSource) {
                if (newDataSource.engine === 'native') {
                    tasks.push(_this.addFileManager(newDataSource));
                }
                else {
                    throw new Error("only native datasources work for now"); // ToDo: fix
                }
            }
        });
        return Q.all(tasks);
    };
    SettingsManager.prototype.updateSettings = function (newSettings) {
        if (this.settingsLocation.readOnly)
            return Q.reject(new Error('must be writable'));
        var clusterManagers = this.clusterManagers;
        this.appSettings = newSettings.attachExecutors(function (dataSource) {
            if (dataSource.engine === 'native') {
                return null; // ToDo: fix this.
            }
            else {
                for (var _i = 0, clusterManagers_1 = clusterManagers; _i < clusterManagers_1.length; _i++) {
                    var clusterManager = clusterManagers_1[_i];
                    if (clusterManager.cluster.name === dataSource.engine) {
                        var external = clusterManager.getExternalByName(dataSource.name);
                        if (!external)
                            return null;
                        return plywood_1.basicExecutorFactory({
                            datasets: { main: external }
                        });
                    }
                }
            }
            return null;
        });
        return Q(null); // ToDo: actually save settings
    };
    SettingsManager.prototype.generateDataSourceName = function (external) {
        var appSettings = this.appSettings;
        var source = String(external.source);
        var candidateName = source;
        var i = 0;
        while (appSettings.getDataSource(candidateName)) {
            i++;
            candidateName = source + i;
        }
        return candidateName;
    };
    SettingsManager.prototype.onDatasetChange = function (dataSourceName, changedDataset) {
        var _a = this, logger = _a.logger, verbose = _a.verbose;
        logger.log("Got native dataset update for " + dataSourceName);
        var dataSource = this.appSettings.getDataSource(dataSourceName);
        if (!dataSource)
            throw new Error("Unknown dataset " + dataSourceName);
        this.appSettings = this.appSettings.addOrUpdateDataSource(dataSource.updateWithDataset(changedDataset));
    };
    SettingsManager.prototype.onExternalChange = function (cluster, dataSourceName, changedExternal) {
        if (!changedExternal.attributes || !changedExternal.requester)
            return;
        var _a = this, logger = _a.logger, verbose = _a.verbose;
        logger.log("Got queryable external dataset update for " + dataSourceName + " in cluster " + cluster.name);
        var dataSource = this.appSettings.getDataSource(dataSourceName);
        if (!dataSource) {
            logger.log("Adding Data Cube: '" + dataSourceName + "'");
            dataSource = index_1.DataSource.fromClusterAndExternal(dataSourceName, cluster, changedExternal);
        }
        dataSource = dataSource.updateWithExternal(changedExternal);
        this.appSettings = this.appSettings.addOrUpdateDataSource(dataSource);
        return this.updateDataSourceMaxTime(dataSource);
    };
    SettingsManager.prototype.makeMaxTimeCheckTimer = function () {
        var _this = this;
        var logger = this.logger;
        // Periodically check if max time needs to be updated
        setInterval(function () {
            _this.appSettings.dataSources.forEach(function (dataSource) {
                _this.updateDataSourceMaxTime(dataSource);
            });
        }, 1000).unref();
    };
    SettingsManager.prototype.updateDataSourceMaxTime = function (dataSource) {
        var _this = this;
        var _a = this, logger = _a.logger, verbose = _a.verbose;
        if (dataSource.refreshRule.isQuery() && dataSource.shouldUpdateMaxTime()) {
            return index_1.DataSource.updateMaxTime(dataSource)
                .then(function (updatedDataSource) {
                logger.log("Getting the latest MaxTime for '" + updatedDataSource.name + "'");
                _this.appSettings = _this.appSettings.addOrUpdateDataSource(updatedDataSource);
            }, function (e) {
                logger.error("Error getting MaxTime for " + dataSource.name + ": " + e.message);
            });
        }
        else {
            return Q(null);
        }
    };
    return SettingsManager;
}());
exports.SettingsManager = SettingsManager;
