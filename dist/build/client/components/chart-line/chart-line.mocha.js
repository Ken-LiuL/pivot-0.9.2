"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var plywood_1 = require('plywood');
var chart_line_1 = require('./chart-line');
var mocks_1 = require('../../../common/models/mocks');
describe('ChartLine', function () {
    it('adds the correct class', function () {
        var dataset = plywood_1.Dataset.fromJS([
            {
                TIME: {
                    type: 'TIME_RANGE',
                    start: new Date('2015-01-26T00:00:00Z'),
                    end: new Date('2015-01-26T01:00:00Z')
                },
                numberOfKoalas: 10,
                index: 0 // to return a simple x for testing purposes
            },
            {
                TIME: {
                    type: 'TIME_RANGE',
                    start: new Date('2015-01-26T01:00:00Z'),
                    end: new Date('2015-01-26T02:00:00Z')
                },
                numberOfKoalas: 12,
                index: 1 // to return a simple x for testing purposes
            }
        ]);
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(chart_line_1.ChartLine, {dataset: dataset, getX: function (d) { return d['TIME']; }, getY: function (d) { return d['numberOfKoalas']; }, scaleX: function (d) { return d['index']; }, scaleY: function (d) { return 2; }, stage: mocks_1.StageMock.defaultA(), color: 'yes', showArea: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('chart-line');
    });
});
