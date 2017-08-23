"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var plywood_1 = require('plywood');
var highlighter_1 = require('./highlighter');
describe('Highlighter', function () {
    it('adds the correct class', function () {
        var fakeTimeRange = plywood_1.TimeRange.fromJS({
            start: new Date('2015-01-26T04:54:10Z'),
            end: new Date('2015-01-26T05:54:10Z')
        });
        var myScaleX = function (value) { return 42; };
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(highlighter_1.Highlighter, {highlightRange: fakeTimeRange, scaleX: myScaleX}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('highlighter');
    });
});
