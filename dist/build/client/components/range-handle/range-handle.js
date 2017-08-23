"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./range-handle.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var RangeHandle = (function (_super) {
    __extends(RangeHandle, _super);
    function RangeHandle() {
        _super.call(this);
        this.state = {
            anchor: null
        };
        this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
        this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
    }
    RangeHandle.prototype.onGlobalMouseMove = function (event) {
        var _a = this.props, onChange = _a.onChange, leftBound = _a.leftBound, rightBound = _a.rightBound;
        var anchor = this.state.anchor;
        var newX = dom_1.getXFromEvent(event) - anchor;
        onChange(dom_1.clamp(newX, leftBound, rightBound));
    };
    RangeHandle.prototype.onMouseDown = function (event) {
        var _a = this.props, offset = _a.offset, positionLeft = _a.positionLeft;
        var x = dom_1.getXFromEvent(event);
        var anchor = x - offset - positionLeft;
        this.setState({
            anchor: anchor
        });
        event.preventDefault();
        window.addEventListener('mouseup', this.onGlobalMouseUp);
        window.addEventListener('mousemove', this.onGlobalMouseMove);
    };
    RangeHandle.prototype.onGlobalMouseUp = function () {
        window.removeEventListener('mouseup', this.onGlobalMouseUp);
        window.removeEventListener('mousemove', this.onGlobalMouseMove);
    };
    RangeHandle.prototype.render = function () {
        var _a = this.props, positionLeft = _a.positionLeft, isAny = _a.isAny, isBeyondMin = _a.isBeyondMin, isBeyondMax = _a.isBeyondMax;
        var style = { left: positionLeft };
        return React.createElement("div", {className: dom_1.classNames("range-handle", { empty: isAny, "beyond min": isBeyondMin, "beyond max": isBeyondMax }), style: style, onMouseDown: this.onMouseDown.bind(this)});
    };
    return RangeHandle;
}(React.Component));
exports.RangeHandle = RangeHandle;
