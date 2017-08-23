"use strict";
var chai_1 = require("chai");
var immutable_class_1 = require("immutable-class");
var chronoshift_1 = require("chronoshift");
var granularity_1 = require("./granularity");
var plywood_1 = require("plywood");
var WallTime = require('chronoshift').WallTime;
if (!WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    WallTime.init(tzData.rules, tzData.zones);
}
describe('Granularity', function () {
    it('fromJSes appropriately', function () {
        var timeBucketAction1 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'America/Tijuana'
        });
        chai_1.expect(timeBucketAction1 instanceof plywood_1.TimeBucketAction).to.equal(true);
        chai_1.expect(timeBucketAction1.timezone.toString()).to.equal('America/Tijuana');
        chai_1.expect(timeBucketAction1.duration).to.deep.equal(chronoshift_1.Duration.fromJS('P1W'));
        var timeBucketAction2 = granularity_1.granularityFromJS('PT1H');
        chai_1.expect(timeBucketAction2 instanceof plywood_1.TimeBucketAction).to.equal(true);
        chai_1.expect(timeBucketAction2.timezone).to.equal(undefined);
        chai_1.expect(timeBucketAction2.duration).to.deep.equal(chronoshift_1.Duration.fromJS('PT1H'));
        var numberBucketAction1 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5,
            offset: 1
        });
        chai_1.expect(numberBucketAction1 instanceof plywood_1.NumberBucketAction).to.equal(true);
        chai_1.expect(numberBucketAction1.size).to.equal(5);
        chai_1.expect(numberBucketAction1.offset).to.equal(1);
        var numberBucketAction2 = granularity_1.granularityFromJS(5);
        chai_1.expect(numberBucketAction2 instanceof plywood_1.NumberBucketAction).to.equal(true);
        chai_1.expect(numberBucketAction2.size).to.equal(5);
        chai_1.expect(numberBucketAction2.offset).to.equal(0);
    });
    it('to strings appropriately', function () {
        var timeBucketAction1 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'America/Tijuana'
        });
        var timeBucketAction2 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'America/Tijuana'
        });
        var timeBucketAction3 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'Asia/Kathmandu'
        });
        var timeBucketAction4 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1D',
            timezone: 'Asia/Kathmandu'
        });
        chai_1.expect(granularity_1.granularityToString(timeBucketAction1)).to.equal('P1W');
        chai_1.expect(granularity_1.granularityToString(timeBucketAction2)).to.equal('P1W');
        chai_1.expect(granularity_1.granularityToString(timeBucketAction3)).to.equal('P1W');
        chai_1.expect(granularity_1.granularityToString(timeBucketAction4)).to.equal('P1D');
        var numberBucketAction1 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5,
            offset: 1
        });
        var numberBucketAction2 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5,
            offset: 1
        });
        var numberBucketAction3 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 300000
        });
        var numberBucketAction4 = granularity_1.granularityFromJS(2);
        chai_1.expect(granularity_1.granularityToString(numberBucketAction1)).to.equal('5');
        chai_1.expect(granularity_1.granularityToString(numberBucketAction2)).to.equal('5');
        chai_1.expect(granularity_1.granularityToString(numberBucketAction3)).to.equal('300000');
        chai_1.expect(granularity_1.granularityToString(numberBucketAction4)).to.equal('2');
    });
    it('equals appropriately', function () {
        var timeBucketAction1 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'America/Tijuana'
        });
        var timeBucketAction2 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'America/Tijuana'
        });
        var timeBucketAction3 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'Asia/Kathmandu'
        });
        var timeBucketAction4 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1D',
            timezone: 'Asia/Kathmandu'
        });
        chai_1.expect(granularity_1.granularityEquals(timeBucketAction1, timeBucketAction2)).to.equal(true);
        chai_1.expect(granularity_1.granularityEquals(timeBucketAction2, timeBucketAction3)).to.equal(false);
        chai_1.expect(granularity_1.granularityEquals(timeBucketAction3, timeBucketAction4)).to.equal(false);
        var numberBucketAction1 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5,
            offset: 1
        });
        var numberBucketAction2 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5,
            offset: 1
        });
        var numberBucketAction3 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5
        });
        var numberBucketAction4 = granularity_1.granularityFromJS(5);
        chai_1.expect(granularity_1.granularityEquals(numberBucketAction1, numberBucketAction2)).to.equal(true);
        chai_1.expect(granularity_1.granularityEquals(numberBucketAction2, numberBucketAction3)).to.equal(false);
        chai_1.expect(granularity_1.granularityEquals(numberBucketAction3, numberBucketAction4)).to.equal(true);
    });
    it('updatesBucketSize appropriately, preserves original non size properties', function () {
        var numberBucketAction1 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 5,
            offset: 1
        });
        var numberBucketAction2 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 10,
            offset: 0
        });
        var numberBucketAction3 = granularity_1.granularityFromJS({
            action: 'numberBucket',
            size: 10,
            offset: 1
        });
        chai_1.expect(granularity_1.granularityEquals(granularity_1.updateBucketSize(numberBucketAction1, numberBucketAction2), numberBucketAction3)).to.equal(true);
        var timeBucketAction1 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1W',
            timezone: 'America/Tijuana'
        });
        var timeBucketAction2 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1M',
            timezone: null
        });
        var timeBucketAction3 = granularity_1.granularityFromJS({
            action: 'timeBucket',
            duration: 'P1M',
            timezone: 'America/Tijuana'
        });
        chai_1.expect(granularity_1.granularityEquals(granularity_1.updateBucketSize(timeBucketAction1, timeBucketAction2), timeBucketAction3)).to.equal(true);
    });
    it('getGranularities appropriately for time', function () {
        var defaults = granularity_1.getGranularities('time');
        var expectedDefaults = ['PT1M', 'PT5M', 'PT1H', 'P1D', 'P1W'].map(granularity_1.granularityFromJS);
        chai_1.expect(immutable_class_1.immutableArraysEqual(defaults, expectedDefaults), 'time defaults are returned').to.equal(true);
        var coarse = granularity_1.getGranularities('time', null, true);
        var expectedCoarseDefaults = ['PT1M', 'PT5M', 'PT1H', 'PT6H', 'PT12H', 'P1D', 'P1W', 'P1M'].map(granularity_1.granularityFromJS);
        chai_1.expect(immutable_class_1.immutableArraysEqual(coarse, expectedCoarseDefaults), 'coarse time defaults are returned').to.equal(true);
        var bucketedBy = granularity_1.getGranularities('time', granularity_1.granularityFromJS('PT12H'), false);
        var expectedDefaults = ['PT12H', 'P1D', 'P1W', 'P1M', 'P3M'].map(granularity_1.granularityFromJS);
        chai_1.expect(immutable_class_1.immutableArraysEqual(bucketedBy, expectedDefaults), 'bucketed by returns larger granularities').to.equal(true);
    });
    it('getGranularities appropriately for number', function () {
        var defaults = granularity_1.getGranularities('number');
        var expectedDefaults = [0.1, 1, 10, 100, 1000].map(granularity_1.granularityFromJS);
        chai_1.expect(immutable_class_1.immutableArraysEqual(defaults, expectedDefaults), 'number defaults are returned').to.equal(true);
        var bucketedBy = granularity_1.getGranularities('number', granularity_1.granularityFromJS(100), false);
        var expectedGrans = [100, 500, 1000, 5000, 10000].map(granularity_1.granularityFromJS);
        chai_1.expect(immutable_class_1.immutableArraysEqual(bucketedBy, expectedGrans), 'bucketed by returns larger granularities').to.equal(true);
    });
    it('getDefaultGranularityForKind appropriately for number', function () {
        var defaultNumber = granularity_1.getDefaultGranularityForKind('number');
        var expected = granularity_1.granularityFromJS(10);
        chai_1.expect(granularity_1.granularityEquals(defaultNumber, expected)).to.equal(true);
        var bucketedBy = granularity_1.getDefaultGranularityForKind('number', granularity_1.granularityFromJS(50));
        expected = granularity_1.granularityFromJS(50);
        chai_1.expect(granularity_1.granularityEquals(bucketedBy, expected), 'default will bucket by provided bucketedBy amount').to.equal(true);
        var customGrans = granularity_1.getDefaultGranularityForKind('number', null, [100, 500, 1000, 5000, 10000].map(granularity_1.granularityFromJS));
        expected = granularity_1.granularityFromJS(1000);
        chai_1.expect(granularity_1.granularityEquals(customGrans, expected), 'default will bucket according to provided customs').to.equal(true);
    });
    it('getDefaultGranularityForKind appropriately for time', function () {
        var defaultNumber = granularity_1.getDefaultGranularityForKind('time');
        var expected = granularity_1.granularityFromJS('P1D');
        chai_1.expect(granularity_1.granularityEquals(defaultNumber, expected)).to.equal(true);
        var bucketedBy = granularity_1.getDefaultGranularityForKind('time', granularity_1.granularityFromJS('P1W'));
        expected = granularity_1.granularityFromJS('P1W');
        chai_1.expect(granularity_1.granularityEquals(bucketedBy, expected), 'default will bucket by provided bucketedBy amount').to.equal(true);
        var customGrans = granularity_1.getDefaultGranularityForKind('time', null, ['PT1H', 'PT8H', 'PT12H', 'P1D', 'P1W'].map(granularity_1.granularityFromJS));
        expected = granularity_1.granularityFromJS('PT12H');
        chai_1.expect(granularity_1.granularityEquals(customGrans, expected), 'default will bucket according to provided customs').to.equal(true);
    });
    it('getsBestBucketUnit appropriately for time defaults depending on coarse flag', function () {
        var month = 'P1M';
        var week = 'P1W';
        var day = 'P1D';
        var twelveHours = 'PT12H';
        var sixHours = 'PT6H';
        var oneHour = 'PT1H';
        var fiveMinutes = 'PT5M';
        var oneMinute = 'PT1M';
        var yearLength = new plywood_1.TimeRange({ start: new Date('1994-02-24T00:00:00.000Z'), end: new Date('1995-02-25T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(yearLength, false).toString()).to.equal(week);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(yearLength, true).toString()).to.equal(month);
        var monthLength = new plywood_1.TimeRange({ start: new Date('1995-02-24T00:00:00.000Z'), end: new Date('1995-03-25T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(monthLength, false).toString()).to.equal(day);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(monthLength, true).toString()).to.equal(week);
        var sevenDaysLength = new plywood_1.TimeRange({ start: new Date('1995-02-20T00:00:00.000Z'), end: new Date('1995-02-28T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(sevenDaysLength, false).toString()).to.equal(oneHour);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(sevenDaysLength, true).toString()).to.equal(day);
        var threeDaysLength = new plywood_1.TimeRange({ start: new Date('1995-02-20T00:00:00.000Z'), end: new Date('1995-02-24T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(sevenDaysLength, false).toString()).to.equal(oneHour);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(threeDaysLength, true).toString()).to.equal(twelveHours);
        var dayLength = new plywood_1.TimeRange({ start: new Date('1995-02-24T00:00:00.000Z'), end: new Date('1995-02-25T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(dayLength, false).toString()).to.equal(oneHour);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(dayLength, true).toString()).to.equal(sixHours);
        var fourHours = new plywood_1.TimeRange({ start: new Date('1995-02-24T00:00:00.000Z'), end: new Date('1995-02-24T04:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(fourHours, false).toString()).to.equal(fiveMinutes);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(fourHours, true).toString()).to.equal(oneHour);
        var fortyFiveMin = new plywood_1.TimeRange({ start: new Date('1995-02-24T00:00:00.000Z'), end: new Date('1995-02-24T00:45:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(fortyFiveMin, false).toString()).to.equal(oneMinute);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(fortyFiveMin, true).toString()).to.equal(fiveMinutes);
    });
    it('getsBestBucketUnit appropriately for time with bucketing and custom granularities', function () {
        var sixHours = 'PT6H';
        var oneHour = 'PT1H';
        var week = 'P1W';
        var dayLength = new plywood_1.TimeRange({ start: new Date('1995-02-24T00:00:00.000Z'), end: new Date('1995-02-25T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(dayLength, false).toString()).to.equal(oneHour);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(dayLength, false, granularity_1.granularityFromJS('PT6H')).toString()).to.equal(sixHours);
        var yearLength = new plywood_1.TimeRange({ start: new Date('1994-02-24T00:00:00.000Z'), end: new Date('1995-02-25T00:00:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(yearLength, false, granularity_1.granularityFromJS('PT6H')).toString()).to.equal(week);
        var customs = ['PT1H', 'PT8H', 'PT12H', 'P1D', 'P1W'].map(granularity_1.granularityFromJS);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(dayLength, false, null, customs).toString()).to.equal(oneHour);
        var fortyFiveMin = new plywood_1.TimeRange({ start: new Date('1995-02-24T00:00:00.000Z'), end: new Date('1995-02-24T00:45:00.000Z') });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(fortyFiveMin, false, null, customs).toString()).to.equal(oneHour);
    });
    it('getsBestBucketUnit appropriately for number defaults with bucketing and custom granularities', function () {
        var ten = new plywood_1.NumberRange({ start: 0, end: 10 });
        var thirtyOne = new plywood_1.NumberRange({ start: 0, end: 31 });
        var hundred = new plywood_1.NumberRange({ start: 0, end: 100 });
        chai_1.expect(granularity_1.getBestBucketUnitForRange(ten, false)).to.equal(1);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(thirtyOne, false)).to.equal(1);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(hundred, false)).to.equal(1);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(hundred, false, granularity_1.granularityFromJS(50))).to.equal(50);
        var customs = [-5, 0.25, 0.5, 0.78, 5].map(granularity_1.granularityFromJS);
        chai_1.expect(granularity_1.getBestBucketUnitForRange(ten, false, null, customs)).to.equal(5);
    });
});
