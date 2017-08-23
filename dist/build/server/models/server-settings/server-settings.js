"use strict";
var immutable_class_1 = require('immutable-class');
function parseIntFromPossibleString(x) {
    return typeof x === 'string' ? parseInt(x, 10) : x;
}
var check;
var ServerSettings = (function () {
    function ServerSettings(parameters) {
        var port = parameters.port || ServerSettings.DEFAULT_PORT;
        if (typeof port !== 'number')
            throw new Error("port must be a number");
        this.port = port;
        this.serverHost = parameters.serverHost;
        this.serverRoot = parameters.serverRoot || ServerSettings.DEFAULT_SERVER_ROOT;
        this.pageMustLoadTimeout = parameters.pageMustLoadTimeout || ServerSettings.DEFAULT_PAGE_MUST_LOAD_TIMEOUT;
        this.iframe = parameters.iframe || ServerSettings.DEFAULT_IFRAME;
    }
    ServerSettings.isServerSettings = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, ServerSettings);
    };
    ServerSettings.fromJS = function (parameters, configFileDir) {
        var port = parameters.port, serverHost = parameters.serverHost, serverRoot = parameters.serverRoot, pageMustLoadTimeout = parameters.pageMustLoadTimeout, iframe = parameters.iframe;
        if (serverRoot && serverRoot[0] !== '/')
            serverRoot = '/' + serverRoot;
        if (serverRoot === '/')
            serverRoot = null;
        return new ServerSettings({
            port: parseIntFromPossibleString(port),
            serverHost: serverHost,
            serverRoot: serverRoot,
            pageMustLoadTimeout: pageMustLoadTimeout,
            iframe: iframe
        });
    };
    ServerSettings.prototype.valueOf = function () {
        return {
            port: this.port,
            serverHost: this.serverHost,
            serverRoot: this.serverRoot,
            pageMustLoadTimeout: this.pageMustLoadTimeout,
            iframe: this.iframe
        };
    };
    ServerSettings.prototype.toJS = function () {
        var js = {
            port: this.port
        };
        if (this.serverHost)
            js.serverHost = this.serverHost;
        if (this.serverRoot !== ServerSettings.DEFAULT_SERVER_ROOT)
            js.serverRoot = this.serverRoot;
        if (this.pageMustLoadTimeout !== ServerSettings.DEFAULT_PAGE_MUST_LOAD_TIMEOUT)
            js.pageMustLoadTimeout = this.pageMustLoadTimeout;
        if (this.iframe !== ServerSettings.DEFAULT_IFRAME)
            js.iframe = this.iframe;
        return js;
    };
    ServerSettings.prototype.toJSON = function () {
        return this.toJS();
    };
    ServerSettings.prototype.toString = function () {
        return "[ServerSettings " + this.port + "]";
    };
    ServerSettings.prototype.equals = function (other) {
        return ServerSettings.isServerSettings(other) &&
            this.port === other.port &&
            this.serverHost === other.serverHost &&
            this.serverRoot === other.serverRoot &&
            this.pageMustLoadTimeout === other.pageMustLoadTimeout &&
            this.iframe === other.iframe;
    };
    ServerSettings.DEFAULT_PORT = 9090;
    ServerSettings.DEFAULT_SERVER_ROOT = '/pivot';
    ServerSettings.DEFAULT_PAGE_MUST_LOAD_TIMEOUT = 800;
    ServerSettings.DEFAULT_IFRAME = "allow";
    return ServerSettings;
}());
exports.ServerSettings = ServerSettings;
check = ServerSettings;
