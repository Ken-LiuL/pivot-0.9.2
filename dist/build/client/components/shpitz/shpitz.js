"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./shpitz.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var Shpitz = (function (_super) {
    __extends(Shpitz, _super);
    function Shpitz() {
        _super.call(this);
    }
    Shpitz.prototype.render = function () {
        var _a = this.props, direction = _a.direction, style = _a.style;
        return React.createElement("div", {className: dom_1.classNames('shpitz', direction), style: style}, React.createElement("div", {className: "rectangle"}));
    };
    return Shpitz;
}(React.Component));
exports.Shpitz = Shpitz;
