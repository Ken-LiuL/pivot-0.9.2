"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./dimension-measure-panel.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var dimension_list_tile_1 = require('../dimension-list-tile/dimension-list-tile');
var measures_tile_1 = require('../measures-tile/measures-tile');
var TOTAL_FLEXES = 7;
var MIN_FLEX = 1;
var MIN_HEIGHT = 150;
var DimensionMeasurePanel = (function (_super) {
    __extends(DimensionMeasurePanel, _super);
    function DimensionMeasurePanel() {
        _super.call(this);
    }
    DimensionMeasurePanel.prototype.render = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, menuStage = _a.menuStage, triggerFilterMenu = _a.triggerFilterMenu, triggerSplitMenu = _a.triggerSplitMenu, getUrlPrefix = _a.getUrlPrefix, style = _a.style;
        var dataSource = essence.dataSource;
        // Compute relative sizes by diving up TOTAL_FLEXES
        var numDimensions = dataSource.dimensions.size;
        var numMeasures = dataSource.measures.size;
        var dimensionsFlex = dom_1.clamp(Math.ceil(TOTAL_FLEXES * numDimensions / (numDimensions + numMeasures)), MIN_FLEX, TOTAL_FLEXES - MIN_FLEX);
        var measuresFlex = TOTAL_FLEXES - dimensionsFlex;
        var dimensionListStyle = { flex: dimensionsFlex };
        if (dimensionsFlex === MIN_FLEX)
            dimensionListStyle.minHeight = MIN_HEIGHT;
        var measuresStyle = { flex: measuresFlex };
        if (measuresFlex === MIN_FLEX)
            measuresStyle.minHeight = MIN_HEIGHT;
        return React.createElement("div", {className: "dimension-measure-panel", style: style}, React.createElement(dimension_list_tile_1.DimensionListTile, {clicker: clicker, essence: essence, menuStage: menuStage, triggerFilterMenu: triggerFilterMenu, triggerSplitMenu: triggerSplitMenu, getUrlPrefix: getUrlPrefix, style: dimensionListStyle}), React.createElement(measures_tile_1.MeasuresTile, {clicker: clicker, essence: essence, style: measuresStyle}));
    };
    return DimensionMeasurePanel;
}(React.Component));
exports.DimensionMeasurePanel = DimensionMeasurePanel;
