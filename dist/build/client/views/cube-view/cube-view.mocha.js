"use strict";
var chai_1 = require('chai');
var sinon = require('sinon');
var React = require('react');
var ReactDOM = require('react-dom');
var index_1 = require('../../utils/test-utils/index');
var TestUtils = require('react-addons-test-utils');
var mocks_1 = require('../../../common/models/mocks');
var chronoshift_1 = require('chronoshift');
var tzData = require('../../../../node_modules/chronoshift/lib/walltime/walltime-data.js');
chronoshift_1.WallTime.init(tzData.rules, tzData.zones);
var dimension_measure_panel_1 = require('../../components/dimension-measure-panel/dimension-measure-panel');
var filter_tile_1 = require('../../components/filter-tile/filter-tile');
var split_tile_1 = require('../../components/split-tile/split-tile');
var localStorage = require('../../utils/local-storage/local-storage');
describe('CubeView', function () {
    before(function () {
        index_1.mockReactComponent(dimension_measure_panel_1.DimensionMeasurePanel);
        index_1.mockReactComponent(filter_tile_1.FilterTile);
        index_1.mockReactComponent(split_tile_1.SplitTile);
    });
    after(function () {
        dimension_measure_panel_1.DimensionMeasurePanel.restore();
        filter_tile_1.FilterTile.restore();
        split_tile_1.SplitTile.restore();
    });
    var CubeView = index_1.mockRequireEnsure('./cube-view').CubeView;
    it('adds the correct class', function () {
        var updateViewHash = sinon.stub();
        var renderedComponent = TestUtils.renderIntoDocument(React.createElement(CubeView, {hash: null, dataSource: mocks_1.DataSourceMock.wiki(), updateViewHash: updateViewHash}));
        chai_1.expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
        chai_1.expect(ReactDOM.findDOMNode(renderedComponent).className, 'should contain class').to.contain('cube-view');
    });
    it('remembers measure mode toggle click', function () {
        var updateViewHash = sinon.stub();
        var stub = sinon.stub(localStorage, "get");
        stub.withArgs('is-multi-measure').returns(undefined);
        var initialCubeView = TestUtils.renderIntoDocument(React.createElement(CubeView, {hash: null, dataSource: mocks_1.DataSourceMock.wiki(), updateViewHash: updateViewHash}));
        chai_1.expect(initialCubeView.state.essence.multiMeasureMode, 'default is single measure').to.equal(false);
        stub.restore();
        stub = sinon.stub(localStorage, "get");
        stub.withArgs('is-multi-measure').returns(true);
        var wikiCubeView = TestUtils.renderIntoDocument(React.createElement(CubeView, {hash: null, dataSource: mocks_1.DataSourceMock.wiki(), updateViewHash: updateViewHash}));
        chai_1.expect(wikiCubeView.state.essence.multiMeasureMode, 'multi measure in local storage is respected -> true').to.equal(true);
        stub.restore();
        stub = sinon.stub(localStorage, "get");
        stub.withArgs('is-multi-measure').returns(false);
        var wikiCubeView2 = TestUtils.renderIntoDocument(React.createElement(CubeView, {hash: null, dataSource: mocks_1.DataSourceMock.wiki(), updateViewHash: updateViewHash}));
        chai_1.expect(wikiCubeView2.state.essence.multiMeasureMode, 'multi measure in local storage is respected -> false').to.equal(false);
    });
});
