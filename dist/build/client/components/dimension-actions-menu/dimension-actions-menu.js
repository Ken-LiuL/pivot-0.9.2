"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./dimension-actions-menu.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var constants_1 = require('../../config/constants');
var index_1 = require('../../../common/models/index');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var ACTION_SIZE = 60;
var DimensionActionsMenu = (function (_super) {
    __extends(DimensionActionsMenu, _super);
    function DimensionActionsMenu() {
        _super.call(this);
    }
    DimensionActionsMenu.prototype.onFilter = function () {
        var _a = this.props, dimension = _a.dimension, triggerFilterMenu = _a.triggerFilterMenu, onClose = _a.onClose;
        triggerFilterMenu(dimension);
        onClose();
    };
    DimensionActionsMenu.prototype.onSplit = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, triggerSplitMenu = _a.triggerSplitMenu, onClose = _a.onClose;
        if (essence.splits.hasSplitOn(dimension) && essence.splits.length() === 1) {
            triggerSplitMenu(dimension);
        }
        else {
            clicker.changeSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.UnfairGame);
        }
        onClose();
    };
    DimensionActionsMenu.prototype.onSubsplit = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, triggerSplitMenu = _a.triggerSplitMenu, onClose = _a.onClose;
        if (essence.splits.hasSplitOn(dimension)) {
            triggerSplitMenu(dimension);
        }
        else {
            clicker.addSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.UnfairGame);
        }
        onClose();
    };
    DimensionActionsMenu.prototype.onPin = function () {
        var _a = this.props, clicker = _a.clicker, dimension = _a.dimension, onClose = _a.onClose;
        clicker.pin(dimension);
        onClose();
    };
    DimensionActionsMenu.prototype.render = function () {
        var _a = this.props, direction = _a.direction, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose;
        if (!dimension)
            return null;
        var menuSize = index_1.Stage.fromSize(ACTION_SIZE * 2, ACTION_SIZE * 2);
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "dimension-actions-menu", direction: direction, containerStage: containerStage, stage: menuSize, fixedSize: true, openOn: openOn, onClose: onClose}, React.createElement("div", {className: "filter action", onClick: this.onFilter.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/preview-filter.svg')}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.filter)), React.createElement("div", {className: "pin action", onClick: this.onPin.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/preview-pin.svg')}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.pin)), React.createElement("div", {className: "split action", onClick: this.onSplit.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/preview-split.svg')}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.split)), React.createElement("div", {className: "subsplit action", onClick: this.onSubsplit.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/preview-subsplit.svg')}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.subsplit)));
    };
    return DimensionActionsMenu;
}(React.Component));
exports.DimensionActionsMenu = DimensionActionsMenu;
