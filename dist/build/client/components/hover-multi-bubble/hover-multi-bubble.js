"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./hover-multi-bubble.css');
var React = require('react');
var body_portal_1 = require('../body-portal/body-portal');
var segment_action_buttons_1 = require('../segment-action-buttons/segment-action-buttons');
var LEFT_OFFSET = 22;
var HoverMultiBubble = (function (_super) {
    __extends(HoverMultiBubble, _super);
    function HoverMultiBubble() {
        _super.call(this);
    }
    HoverMultiBubble.prototype.renderColorSwabs = function () {
        var colorEntries = this.props.colorEntries;
        if (!colorEntries || !colorEntries.length)
            return null;
        var colorSwabs = colorEntries.map(function (colorEntry) {
            var color = colorEntry.color, segmentLabel = colorEntry.segmentLabel, measureLabel = colorEntry.measureLabel;
            var swabStyle = { background: color };
            return React.createElement("div", {className: "color", key: segmentLabel}, React.createElement("div", {className: "color-swab", style: swabStyle}), React.createElement("div", {className: "color-name"}, segmentLabel), React.createElement("div", {className: "color-value"}, measureLabel));
        });
        return React.createElement("div", {className: "colors"}, colorSwabs);
    };
    HoverMultiBubble.prototype.render = function () {
        var _a = this.props, left = _a.left, top = _a.top, dimension = _a.dimension, segmentLabel = _a.segmentLabel, clicker = _a.clicker, onClose = _a.onClose;
        return React.createElement(body_portal_1.BodyPortal, {left: left + LEFT_OFFSET, top: top, disablePointerEvents: !clicker}, React.createElement("div", {className: "hover-multi-bubble"}, React.createElement("div", {className: "bucket"}, segmentLabel), this.renderColorSwabs(), clicker ? React.createElement(segment_action_buttons_1.SegmentActionButtons, {clicker: clicker, dimension: dimension, segmentLabel: segmentLabel, disableMoreMenu: true, onClose: onClose}) : null));
    };
    return HoverMultiBubble;
}(React.Component));
exports.HoverMultiBubble = HoverMultiBubble;
