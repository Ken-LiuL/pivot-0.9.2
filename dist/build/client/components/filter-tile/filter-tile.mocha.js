"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var mocks_1 = require('../../../common/models/mocks');
describe('FilterTile', function () {
    var FilterTile = index_1.mockRequireEnsure('./filter-tile').FilterTile;
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(FilterTile, {clicker: null, essence: mocks_1.EssenceMock.wikiTotals(), menuStage: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('filter-tile');
    });
});
