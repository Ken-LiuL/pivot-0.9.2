"use strict";
var chai_1 = require('chai');
require('../../utils/test-utils/index');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var mocks_1 = require('../../../common/models/mocks');
var line_chart_1 = require('./line-chart');
describe('LineChart', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(line_chart_1.LineChart, {clicker: null, essence: mocks_1.EssenceMock.wikiLineChart(), stage: mocks_1.StageMock.defaultA()}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('line-chart');
    });
});
