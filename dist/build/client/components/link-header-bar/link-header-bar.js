"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./link-header-bar.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var LinkHeaderBar = (function (_super) {
    __extends(LinkHeaderBar, _super);
    function LinkHeaderBar() {
        _super.call(this);
        //this.state = {};
    }
    LinkHeaderBar.prototype.render = function () {
        var _a = this.props, title = _a.title, user = _a.user, onNavClick = _a.onNavClick, onExploreClick = _a.onExploreClick, customization = _a.customization;
        var userButton = null;
        if (user) {
            userButton = React.createElement("div", {className: "icon-button"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/full-user.svg')}));
        }
        var headerStyle = null;
        if (customization && customization.headerBackground) {
            headerStyle = {
                background: customization.headerBackground
            };
        }
        return React.createElement("header", {className: "link-header-bar", style: headerStyle}, React.createElement("div", {className: "left-bar", onClick: onNavClick}, React.createElement("div", {className: "menu-icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/menu.svg')})), React.createElement("div", {className: "title"}, title)), React.createElement("div", {className: "right-bar"}, React.createElement("div", {className: "text-button", onClick: onExploreClick}, "Explore"), React.createElement("a", {className: "icon-button help", href: "https://groups.google.com/forum/#!forum/imply-user-group", target: "_blank"}, React.createElement(svg_icon_1.SvgIcon, {className: "help-icon", svg: require('../../icons/help.svg')})), userButton));
    };
    return LinkHeaderBar;
}(React.Component));
exports.LinkHeaderBar = LinkHeaderBar;
