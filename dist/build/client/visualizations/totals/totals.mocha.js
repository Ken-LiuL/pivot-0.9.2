"use strict";
var chai_1 = require('chai');
require('../../utils/test-utils/index');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var totals_1 = require('./totals');
describe.skip('Totals', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(totals_1.Totals, {clicker: null, essence: null, stage: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('totals');
    });
});
