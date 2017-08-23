"use strict";
var express = require('express');
var supertest = require('supertest');
var healthRouter = require('./health');
var app = express();
app.use('/', healthRouter);
describe('health router', function () {
    it('gets a 200', function (testComplete) {
        supertest(app)
            .get('/')
            .expect(200, testComplete);
    });
});
