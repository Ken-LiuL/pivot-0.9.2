"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./segment-bubble.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var body_portal_1 = require('../body-portal/body-portal');
var shpitz_1 = require('../shpitz/shpitz');
var segment_action_buttons_1 = require('../segment-action-buttons/segment-action-buttons');
var OFFSET_V = -10;
var PER_LETTER_PIXELS = 8;
var SegmentBubble = (function (_super) {
    __extends(SegmentBubble, _super);
    function SegmentBubble() {
        _super.call(this);
    }
    SegmentBubble.prototype.render = function () {
        var _a = this.props, left = _a.left, top = _a.top, dimension = _a.dimension, segmentLabel = _a.segmentLabel, measureLabel = _a.measureLabel, clicker = _a.clicker, openRawDataModal = _a.openRawDataModal, onClose = _a.onClose;
        var textElement;
        if (segmentLabel) {
            var minTextWidth = dom_1.clamp(segmentLabel.length * PER_LETTER_PIXELS, 80, 300);
            textElement = React.createElement("div", {className: "text", style: { minWidth: minTextWidth }}, React.createElement("div", {className: "segment"}, segmentLabel), measureLabel ? React.createElement("div", {className: "measure-value"}, measureLabel) : null);
        }
        var actionsElement = null;
        if (clicker) {
            actionsElement = React.createElement(segment_action_buttons_1.SegmentActionButtons, {clicker: clicker, dimension: dimension, segmentLabel: segmentLabel, openRawDataModal: openRawDataModal, onClose: onClose});
        }
        return React.createElement(body_portal_1.BodyPortal, {left: left, top: top + OFFSET_V, disablePointerEvents: !clicker}, React.createElement("div", {className: "segment-bubble", ref: "bubble"}, textElement, actionsElement, React.createElement(shpitz_1.Shpitz, {direction: "up"})));
    };
    return SegmentBubble;
}(React.Component));
exports.SegmentBubble = SegmentBubble;
