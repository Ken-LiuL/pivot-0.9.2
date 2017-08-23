"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
require('../../utils/test-utils/index');
var hover_multi_bubble_1 = require('./hover-multi-bubble');
describe.skip('HoverMultiBubble', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(hover_multi_bubble_1.HoverMultiBubble, {left: null, top: null, segmentLabel: null, colorEntries: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('hover-multi-bubble');
    });
});
