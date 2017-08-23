"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./loader.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        _super.call(this);
    }
    Loader.prototype.render = function () {
        return React.createElement("div", {className: "loader"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/grid-loader.svg')}));
    };
    return Loader;
}(React.Component));
exports.Loader = Loader;
