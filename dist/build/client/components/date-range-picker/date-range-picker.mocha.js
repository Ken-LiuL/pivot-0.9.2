"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var chronoshift_1 = require('chronoshift');
require('../../utils/test-utils/index');
var date_range_picker_1 = require('./date-range-picker');
var WallTime = require('chronoshift').WallTime;
if (!WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    WallTime.init(tzData.rules, tzData.zones);
}
describe('DateRangePicker', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(date_range_picker_1.DateRangePicker, {startTime: new Date(Date.UTC(2003, 11, 2)), endTime: new Date(Date.UTC(2004, 11, 2)), maxTime: new Date(Date.UTC(2004, 11, 2)), timezone: chronoshift_1.Timezone.UTC, onStartChange: function () { }, onEndChange: function () { }}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('date-range-picker');
    });
    it('throws on non round start time input', function () {
        chai_1.expect(function () {
            TestUtils.renderIntoDocument(React.createElement(date_range_picker_1.DateRangePicker, {startTime: new Date(Date.UTC(2003, 11, 2, 2, 4)), endTime: new Date(Date.UTC(2004, 11, 2)), maxTime: new Date(Date.UTC(2004, 11, 2)), timezone: chronoshift_1.Timezone.UTC, onStartChange: function () { }, onEndChange: function () { }}));
        }).to.throw('start time must be round');
    });
    it('throws on non round end time input', function () {
        chai_1.expect(function () {
            TestUtils.renderIntoDocument(React.createElement(date_range_picker_1.DateRangePicker, {startTime: new Date(Date.UTC(2003, 11, 2)), endTime: new Date(Date.UTC(2004, 11, 2, 2, 3)), maxTime: new Date(Date.UTC(2004, 11, 2)), timezone: chronoshift_1.Timezone.UTC, onStartChange: function () { }, onEndChange: function () { }}));
        }).to.throw('end time must be round');
    });
    it('does not error on null end time', function () {
        chai_1.expect(function () {
            TestUtils.renderIntoDocument(React.createElement(date_range_picker_1.DateRangePicker, {startTime: new Date(Date.UTC(2003, 11, 2)), endTime: null, maxTime: new Date(Date.UTC(2004, 11, 2)), timezone: chronoshift_1.Timezone.UTC, onStartChange: function () { }, onEndChange: function () { }}));
        }).to.not.throw();
    });
});
