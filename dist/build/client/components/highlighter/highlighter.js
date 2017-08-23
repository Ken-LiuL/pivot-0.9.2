"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./highlighter.css');
var React = require('react');
var Highlighter = (function (_super) {
    __extends(Highlighter, _super);
    function Highlighter() {
        _super.call(this);
    }
    Highlighter.prototype.render = function () {
        var _a = this.props, highlightRange = _a.highlightRange, scaleX = _a.scaleX;
        if (!highlightRange)
            return null;
        var startPos = scaleX(highlightRange.start);
        var endPos = scaleX(highlightRange.end);
        var whiteoutLeftStyle = {
            width: Math.max(startPos, 0)
        };
        var frameStyle = {
            left: startPos,
            width: Math.max(endPos - startPos, 0)
        };
        var whiteoutRightStyle = {
            left: endPos
        };
        return React.createElement("div", {className: "highlighter"}, React.createElement("div", {className: "whiteout left", style: whiteoutLeftStyle}), React.createElement("div", {className: "frame", style: frameStyle}), React.createElement("div", {className: "whiteout right", style: whiteoutRightStyle}));
    };
    return Highlighter;
}(React.Component));
exports.Highlighter = Highlighter;
