"use strict";
var Q = require('q');
var express = require('express');
var supertest = require('supertest');
var plywood_1 = require('plywood');
var bodyParser = require('body-parser');
var app_settings_mock_1 = require('../../../common/models/app-settings/app-settings.mock');
var mkurlRouter = require('./mkurl');
var app = express();
app.use(bodyParser.json());
var appSettings = app_settings_mock_1.AppSettingsMock.wikiOnlyWithExecutor();
app.use(function (req, res, next) {
    req.user = null;
    req.version = '0.9.4';
    req.getSettings = function (dataSourceOfInterest) { return Q(appSettings); };
    next();
});
app.use('/', mkurlRouter);
describe('mkurl router', function () {
    it('gets a simple url back', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            domain: 'http://localhost:9090',
            dataSource: 'wiki',
            essence: {
                visualization: 'totals',
                timezone: 'Etc/UTC',
                filter: {
                    op: "literal",
                    value: true
                },
                pinnedDimensions: [],
                singleMeasure: 'count',
                selectedMeasures: [],
                splits: []
            }
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .expect({
            url: "http://localhost:9090#wiki/totals/2/EQUQLgxg9AqgKgYWAGgN7APYAdgC5gA2AlmAKYBOAhgSsAG7UCupeY5zAvsgNoC6yAO0YECyYBAyMBYFHx78hIoA"
        }, testComplete);
    });
    it('gets a complex url back', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            domain: 'http://localhost:9090',
            dataSource: 'wiki',
            essence: {
                visualization: 'totals',
                timezone: 'Etc/UTC',
                filter: plywood_1.$('time').in(new Date('2015-01-01Z'), new Date('2016-01-01Z')).toJS(),
                pinnedDimensions: [],
                singleMeasure: 'count',
                selectedMeasures: ["count", "added"],
                splits: []
            }
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .expect({
            url: "http://localhost:9090#wiki/totals/2/EQUQLgxg9AqgKgYWAGgN7APYAdgC5gQAWAhgJYB2KwApgB5YBO1Azs6RpbutnsEwGZVyx" +
                "ALbVeYUmOABfZMGIRJHPOkXLOwClTqMWbFV0w58AG1JhqDYqaoA3GwFdxR5mGIMwvAEwAGAIwArAC0AaH+cL6+uFExvgB0Ub4AWjrkACY+AQBs" +
                "4eGR0bFRiVGpcsBgAJ5YLsBwAJIAsiAA+gBKAIIAcgDiILIycgDaALrI5I6mpvIQGI7kXshDBHMLVMTp6dSZY6Pjk6ZAA"
        }, testComplete);
    });
    it('gets a url filtered on article name back', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            domain: 'http://localhost:9090',
            dataSource: 'wiki',
            essence: {
                visualization: 'totals',
                timezone: 'Etc/UTC',
                filter: plywood_1.$('articleName').in(['article1', 'article2']).toJS(),
                pinnedDimensions: [],
                singleMeasure: 'count',
                selectedMeasures: ["count", "added"],
                splits: []
            }
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .expect({
            url: "http://localhost:9090#wiki/totals/2/EQUQLgxg9AqgKgYWAGgN7APYAdgC5gQAWAhgJYB2KwApgB5YBO1Azs6RpbutnsEwGZVyx" +
                "ALbVexBmFIQANtQByo8QF9kwYhGkc86Tds6YAbtQaziOdXUYs2Orphz5ZpMKeKyqRjwFdxD5mowOABPLH9gAGU4ACUASQUAcSpqeTFyMGY8AG0" +
                "NKRl5AEYqSWk5agAmYABdNWAwMIjIkDhgFXbkbOrkch9ZWXUIDB8MlFyhkbASgBNp6mmazu7e/qA="
        }, testComplete);
    });
    it('gets a url with split on time back', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            domain: 'http://localhost:9090',
            dataSource: 'wiki',
            essence: {
                visualization: 'totals',
                timezone: 'Etc/UTC',
                filter: plywood_1.$('time').in(new Date('2015-01-01Z'), new Date('2016-01-01Z')).toJS(),
                pinnedDimensions: [],
                singleMeasure: 'count',
                selectedMeasures: ["count", "added"],
                splits: [
                    {
                        "expression": {
                            "op": "ref",
                            "name": "__time"
                        },
                        "bucketAction": {
                            "action": "timeBucket",
                            "duration": "PT1H"
                        },
                        "sortAction": {
                            "action": "sort",
                            "expression": {
                                "op": "ref",
                                "name": "__time"
                            },
                            "direction": "ascending"
                        }
                    }
                ]
            }
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .expect({
            url: "http://localhost:9090#wiki/totals/2/EQUQLgxg9AqgKgYWAGgN7APYAdgC5gQAWAhgJYB2KwApgB5YBO1Azs6RpbutnsEwGZVyx" +
                "ALbVeYUmOABfZMGIRJHPOkXLOwClTqMWbFV0w58AG1JhqDYqaoA3GwFdxR5mGIMwvAEwAGAIwArAC0AaH+cL6+uFExvgB0Ub4AWjrkACY+AQBs" +
                "4eGR0bFRiVGpcsBgAJ5YLsBwAJIAsiAA+gBKAIIAcgDiILIycgDaALrI5I6mpvIQGI7kXshDBHMLVMTp6dSZY6Pjk6ZAA"
        }, testComplete);
    });
});
