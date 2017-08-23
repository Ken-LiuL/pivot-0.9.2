"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../../common/models/index');
var mocks_1 = require('../../../common/models/mocks');
var pinboard_measure_tile_1 = require('./pinboard-measure-tile');
describe('PinboardMeasureTile', function () {
    it('adds the correct class', function () {
        var essence = mocks_1.EssenceMock.wikiTotals();
        var sortOn = new index_1.SortOn({ dimension: essence.dataSource.getDimension('articleName') });
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(pinboard_measure_tile_1.PinboardMeasureTile, {essence: essence, title: "Pinboard", sortOn: sortOn, onSelect: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('pinboard-measure-tile');
    });
});
