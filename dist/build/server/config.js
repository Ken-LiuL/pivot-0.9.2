"use strict";
var path = require('path');
var nopt = require('nopt');
var general_1 = require('../common/utils/general/general');
var index_1 = require('../common/models/index');
var yaml_helper_1 = require('../common/utils/yaml-helper/yaml-helper');
var server_settings_1 = require('./models/server-settings/server-settings');
var index_2 = require('./utils/index');
var AUTH_MODULE_VERSION = 1;
var PACKAGE_FILE = path.join(__dirname, '../../package.json');
function exitWithMessage(message) {
    console.log(message);
    // Hack: load the package file for no reason other than to make some time for console.log to flush
    try {
        index_2.loadFileSync(PACKAGE_FILE, 'json');
    }
    catch (e) { }
    process.exit();
}
function exitWithError(message) {
    console.error(message);
    process.exit(1);
}
function zeroOne(thing) {
    return Number(Boolean(thing));
}
var packageObj = null;
try {
    packageObj = index_2.loadFileSync(PACKAGE_FILE, 'json');
}
catch (e) {
    exitWithError("Could not read package.json: " + e.message);
}
exports.VERSION = packageObj.version;
var USAGE = "\nUsage: pivot [options]\n\nPossible usage:\n\n  pivot --examples\n  pivot --druid your.broker.host:8082\n\nGeneral arguments:\n\n      --help                   Print this help message\n      --version                Display the version number\n  -v, --verbose                Display the DB queries that are being made\n\nServer arguments:\n\n  -p, --port <port-number>     The port pivot will run on (default: " + server_settings_1.ServerSettings.DEFAULT_PORT + ")\n      \nData connection options:      \n  \n  Exactly one data connection option must be provided. \n  \n  -c, --config <path>          Use this local configuration (YAML) file\n      --examples               Start Pivot with some example data for testing / demo  \n  -f, --file <path>            Start Pivot on top of this file based data source (must be JSON, CSV, or TSV)\n  -d, --druid <host>           The Druid broker node to connect to\n      --postgres <host>        The Postgres cluster to connect to\n      --mysql <host>           The MySQL cluster to connect to\n      \n      --user <string>          The cluster 'user' (if needed)\n      --password <string>      The cluster 'password' (if needed)\n      --database <string>      The cluster 'database' (if needed)\n\nConfiguration printing utilities:      \n      \n      --print-config           Prints out the auto generated config\n      --with-comments          Adds comments when printing the auto generated config\n";
function parseArgs() {
    return nopt({
        "help": Boolean,
        "version": Boolean,
        "verbose": Boolean,
        "port": Number,
        "examples": Boolean,
        "example": String,
        "config": String,
        "print-config": Boolean,
        "with-comments": Boolean,
        "file": String,
        "druid": String,
        "postgres": String,
        "mysql": String,
        "user": String,
        "password": String,
        "database": String
    }, {
        "v": ["--verbose"],
        "p": ["--port"],
        "c": ["--config"],
        "f": ["--file"],
        "d": ["--druid"]
    }, process.argv);
}
var parsedArgs = parseArgs();
//console.log(parsedArgs);
if (parsedArgs['help']) {
    exitWithMessage(USAGE);
}
if (parsedArgs['version']) {
    exitWithMessage(exports.VERSION);
}
if (parsedArgs['example']) {
    delete parsedArgs['example'];
    parsedArgs['examples'] = true;
}
var SETTINGS_INPUTS = ['config', 'examples', 'file', 'druid', 'postgres', 'mysql'];
var numSettingsInputs = general_1.arraySum(SETTINGS_INPUTS.map(function (input) { return zeroOne(parsedArgs[input]); }));
if (numSettingsInputs === 0) {
    exitWithMessage(USAGE);
}
if (numSettingsInputs > 1) {
    console.error("only one of --" + SETTINGS_INPUTS.join(', --') + " can be given on the command line");
    if (parsedArgs['druid'] && parsedArgs['config']) {
        console.error("Looks like you are using --config and --druid in conjunction with each other");
        console.error("This usage is no longer supported. If you are migrating from Pivot < 0.9.x");
        console.error("Please visit: (https://github.com/implydata/pivot/blob/master/docs/pivot-0.9.x-migration.md)");
    }
    process.exit(1);
}
exports.PRINT_CONFIG = Boolean(parsedArgs['print-config']);
exports.START_SERVER = !exports.PRINT_CONFIG;
var LOGGER = exports.START_SERVER ? index_2.CONSOLE_LOGGER : index_2.NULL_LOGGER;
if (exports.START_SERVER) {
    LOGGER.log("Starting Pivot v" + exports.VERSION);
}
var serverSettingsFilePath = parsedArgs['config'];
if (parsedArgs['examples']) {
    serverSettingsFilePath = path.join(__dirname, "../../config-examples.yaml");
}
var anchorPath;
var serverSettingsJS;
if (serverSettingsFilePath) {
    anchorPath = path.dirname(serverSettingsFilePath);
    try {
        serverSettingsJS = index_2.loadFileSync(serverSettingsFilePath, 'yaml');
        LOGGER.log("Using config " + serverSettingsFilePath);
    }
    catch (e) {
        exitWithError("Could not load config from '" + serverSettingsFilePath + "': " + e.message);
    }
}
else {
    anchorPath = process.cwd();
    serverSettingsJS = {};
}
if (parsedArgs['port']) {
    serverSettingsJS.port = parsedArgs['port'];
}
exports.SERVER_SETTINGS = server_settings_1.ServerSettings.fromJS(serverSettingsJS, anchorPath);
// --- Auth -------------------------------
var auth = serverSettingsJS.auth;
var authModule = null;
if (auth) {
    auth = path.resolve(anchorPath, auth);
    LOGGER.log("Using auth " + auth);
    try {
        authModule = require(auth);
    }
    catch (e) {
        exitWithError("error loading auth module: " + e.message);
    }
    if (authModule.version !== AUTH_MODULE_VERSION) {
        exitWithError("incorrect auth module version " + authModule.version + " needed " + AUTH_MODULE_VERSION);
    }
    if (typeof authModule.auth !== 'function')
        exitWithError('Invalid auth module');
}
exports.AUTH = authModule;
// --- Location -------------------------------
var CLUSTER_TYPES = ['druid', 'postgres', 'mysql'];
var settingsLocation = null;
if (serverSettingsFilePath) {
    settingsLocation = {
        location: 'local',
        readOnly: false,
        uri: serverSettingsFilePath
    };
}
else {
    var initAppSettings = index_1.AppSettings.BLANK;
    // If a file is specified add it as a dataSource
    var fileToLoad = parsedArgs['file'];
    if (fileToLoad) {
        initAppSettings = initAppSettings.addDataSource(new index_1.DataSource({
            name: path.basename(fileToLoad, path.extname(fileToLoad)),
            engine: 'native',
            source: fileToLoad
        }));
    }
    for (var _i = 0, CLUSTER_TYPES_1 = CLUSTER_TYPES; _i < CLUSTER_TYPES_1.length; _i++) {
        var clusterType = CLUSTER_TYPES_1[_i];
        var host = parsedArgs[clusterType];
        if (host) {
            initAppSettings = initAppSettings.addCluster(new index_1.Cluster({
                name: clusterType,
                type: clusterType,
                host: host,
                sourceListScan: 'auto',
                sourceListRefreshInterval: 15000,
                user: parsedArgs['user'],
                password: parsedArgs['password'],
                database: parsedArgs['database']
            }));
        }
    }
    settingsLocation = {
        location: 'transient',
        readOnly: false,
        initAppSettings: initAppSettings
    };
}

