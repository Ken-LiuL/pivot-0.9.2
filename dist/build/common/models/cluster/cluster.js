"use strict";
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var general_1 = require('../../utils/general/general');
function parseIntFromPossibleString(x) {
    return typeof x === 'string' ? parseInt(x, 10) : x;
}
var check;
var Cluster = (function () {
    function Cluster(parameters) {
        var name = parameters.name;
        if (typeof name !== 'string')
            throw new Error('must have name');
        if (name === 'native')
            throw new Error("cluster can not be called 'native'");
        this.name = name;
        this.type = parameters.type;
        general_1.ensureOneOf(this.type, Cluster.TYPE_VALUES, "In cluster '" + this.name + "' type");
        this.host = parameters.host;
        this.version = parameters.version;
        this.timeout = parameters.timeout;
        this.sourceListScan = parameters.sourceListScan;
        if (this.sourceListScan)
            general_1.ensureOneOf(this.sourceListScan, Cluster.SOURCE_LIST_SCAN_VALUES, "In cluster '" + this.name + "' sourceListScan");
        this.sourceListRefreshOnLoad = parameters.sourceListRefreshOnLoad || false;
        this.sourceListRefreshInterval = parameters.sourceListRefreshInterval;
        if (this.sourceListRefreshInterval && this.sourceListRefreshInterval < 1000) {
            throw new Error("can not set sourceListRefreshInterval to < 1000 (is " + this.sourceListRefreshInterval + ")");
        }
        this.sourceReintrospectOnLoad = parameters.sourceReintrospectOnLoad;
        this.sourceReintrospectInterval = parameters.sourceReintrospectInterval;
        if (this.sourceReintrospectInterval && this.sourceReintrospectInterval < 1000) {
            throw new Error("can not set sourceReintrospectInterval to < 1000 (is " + this.sourceReintrospectInterval + ")");
        }
        switch (this.type) {
            case 'druid':
                this.introspectionStrategy = parameters.introspectionStrategy;
                this.requestDecorator = parameters.requestDecorator;
                this.decoratorOptions = parameters.decoratorOptions;
                break;
            case 'mysql':
            case 'postgres':
                this.database = parameters.database;
                this.user = parameters.user;
                this.password = parameters.password;
                break;
        }
    }
    Cluster.isCluster = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Cluster);
    };
    Cluster.fromJS = function (parameters) {
        var name = parameters.name, type = parameters.type, host = parameters.host, version = parameters.version, timeout = parameters.timeout, sourceListScan = parameters.sourceListScan, sourceListRefreshOnLoad = parameters.sourceListRefreshOnLoad, sourceListRefreshInterval = parameters.sourceListRefreshInterval, sourceReintrospectOnLoad = parameters.sourceReintrospectOnLoad, sourceReintrospectInterval = parameters.sourceReintrospectInterval, introspectionStrategy = parameters.introspectionStrategy, requestDecorator = parameters.requestDecorator, decoratorOptions = parameters.decoratorOptions, database = parameters.database, user = parameters.user, password = parameters.password;
        var value = {
            name: name,
            type: type,
            host: host || parameters.druidHost || parameters.brokerHost,
            version: version,
            timeout: parseIntFromPossibleString(timeout),
            sourceListScan: sourceListScan,
            sourceListRefreshOnLoad: sourceListRefreshOnLoad,
            sourceListRefreshInterval: parseIntFromPossibleString(sourceListRefreshInterval),
            sourceReintrospectOnLoad: sourceReintrospectOnLoad,
            sourceReintrospectInterval: parseIntFromPossibleString(sourceReintrospectInterval),
            introspectionStrategy: introspectionStrategy,
            requestDecorator: requestDecorator,
            decoratorOptions: decoratorOptions,
            database: database,
            user: user,
            password: password
        };
        return new Cluster(value);
    };
    Cluster.prototype.valueOf = function () {
        return {
            name: this.name,
            type: this.type,
            host: this.host,
            version: this.version,
            timeout: this.timeout,
            sourceListScan: this.sourceListScan,
            sourceListRefreshOnLoad: this.sourceListRefreshOnLoad,
            sourceListRefreshInterval: this.sourceListRefreshInterval,
            sourceReintrospectOnLoad: this.sourceReintrospectOnLoad,
            sourceReintrospectInterval: this.sourceReintrospectInterval,
            introspectionStrategy: this.introspectionStrategy,
            requestDecorator: this.requestDecorator,
            decoratorOptions: this.decoratorOptions,
            database: this.database,
            user: this.user,
            password: this.password
        };
    };
    Cluster.prototype.toJS = function () {
        var js = {
            name: this.name,
            type: this.type
        };
        if (this.host)
            js.host = this.host;
        if (this.version)
            js.version = this.version;
        if (this.timeout)
            js.timeout = this.timeout;
        if (this.sourceListScan)
            js.sourceListScan = this.sourceListScan;
        if (this.sourceListRefreshOnLoad)
            js.sourceListRefreshOnLoad = this.sourceListRefreshOnLoad;
        if (this.sourceListRefreshInterval != null)
            js.sourceListRefreshInterval = this.sourceListRefreshInterval;
        if (this.sourceReintrospectOnLoad)
            js.sourceReintrospectOnLoad = this.sourceReintrospectOnLoad;
        if (this.sourceReintrospectInterval != null)
            js.sourceReintrospectInterval = this.sourceReintrospectInterval;
        if (this.introspectionStrategy)
            js.introspectionStrategy = this.introspectionStrategy;
        if (this.requestDecorator)
            js.requestDecorator = this.requestDecorator;
        if (this.decoratorOptions)
            js.decoratorOptions = this.decoratorOptions;
        if (this.database)
            js.database = this.database;
        if (this.user)
            js.user = this.user;
        if (this.password)
            js.password = this.password;
        return js;
    };
    Cluster.prototype.toJSON = function () {
        return this.toJS();
    };
    Cluster.prototype.toString = function () {
        return "[Cluster " + this.name + " (" + this.type + ")]";
    };
    Cluster.prototype.equals = function (other) {
        return Cluster.isCluster(other) &&
            this.name === other.name &&
            this.type === other.type &&
            this.host === other.host &&
            this.version === other.version &&
            this.sourceListScan === other.sourceListScan &&
            this.sourceListRefreshOnLoad === other.sourceListRefreshOnLoad &&
            this.sourceListRefreshInterval === other.sourceListRefreshInterval &&
            this.sourceReintrospectOnLoad === other.sourceReintrospectOnLoad &&
            this.sourceReintrospectInterval === other.sourceReintrospectInterval &&
            this.introspectionStrategy === other.introspectionStrategy &&
            this.requestDecorator === other.requestDecorator &&
            this.database === other.database &&
            this.user === other.user &&
            this.timeout === other.timeout &&
            this.password === other.password;
    };
    Cluster.prototype.toClientCluster = function () {
        return new Cluster({
            name: this.name,
            type: this.type
        });
    };
    Cluster.prototype.makeExternalFromSourceName = function (source, version) {
        return plywood_1.External.fromValue({
            engine: this.type,
            source: source,
            version: version,
            allowSelectQueries: true,
            allowEternity: false
        });
    };
    Cluster.prototype.shouldScanSources = function () {
        return this.getSourceListScan() === 'auto';
    };
    Cluster.prototype.getTimeout = function () {
        return this.timeout || Cluster.DEFAULT_TIMEOUT;
    };
    Cluster.prototype.getSourceListScan = function () {
        return this.sourceListScan || Cluster.DEFAULT_SOURCE_LIST_SCAN;
    };
    Cluster.prototype.getSourceListRefreshInterval = function () {
        return this.sourceListRefreshInterval != null ? this.sourceListRefreshInterval : Cluster.DEFAULT_SOURCE_LIST_REFRESH_INTERVAL;
    };
    Cluster.prototype.getSourceReintrospectInterval = function () {
        return this.sourceReintrospectInterval != null ? this.sourceReintrospectInterval : Cluster.DEFAULT_SOURCE_REINTROSPECT_INTERVAL;
    };
    Cluster.prototype.getIntrospectionStrategy = function () {
        return this.introspectionStrategy || Cluster.DEFAULT_INTROSPECTION_STRATEGY;
    };
    Cluster.prototype.change = function (propertyName, newValue) {
        var v = this.valueOf();
        if (!v.hasOwnProperty(propertyName)) {
            throw new Error("Unknown property : " + propertyName);
        }
        v[propertyName] = newValue;
        return new Cluster(v);
    };
    Cluster.prototype.changeHost = function (newHost) {
        return this.change('host', newHost);
    };
    Cluster.prototype.changeTimeout = function (newTimeout) {
        return this.change('timeout', newTimeout);
    };
    Cluster.prototype.changeSourceListRefreshInterval = function (newSourceListRefreshInterval) {
        return this.change('sourceListRefreshInterval', newSourceListRefreshInterval);
    };
    Cluster.TYPE_VALUES = ['druid', 'mysql', 'postgres'];
    Cluster.DEFAULT_TIMEOUT = 40000;
    Cluster.DEFAULT_SOURCE_LIST_REFRESH_INTERVAL = 15000;
    Cluster.DEFAULT_SOURCE_REINTROSPECT_INTERVAL = 120000;
    Cluster.DEFAULT_INTROSPECTION_STRATEGY = 'segment-metadata-fallback';
    Cluster.DEFAULT_SOURCE_LIST_SCAN = 'auto';
    Cluster.SOURCE_LIST_SCAN_VALUES = ['disable', 'auto'];
    return Cluster;
}());
exports.Cluster = Cluster;
check = Cluster;
