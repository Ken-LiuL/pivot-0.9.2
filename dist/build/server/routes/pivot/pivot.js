"use strict";
var express_1 = require('express');
var views_1 = require('../../views');
var router = express_1.Router();
router.get('/', function (req, res, next) {
    req.getSettings()
        .then(function (appSettings) {
        var clientSettings = appSettings.toClientSettings();
	console.log(JSON.stringify(clientSettings))
        res.send(views_1.pivotLayout({
            version: req.version,
            title: appSettings.customization.getTitle(req.version),
            user: req.user,
            appSettings: clientSettings,
            readOnly: false // ToDo: fix this
        }));
    })
        .done();
});
module.exports = router;
