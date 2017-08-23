"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var chronoshift_1 = require('chronoshift');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var mocks_1 = require('../../../common/models/mocks');
var line_chart_axis_1 = require('./line-chart-axis');
describe('LineChartAxis', function () {
    it('adds the correct class', function () {
        var scale = {
            tickFormat: function () { }
        };
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(line_chart_axis_1.LineChartAxis, {scale: scale, stage: mocks_1.StageMock.defaultA(), ticks: [], timezone: chronoshift_1.Timezone.UTC}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('line-chart-axis');
    });
});
