"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./nav-logo.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var NavLogo = (function (_super) {
    __extends(NavLogo, _super);
    function NavLogo() {
        _super.call(this);
    }
    NavLogo.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, customLogoSvg = _a.customLogoSvg;
        var svg = customLogoSvg || require('../../icons/pivot-logo.svg');
        return React.createElement("div", {className: "nav-logo", onClick: onClick}, React.createElement("div", {className: "logo"}, React.createElement(svg_icon_1.SvgIcon, {svg: svg})));
    };
    return NavLogo;
}(React.Component));
exports.NavLogo = NavLogo;
