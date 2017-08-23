"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./pinboard-panel.css');
var React = require('react');
var plywood_1 = require('plywood');
var constants_1 = require('../../config/constants');
var svg_icon_1 = require('../svg-icon/svg-icon');
var index_1 = require('../../../common/models/index');
var drag_manager_1 = require('../../utils/drag-manager/drag-manager');
var pinboard_measure_tile_1 = require('../pinboard-measure-tile/pinboard-measure-tile');
var dimension_tile_1 = require('../dimension-tile/dimension-tile');
var PinboardPanel = (function (_super) {
    __extends(PinboardPanel, _super);
    function PinboardPanel() {
        _super.call(this);
        this.state = {
            dragOver: false
        };
    }
    PinboardPanel.prototype.canDrop = function (e) {
        var dimension = drag_manager_1.DragManager.getDragDimension();
        if (dimension) {
            var pinnedDimensions = this.props.essence.pinnedDimensions;
            return !pinnedDimensions.has(dimension.name);
        }
        return false;
    };
    PinboardPanel.prototype.dragEnter = function (e) {
        if (!this.canDrop(e))
            return;
        this.setState({ dragOver: true });
    };
    PinboardPanel.prototype.dragOver = function (e) {
        if (!this.canDrop(e))
            return;
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
    };
    PinboardPanel.prototype.dragLeave = function (e) {
        if (!this.canDrop(e))
            return;
        this.setState({ dragOver: false });
    };
    PinboardPanel.prototype.drop = function (e) {
        if (!this.canDrop(e))
            return;
        e.preventDefault();
        var dimension = drag_manager_1.DragManager.getDragDimension();
        if (dimension) {
            this.props.clicker.pin(dimension);
        }
        this.setState({ dragOver: false });
    };
    PinboardPanel.prototype.getColorsSortOn = function () {
        var essence = this.props.essence;
        var dataSource = essence.dataSource, splits = essence.splits, colors = essence.colors;
        if (colors) {
            var dimension = dataSource.getDimension(colors.dimension);
            if (dimension) {
                var split = splits.findSplitForDimension(dimension);
                if (split) {
                    return index_1.SortOn.fromSortAction(split.sortAction, dataSource, dimension);
                }
            }
        }
        return null;
    };
    PinboardPanel.prototype.onLegendSortOnSelect = function (sortOn) {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        var dataSource = essence.dataSource, splits = essence.splits, colors = essence.colors;
        if (colors) {
            var dimension = dataSource.getDimension(colors.dimension);
            if (dimension) {
                var split = splits.findSplitForDimension(dimension);
                if (split) {
                    var sortAction = split.sortAction;
                    var direction = sortAction ? sortAction.direction : plywood_1.SortAction.DESCENDING;
                    var newSplit = split.changeSortAction(new plywood_1.SortAction({
                        expression: sortOn.getExpression(),
                        direction: direction
                    }));
                    var newColors = index_1.Colors.fromLimit(colors.dimension, 5);
                    clicker.changeSplits(splits.replace(split, newSplit), index_1.VisStrategy.UnfairGame, newColors);
                }
            }
        }
    };
    PinboardPanel.prototype.onPinboardSortOnSelect = function (sortOn) {
        if (!sortOn.measure)
            return;
        var clicker = this.props.clicker;
        clicker.changePinnedSortMeasure(sortOn.measure);
    };
    PinboardPanel.prototype.onRemoveLegend = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        var dataSource = essence.dataSource, splits = essence.splits, colors = essence.colors;
        if (colors) {
            var dimension = dataSource.getDimension(colors.dimension);
            if (dimension) {
                var split = splits.findSplitForDimension(dimension);
                if (split) {
                    clicker.changeSplits(splits.removeSplit(split), index_1.VisStrategy.UnfairGame, null);
                }
            }
        }
    };
    PinboardPanel.prototype.render = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, getUrlPrefix = _a.getUrlPrefix, style = _a.style;
        var dragOver = this.state.dragOver;
        var dataSource = essence.dataSource, pinnedDimensions = essence.pinnedDimensions, colors = essence.colors;
        var legendMeasureSelector = null;
        var legendDimensionTile = null;
        var colorDimension = colors ? colors.dimension : null;
        if (colorDimension) {
            var dimension = dataSource.getDimension(colorDimension);
            if (dimension) {
                var colorsSortOn = this.getColorsSortOn();
                legendMeasureSelector = React.createElement(pinboard_measure_tile_1.PinboardMeasureTile, {essence: essence, title: "Legend", dimension: dimension, sortOn: colorsSortOn, onSelect: this.onLegendSortOnSelect.bind(this)});
                legendDimensionTile = React.createElement(dimension_tile_1.DimensionTile, {clicker: clicker, essence: essence, dimension: dimension, sortOn: colorsSortOn, colors: colors, onClose: this.onRemoveLegend.bind(this), getUrlPrefix: getUrlPrefix});
            }
        }
        var pinnedSortSortOn = index_1.SortOn.fromMeasure(essence.getPinnedSortMeasure());
        var dimensionTiles = [];
        pinnedDimensions.forEach(function (dimensionName) {
            var dimension = dataSource.getDimension(dimensionName);
            if (!dimension)
                return null;
            dimensionTiles.push(React.createElement(dimension_tile_1.DimensionTile, {key: dimension.name, clicker: clicker, essence: essence, dimension: dimension, sortOn: pinnedSortSortOn, onClose: clicker.unpin ? clicker.unpin.bind(clicker, dimension) : null, getUrlPrefix: getUrlPrefix}));
        });
        var placeholder = null;
        if (!dragOver && !dimensionTiles.length) {
            placeholder = React.createElement("div", {className: "placeholder"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/preview-pin.svg')}), React.createElement("div", {className: "placeholder-message"}, constants_1.STRINGS.pinboardPlaceholder));
        }
        return React.createElement("div", {className: "pinboard-panel", onDragEnter: this.dragEnter.bind(this), style: style}, legendMeasureSelector, legendDimensionTile, React.createElement(pinboard_measure_tile_1.PinboardMeasureTile, {essence: essence, title: constants_1.STRINGS.pinboard, sortOn: pinnedSortSortOn, onSelect: this.onPinboardSortOnSelect.bind(this)}), dimensionTiles, dragOver ? React.createElement("div", {className: "drop-indicator-tile"}) : null, placeholder, dragOver ? React.createElement("div", {className: "drag-mask", onDragOver: this.dragOver.bind(this), onDragLeave: this.dragLeave.bind(this), onDrop: this.drop.bind(this)}) : null);
    };
    return PinboardPanel;
}(React.Component));
exports.PinboardPanel = PinboardPanel;
