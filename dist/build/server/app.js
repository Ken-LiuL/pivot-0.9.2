"use strict";
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var chronoshift_1 = require('chronoshift');
// Init chronoshift
if (!chronoshift_1.WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    chronoshift_1.WallTime.init(tzData.rules, tzData.zones);
}
var config_1 = require('./config');
var plywoodRoutes = require('./routes/plywood/plywood');
var plyqlRoutes = require('./routes/plyql/plyql');
var pivotRoutes = require('./routes/pivot/pivot');
var settingsRoutes = require('./routes/settings/settings');
var mkurlRoutes = require('./routes/mkurl/mkurl');
var healthRoutes = require('./routes/health/health');
var views_1 = require('./views');
var app = express();
app.disable('x-powered-by');
function addRoutes(attach, router) {
    app.use(attach, router);
    app.use(config_1.SERVER_SETTINGS.serverRoot + attach, router);
}
app.use(compress());
app.use(logger('dev'));
addRoutes('/', express.static(path.join(__dirname, '../../build/public')));
addRoutes('/', express.static(path.join(__dirname, '../../assets')));
app.use(function (req, res, next) {
    req.user = null;
    req.version = config_1.VERSION;
	console.log(req.version)
	
    req.getSettings = function (opts) {
        if (opts === void 0) { opts = {}; }
        return config_1.SETTINGS_MANAGER.getSettings(opts);
    };
    next();
});
if (config_1.AUTH) {
    app.use(config_1.AUTH.auth({
        version: config_1.VERSION
    }));
}
app.use(bodyParser.json());
addRoutes('/health', healthRoutes);
// Data routes
addRoutes('/plywood', plywoodRoutes);
addRoutes('/plyql', plyqlRoutes);
addRoutes('/mkurl', mkurlRoutes);
if (process.env['PIVOT_ENABLE_SETTINGS']) {
    addRoutes('/settings', settingsRoutes);
}
// View routes
if (config_1.SERVER_SETTINGS.iframe === 'deny') {
    app.use(function (req, res, next) {
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
        next();
    });
}
addRoutes('/', pivotRoutes);
// Catch 404 and redirect to /
app.use(function (req, res, next) {
    res.redirect('/');
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(views_1.errorLayout({ version: config_1.VERSION, title: 'Error' }, err.message, err));
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(views_1.errorLayout({ version: config_1.VERSION, title: 'Error' }, err.message));
});
module.exports = app;
