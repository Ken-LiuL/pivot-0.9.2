"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./fancy-drag-indicator.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var constants_1 = require('../../config/constants');
var FancyDragIndicator = (function (_super) {
    __extends(FancyDragIndicator, _super);
    function FancyDragIndicator() {
        _super.call(this);
    }
    FancyDragIndicator.prototype.render = function () {
        var dragPosition = this.props.dragPosition;
        if (!dragPosition)
            return null;
        var sectionWidth = constants_1.CORE_ITEM_WIDTH + constants_1.CORE_ITEM_GAP;
        var ghostArrowLeft;
        var dragGhostElement = null;
        if (dragPosition.isInsert()) {
            ghostArrowLeft = dragPosition.insert * sectionWidth - constants_1.CORE_ITEM_GAP / 2;
        }
        else {
            ghostArrowLeft = dragPosition.replace * sectionWidth + constants_1.CORE_ITEM_WIDTH / 2;
            var left = dragPosition.replace * sectionWidth;
            dragGhostElement = React.createElement("div", {className: "drag-ghost-element", style: { left: left }});
        }
        return React.createElement("div", {className: "fancy-drag-indicator"}, dragGhostElement, React.createElement(svg_icon_1.SvgIcon, {className: "drag-ghost-arrow", svg: require('../../icons/drag-arrow.svg'), style: { left: ghostArrowLeft }}));
    };
    return FancyDragIndicator;
}(React.Component));
exports.FancyDragIndicator = FancyDragIndicator;
