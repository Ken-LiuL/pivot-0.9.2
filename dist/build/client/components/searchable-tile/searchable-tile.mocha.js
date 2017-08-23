"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
require('../../utils/test-utils/index');
var searchable_tile_1 = require('./searchable-tile');
describe('SearchableTile', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(searchable_tile_1.SearchableTile, {toggleChangeFn: null, onSearchChange: null, searchText: "", showSearch: false, icons: null, className: "", title: "", style: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('searchable-tile');
    });
});
