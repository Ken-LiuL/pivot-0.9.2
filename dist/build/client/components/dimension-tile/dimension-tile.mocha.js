"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var dimension_tile_1 = require('./dimension-tile');
var mocks_1 = require('../../../common/models/mocks');
describe('DimensionTile', function () {
    it('adds the correct class', function () {
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(dimension_tile_1.DimensionTile, {clicker: null, dimension: mocks_1.DimensionMock.countryURL(), sortOn: mocks_1.SortOnMock.defaultA(), essence: mocks_1.EssenceMock.wikiTotals()}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('dimension-tile');
    });
});
