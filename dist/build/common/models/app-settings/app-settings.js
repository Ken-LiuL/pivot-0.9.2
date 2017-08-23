"use strict";
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var general_1 = require('../../utils/general/general');
var cluster_1 = require('../cluster/cluster');
var customization_1 = require('../customization/customization');
var data_source_1 = require('../data-source/data-source');
var link_view_config_1 = require('../link-view-config/link-view-config');
var check;
var AppSettings = (function () {
    function AppSettings(parameters) {
        var clusters = parameters.clusters, customization = parameters.customization, dataSources = parameters.dataSources, linkViewConfig = parameters.linkViewConfig;
        for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
            var dataSource = dataSources_1[_i];
            if (dataSource.engine === 'native')
                continue;
            if (!plywood_1.helper.findByName(clusters, dataSource.engine)) {
                throw new Error("data source " + dataSource.name + " refers to an unknown cluster " + dataSource.engine);
            }
        }
        this.clusters = clusters;
        this.customization = customization;
        this.dataSources = dataSources;
        this.linkViewConfig = linkViewConfig;
    }
    AppSettings.isAppSettings = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, AppSettings);
    };
    AppSettings.fromJS = function (parameters, context) {
        if (!context)
            throw new Error('AppSettings must have context');
        var clusters;
        if (parameters.clusters) {
            clusters = parameters.clusters.map(function (cluster) { return cluster_1.Cluster.fromJS(cluster); });
        }
        else if (general_1.hasOwnProperty(parameters, 'druidHost') || general_1.hasOwnProperty(parameters, 'brokerHost')) {
            var clusterJS = JSON.parse(JSON.stringify(parameters));
            clusterJS.name = 'druid';
            clusterJS.type = 'druid';
            clusterJS.host = clusterJS.druidHost || clusterJS.brokerHost;
            clusters = [cluster_1.Cluster.fromJS(clusterJS)];
        }
        else {
            clusters = [];
        }
        var executorFactory = context.executorFactory;
        var dataSources = (parameters.dataSources || []).map(function (dataSource) {
            var dataSourceEngine = dataSource.engine;
            if (dataSourceEngine !== 'native') {
                var cluster = plywood_1.helper.findByName(clusters, dataSourceEngine);
                if (!cluster)
                    throw new Error("Can not find cluster '" + dataSourceEngine + "' for data source '" + dataSource.name + "'");
            }
            var dataSourceObject = data_source_1.DataSource.fromJS(dataSource, { cluster: cluster });
            if (executorFactory) {
                var executor = executorFactory(dataSourceObject);
                if (executor)
                    dataSourceObject = dataSourceObject.attachExecutor(executor);
            }
            return dataSourceObject;
        });
        var value = {
            clusters: clusters,
            customization: customization_1.Customization.fromJS(parameters.customization || {}),
            dataSources: dataSources,
            linkViewConfig: parameters.linkViewConfig ? link_view_config_1.LinkViewConfig.fromJS(parameters.linkViewConfig, { dataSources: dataSources, visualizations: context.visualizations }) : null
        };
        return new AppSettings(value);
    };
    AppSettings.prototype.valueOf = function () {
        return {
            clusters: this.clusters,
            customization: this.customization,
            dataSources: this.dataSources,
            linkViewConfig: this.linkViewConfig
        };
    };
    AppSettings.prototype.toJS = function () {
        var js = {};
        js.clusters = this.clusters.map(function (cluster) { return cluster.toJS(); });
        js.customization = this.customization.toJS();
        js.dataSources = this.dataSources.map(function (dataSource) { return dataSource.toJS(); });
        if (this.linkViewConfig)
            js.linkViewConfig = this.linkViewConfig.toJS();
        return js;
    };
    AppSettings.prototype.toJSON = function () {
        return this.toJS();
    };
    AppSettings.prototype.toString = function () {
        return "[AppSettings dataSources=" + this.dataSources.length + "]";
    };
    AppSettings.prototype.equals = function (other) {
        return AppSettings.isAppSettings(other) &&
            immutable_class_1.immutableArraysEqual(this.clusters, other.clusters) &&
            immutable_class_1.immutableEqual(this.customization, other.customization) &&
            immutable_class_1.immutableArraysEqual(this.dataSources, other.dataSources) &&
            Boolean(this.linkViewConfig) === Boolean(other.linkViewConfig);
    };
    AppSettings.prototype.toClientSettings = function () {
        var value = this.valueOf();
        value.clusters = value.clusters.map(function (c) { return c.toClientCluster(); });
        value.dataSources = value.dataSources
            .filter(function (ds) { return ds.isQueryable(); })
            .map(function (ds) { return ds.toClientDataSource(); });
        return new AppSettings(value);
    };
    AppSettings.prototype.getDataSourcesForCluster = function (clusterName) {
        return this.dataSources.filter(function (dataSource) { return dataSource.engine === clusterName; });
    };
    AppSettings.prototype.getDataSource = function (dataSourceName) {
        return plywood_1.helper.findByName(this.dataSources, dataSourceName);
    };
    AppSettings.prototype.addOrUpdateDataSource = function (dataSource) {
        var value = this.valueOf();
        value.dataSources = plywood_1.helper.overrideByName(value.dataSources, dataSource);
        return new AppSettings(value);
    };
    AppSettings.prototype.attachExecutors = function (executorFactory) {
        var value = this.valueOf();
        value.dataSources = value.dataSources.map(function (ds) {
            var executor = executorFactory(ds);
            if (executor)
                ds = ds.attachExecutor(executor);
            return ds;
        });
        return new AppSettings(value);
    };
    AppSettings.prototype.changeCustomization = function (customization) {
        var value = this.valueOf();
        value.customization = customization;
        return new AppSettings(value);
    };
    AppSettings.prototype.changeClusters = function (clusters) {
        var value = this.valueOf();
        value.clusters = clusters;
        return new AppSettings(value);
    };
    AppSettings.prototype.addCluster = function (cluster) {
        return this.changeClusters(plywood_1.helper.overrideByName(this.clusters, cluster));
    };
    AppSettings.prototype.changeDataSources = function (dataSources) {
        var value = this.valueOf();
        value.dataSources = dataSources;
        return new AppSettings(value);
    };
    AppSettings.prototype.addDataSource = function (dataSource) {
        return this.changeDataSources(plywood_1.helper.overrideByName(this.dataSources, dataSource));
    };
    AppSettings.BLANK = AppSettings.fromJS({}, { visualizations: [] });
    return AppSettings;
}());
exports.AppSettings = AppSettings;
check = AppSettings;
