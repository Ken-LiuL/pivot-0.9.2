"use strict";
var chai_1 = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var index_1 = require('../../utils/test-utils/index');
var mocks_1 = require('../../../common/models/mocks');
var dimension_list_tile_1 = require('../dimension-list-tile/dimension-list-tile');
var dimension_measure_panel_1 = require('./dimension-measure-panel');
describe('DimensionMeasurePanel', function () {
    before(function () {
        index_1.mockReactComponent(dimension_list_tile_1.DimensionListTile);
    });
    after(function () {
        dimension_list_tile_1.DimensionListTile.restore();
    });
    it('adds the correct class', function () {
        var clickyMcClickFace = { toggleMultiMeasureMode: function () { } };
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(dimension_measure_panel_1.DimensionMeasurePanel, {clicker: clickyMcClickFace, essence: mocks_1.EssenceMock.wikiTotals(), menuStage: null, triggerFilterMenu: null, triggerSplitMenu: null}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('dimension-measure-panel');
    });
});
