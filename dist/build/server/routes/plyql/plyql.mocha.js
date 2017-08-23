"use strict";
var Q = require('q');
var express = require('express');
var supertest = require('supertest');
var mime = require('mime');
var bodyParser = require('body-parser');
var app_settings_mock_1 = require('../../../common/models/app-settings/app-settings.mock');
var plyqlRouter = require('./plyql');
var app = express();
app.use(bodyParser.json());
var appSettings = app_settings_mock_1.AppSettingsMock.wikiOnlyWithExecutor();
app.use(function (req, res, next) {
    req.user = null;
    req.version = '0.9.4';
    req.getSettings = function (dataSourceOfInterest) { return Q(appSettings); };
    next();
});
app.use('/', plyqlRouter);
var pageQuery = "SELECT SUM(added) as Added FROM `wiki` GROUP BY page ORDER BY Added DESC LIMIT 10;";
var timeQuery = "SELECT TIME_BUCKET(time, 'PT1H', 'Etc/UTC') as TimeByHour, SUM(added) as Added FROM `wiki` GROUP BY 1 ORDER BY TimeByHour ASC";
var tests = [
    {
        outputType: "json",
        query: pageQuery,
        testName: "POST json pages added"
    },
    {
        outputType: "json",
        query: timeQuery,
        testName: "POST json timeseries"
    },
    {
        outputType: "csv",
        query: pageQuery,
        testName: "POST csv pages added"
    },
    {
        outputType: "csv",
        query: timeQuery,
        testName: "POST csv timeseries"
    },
    {
        outputType: "tsv",
        query: pageQuery,
        testName: "POST tsv pages added"
    },
    {
        outputType: "tsv",
        query: timeQuery,
        testName: "POST tsv timeseries"
    }
];
function responseHandler(err, res) {
    console.log("Response Type: " + res.type);
    console.log("Response Text: " + res.text);
}
function testPlyqlHelper(testName, contentType, queryStr) {
    it(testName, function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send(queryStr)
            .expect('Content-Type', contentType + "; charset=utf-8")
            .expect(200, testComplete);
    });
}
describe('plyql router', function () {
    tests.forEach(function (test) {
        testPlyqlHelper(test.testName, mime.lookup(test.outputType), JSON.stringify(test, null, 2));
    });
});
