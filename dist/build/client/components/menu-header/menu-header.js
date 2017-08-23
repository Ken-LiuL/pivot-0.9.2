"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./menu-header.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var MenuHeader = (function (_super) {
    __extends(MenuHeader, _super);
    function MenuHeader() {
        _super.call(this);
    }
    MenuHeader.prototype.render = function () {
        var _a = this.props, dimension = _a.dimension, onSearchClick = _a.onSearchClick;
        var searchBar = null;
        if (onSearchClick) {
            searchBar = React.createElement("div", {className: "search", onClick: onSearchClick}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/loupe.svg')}));
        }
        return React.createElement("div", {className: "menu-header"}, React.createElement("div", {className: "menu-title"}, dimension.title), searchBar);
    };
    return MenuHeader;
}(React.Component));
exports.MenuHeader = MenuHeader;
