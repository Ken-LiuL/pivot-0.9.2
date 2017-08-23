"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var checkbox_1 = require('./checkbox');
describe('Checkbox', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(checkbox_1.Checkbox, {selected: true}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('checkbox');
    });
    it('not checked + check', function () {
        var onClick = sinon.spy();
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(checkbox_1.Checkbox, {selected: false, onClick: onClick}));
        var svgs = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'svg');
        chai_1.expect(svgs.length).to.equal(0);
        chai_1.expect(onClick.callCount).to.equal(0);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(renderedComponent));
        chai_1.expect(onClick.callCount).to.equal(1);
    });
});
