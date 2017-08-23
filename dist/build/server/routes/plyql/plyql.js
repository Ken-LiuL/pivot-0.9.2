"use strict";
var express_1 = require('express');
var plywood_1 = require('plywood');
var router = express_1.Router();
var outputFunctions = {
    json: function (data) { return JSON.stringify(data, null, 2); },
    csv: function (data) { return data.toCSV(); },
    tsv: function (data) { return data.toTSV(); }
};
router.post('/', function (req, res) {
    var _a = req.body, version = _a.version, outputType = _a.outputType, query = _a.query;
    if (version && version !== req.version) {
        res.status(400).send({
            error: 'incorrect version',
            action: 'reload'
        });
        return;
    }
    if (typeof query !== "string") {
        var errmsg = "Query must be a string";
        res.status(400).send(errmsg);
        return;
    }
    try {
        var parsedSQL = plywood_1.Expression.parseSQL(query);
    }
    catch (e) {
        var errmsg = "Could not parse query as SQL: " + e.message;
        res.status(400).send(errmsg);
        return;
    }
    if (typeof outputType !== "string") {
        outputType = "json";
    }
    var outputFn;
    outputFn = outputFunctions[outputType];
    if (outputFn === undefined) {
        var errmsg = "Invalid output type: " + outputType;
        res.status(400).send(errmsg);
        return;
    }
    var parsedQuery = parsedSQL.expression;
    var dataSource = parsedSQL.table;
    if (!dataSource) {
        var errmsg = "Could not determine data source name";
        res.status(400).send(errmsg);
        return;
    }
    parsedQuery = parsedQuery.substitute(function (ex) {
        if (ex instanceof plywood_1.RefExpression && ex.name === dataSource) {
            return plywood_1.$("main");
        }
        return null;
    });
console.log("-----")
    req.getSettings(dataSource)
        .then(function (appSettings) {
        var myDataSource = appSettings.getDataSource(dataSource);
        if (!myDataSource) {
            res.status(400).send({ error: 'unknown data source' });
            return;
        }
        myDataSource.executor(parsedQuery).then(function (data) {
            res.type(outputType);
            res.send(outputFn(plywood_1.Dataset.fromJS(data.toJS())));
        }, function (error) {
            res.status(500).send("got error " + error.message);
        });
    })
        .done();
});
module.exports = router;
