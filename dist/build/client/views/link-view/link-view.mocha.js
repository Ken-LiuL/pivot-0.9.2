"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var link_view_1 = require('./link-view');
describe('LinkView', function () {
    it.skip('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(link_view_1.LinkView, {linkViewConfig: null, hash: null, updateViewHash: null, changeHash: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('link-view');
    });
});
