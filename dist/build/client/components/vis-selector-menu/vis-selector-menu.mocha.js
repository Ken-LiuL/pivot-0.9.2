"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var vis_selector_menu_1 = require('./vis-selector-menu');
describe.skip('VisSelectorMenu', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(vis_selector_menu_1.VisSelectorMenu, {clicker: null, essence: null, onClose: null, openOn: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('vis-selector-menu');
    });
});
