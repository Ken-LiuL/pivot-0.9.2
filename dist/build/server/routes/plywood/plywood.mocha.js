"use strict";
var Q = require('q');
var express = require('express');
var supertest = require('supertest');
var plywood_1 = require('plywood');
var bodyParser = require('body-parser');
var app_settings_mock_1 = require('../../../common/models/app-settings/app-settings.mock');
var plywoodRouter = require('./plywood');
var app = express();
app.use(bodyParser.json());
var appSettings = app_settings_mock_1.AppSettingsMock.wikiOnlyWithExecutor();
app.use(function (req, res, next) {
    req.user = null;
    req.version = '0.9.4';
    req.getSettings = function (dataSourceOfInterest) { return Q(appSettings); };
    next();
});
app.use('/', plywoodRouter);
describe('plywood router', function () {
    it('version mismatch', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            version: '0.9.3',
            expression: plywood_1.$('main').toJS()
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(412)
            .expect({
            error: 'incorrect version',
            action: 'reload'
        }, testComplete);
    });
    it('must have dataSource', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            version: '0.9.4',
            expression: plywood_1.$('main').toJS()
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .expect({
            "error": "must have a dataSource"
        }, testComplete);
    });
    it('does a query (value)', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            version: '0.9.4',
            expression: plywood_1.$('main').count().toJS(),
            dataSource: 'wiki'
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .expect({
            result: 10
        }, testComplete);
    });
    it('does a query (dataset)', function (testComplete) {
        supertest(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
            version: '0.9.4',
            expression: plywood_1.$('main')
                .split('$channel', 'Channel')
                .apply('Count', plywood_1.$('main').count())
                .sort('$Count', 'descending')
                .limit(2)
                .toJS(),
            dataSource: 'wiki'
        })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .expect({
            result: [
                { Channel: 'en', Count: 4 },
                { Channel: 'vi', Count: 4 }
            ]
        }, testComplete);
    });
});
