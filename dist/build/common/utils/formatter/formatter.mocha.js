"use strict";
var chai_1 = require('chai');
var chronoshift_1 = require('chronoshift');
var filter_clause_1 = require("../../models/filter-clause/filter-clause");
var mocks_1 = require('../../../common/models/mocks');
var WallTime = require('chronoshift').WallTime;
if (!WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    WallTime.init(tzData.rules, tzData.zones);
}
var formatter_1 = require('./formatter');
describe('General', function () {
    describe('getMiddleNumber', function () {
        it('works in simple case', function () {
            var values = [100, 10, 1, 0];
            chai_1.expect(formatter_1.getMiddleNumber(values)).to.equal(10);
        });
        it('works in more complex case', function () {
            var values = [0, 0, -1000, -100, 10, 1, 0, 0, 0, 0];
            chai_1.expect(formatter_1.getMiddleNumber(values)).to.equal(10);
        });
    });
    describe('formatterFromData', function () {
        it('works in simple case', function () {
            var values = [100, 10, 1, 0];
            var formatter = formatter_1.formatterFromData(values, '0,0 a');
            chai_1.expect(formatter(10)).to.equal('10');
        });
        it('works in k case', function () {
            var values = [50000, 5000, 5000, 5000, 5000, 100, 10, 1, 0];
            var formatter = formatter_1.formatterFromData(values, '0,0.000 a');
            chai_1.expect(formatter(10)).to.equal('0.010 k');
            chai_1.expect(formatter(12345)).to.equal('12.345 k');
        });
        it('works in KB case', function () {
            var values = [50000, 5000, 5000, 5000, 5000, 100, 10, 1, 0];
            var formatter = formatter_1.formatterFromData(values, '0,0.000 b');
            chai_1.expect(formatter(10)).to.equal('0.010 KB');
            chai_1.expect(formatter(12345)).to.equal('12.056 KB');
        });
    });
    describe('formatFilterClause', function () {
        var timeFilterDifferentMonth = filter_clause_1.FilterClause.fromJS({
            expression: { op: 'ref', name: 'time' },
            selection: {
                op: 'literal',
                type: 'TIME_RANGE',
                value: { start: new Date('2016-11-11'), end: new Date('2016-12-12') }
            }
        });
        var timeFilterDifferentYear = filter_clause_1.FilterClause.fromJS({
            expression: { op: 'ref', name: 'time' },
            selection: {
                op: 'literal',
                type: 'TIME_RANGE',
                value: { start: new Date('2015-11-11'), end: new Date('2016-12-12') }
            }
        });
        var timeFilterSameMonth = filter_clause_1.FilterClause.fromJS({
            expression: { op: 'ref', name: 'time' },
            selection: {
                op: 'literal',
                type: 'TIME_RANGE',
                value: { start: new Date('2015-11-11'), end: new Date('2015-11-14') }
            }
        });
        var numberFilter = filter_clause_1.FilterClause.fromJS({
            expression: { op: 'ref', name: 'commentLength' },
            selection: {
                op: 'literal',
                value: {
                    "setType": "NUMBER",
                    "elements": [1, 2, 3]
                },
                "type": "SET"
            },
            exclude: true
        });
        var stringFilterShort = filter_clause_1.FilterClause.fromJS({
            expression: { op: 'ref', name: 'country' },
            selection: {
                op: 'literal',
                value: {
                    "setType": "STRING",
                    "elements": ["iceland"]
                },
                "type": "SET"
            }
        });
        it('works in time case', function () {
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.time(), timeFilterDifferentMonth, chronoshift_1.Timezone.UTC)).to.equal('Nov 11 - Dec 11');
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.time(), timeFilterDifferentYear, chronoshift_1.Timezone.UTC)).to.equal('Nov 11, 2015 - Dec 11, 2016');
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.time(), timeFilterSameMonth, chronoshift_1.Timezone.UTC)).to.equal('Nov 11 - Nov 13, 2015');
        });
        it('works in time case verbose', function () {
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.time(), timeFilterDifferentMonth, chronoshift_1.Timezone.UTC, true)).to.equal('time: Nov 11 - Dec 11');
        });
        it('works in number case', function () {
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.number(), numberFilter, chronoshift_1.Timezone.UTC)).to.equal('Numeric (3)');
        });
        it('works in number verbose', function () {
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.number(), numberFilter, chronoshift_1.Timezone.UTC, true)).to.equal('Numeric: 1, 2, 3');
        });
        it('works in string case', function () {
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.countryString(), stringFilterShort, chronoshift_1.Timezone.UTC)).to.equal('important countries: iceland');
        });
        it('works in string verbose', function () {
            chai_1.expect(formatter_1.formatFilterClause(mocks_1.DimensionMock.countryString(), stringFilterShort, chronoshift_1.Timezone.UTC, true)).to.equal('important countries: iceland');
        });
    });
});
