"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./highlight-string.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var HighlightString = (function (_super) {
    __extends(HighlightString, _super);
    function HighlightString() {
        _super.call(this);
    }
    HighlightString.prototype.highlightInString = function () {
        var _a = this.props, text = _a.text, highlightText = _a.highlightText;
        if (!highlightText)
            return text;
        var strLower = text.toLowerCase();
        var startIndex = strLower.indexOf(highlightText.toLowerCase());
        if (startIndex === -1)
            return text;
        var endIndex = startIndex + highlightText.length;
        return [
            React.createElement("span", {className: "pre", key: "pre"}, text.substring(0, startIndex)),
            React.createElement("span", {className: "bold", key: "bold"}, text.substring(startIndex, endIndex)),
            React.createElement("span", {className: "post", key: "post"}, text.substring(endIndex))
        ];
    };
    HighlightString.prototype.render = function () {
        var className = this.props.className;
        return React.createElement("span", {className: dom_1.classNames('highlight-string', className)}, this.highlightInString());
    };
    return HighlightString;
}(React.Component));
exports.HighlightString = HighlightString;