exports.VERBOSE = Boolean(parsedArgs['verbose'] || serverSettingsJS.verbose);
exports.SETTINGS_MANAGER = new index_2.SettingsManager(settingsLocation, {
    logger: LOGGER,
    verbose: exports.VERBOSE,
    anchorPath: anchorPath,
    initialLoadTimeout: exports.SERVER_SETTINGS.pageMustLoadTimeout
});
// --- Printing -------------------------------
if (exports.PRINT_CONFIG) {
    var withComments = Boolean(parsedArgs['with-comments']);
    exports.SETTINGS_MANAGER.getSettings({
        timeout: 10000
    }).then(function (appSettings) {
        var dataSources = appSettings.dataSources, clusters = appSettings.clusters;
        if (!dataSources.length)
            throw new Error('Could not find any data sources, please verify network connectivity');
        var lines = [
            ("# generated by Pivot version " + exports.VERSION),
            ("# for a more detailed walk-through go to: https://github.com/implydata/pivot/blob/v" + exports.VERSION + "/docs/configuration.md"),
            ''
        ];
        if (exports.VERBOSE) {
            if (withComments) {
                lines.push("# Run Pivot in verbose mode so it prints out the queries that it issues");
            }
            lines.push("verbose: true", '');
        }
        if (withComments) {
            lines.push("# The port on which the Pivot server will listen on");
        }
        lines.push("port: " + exports.SERVER_SETTINGS.port, '');
        if (clusters.length) {
            lines.push('clusters:');
            lines = lines.concat.apply(lines, clusters.map(function (c) { return yaml_helper_1.clusterToYAML(c, withComments); }));
        }
        lines.push('dataSources:');
        lines = lines.concat.apply(lines, dataSources.map(function (d) { return yaml_helper_1.dataSourceToYAML(d, withComments); }));
        console.log(lines.join('\n'));
    }).catch(function (e) {
        exitWithError("There was an error generating a config: " + e.message);
    });
}

