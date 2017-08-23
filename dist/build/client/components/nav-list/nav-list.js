"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./nav-list.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var NavList = (function (_super) {
    __extends(NavList, _super);
    function NavList() {
        _super.apply(this, arguments);
    }
    NavList.prototype.renderIcon = function (iconSvg) {
        if (!iconSvg)
            return null;
        return React.createElement("span", {className: "icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: iconSvg}));
    };
    NavList.prototype.renderNavList = function () {
        var _this = this;
        var _a = this.props, navLinks = _a.navLinks, iconSvg = _a.iconSvg, selected = _a.selected;
        return navLinks.map(function (navLink) {
            return React.createElement(navLink.href ? 'a' : 'div', {
                className: dom_1.classNames('item', { selected: selected && selected === navLink.name }),
                key: navLink.name,
                href: navLink.href,
                target: navLink.newTab ? '_blank' : null,
                onClick: navLink.onClick
            }, _this.renderIcon(iconSvg), navLink.title);
        });
    };
    NavList.prototype.render = function () {
        var title = this.props.title;
        var className = "nav-list";
        var titleSection = null;
        if (title) {
            titleSection = React.createElement("div", {className: "group-title"}, title);
        }
        else {
            className += " no-title";
        }
        return React.createElement("div", {className: className}, titleSection, React.createElement("div", {className: "items"}, this.renderNavList()));
    };
    ;
    return NavList;
}(React.Component));
exports.NavList = NavList;
