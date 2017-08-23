"use strict";
var chai_1 = require('chai');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var filter_options_dropdown_1 = require('./filter-options-dropdown');
describe('FilterOptionsDropdown', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(filter_options_dropdown_1.FilterOptionsDropdown, {selectedOption: null, onSelectOption: function () { }}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(index_1.findDOMNode(renderedComponent).className, 'should contain class').to.contain('filter-options-dropdown');
    });
});
