"use strict";
var express_1 = require('express');
var index_1 = require('../../../common/models/index');
var manifests_1 = require('../../../common/manifests');
var router = express_1.Router();
router.post('/', function (req, res) {
    var _a = req.body, domain = _a.domain, dataSource = _a.dataSource, essence = _a.essence;
    if (typeof domain !== 'string') {
        res.status(400).send({
            error: 'must have a domain'
        });
        return;
    }
    if (typeof dataSource !== 'string') {
        res.status(400).send({
            error: 'must have a dataSource'
        });
        return;
    }
    if (typeof essence !== 'object') {
        res.status(400).send({
            error: 'essence must be an object'
        });
        return;
    }
    req.getSettings(dataSource)
        .then(function (appSettings) {
        var myDataSource = appSettings.getDataSource(dataSource);
        if (!myDataSource) {
            res.status(400).send({ error: 'unknown data source' });
            return;
        }
        try {
            var essenceObj = index_1.Essence.fromJS(essence, {
                dataSource: myDataSource,
                visualizations: manifests_1.MANIFESTS
            });
        }
        catch (e) {
            res.status(400).send({
                error: 'invalid essence',
                message: e.message
            });
            return;
        }
        res.json({
            url: essenceObj.getURL(domain + "#" + myDataSource.name + "/")
        });
    })
        .done();
});
module.exports = router;
