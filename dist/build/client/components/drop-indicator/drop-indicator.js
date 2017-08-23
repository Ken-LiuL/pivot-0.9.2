"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./drop-indicator.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var DropIndicator = (function (_super) {
    __extends(DropIndicator, _super);
    function DropIndicator() {
        _super.call(this);
    }
    DropIndicator.prototype.render = function () {
        return React.createElement("div", {className: "drop-indicator"}, React.createElement("div", {className: "white-out"}), React.createElement("div", {className: "action"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/split-replace.svg')})));
    };
    return DropIndicator;
}(React.Component));
exports.DropIndicator = DropIndicator;
