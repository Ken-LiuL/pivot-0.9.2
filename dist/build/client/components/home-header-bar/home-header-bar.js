"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./home-header-bar.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var HomeHeaderBar = (function (_super) {
    __extends(HomeHeaderBar, _super);
    function HomeHeaderBar() {
        _super.apply(this, arguments);
    }
    HomeHeaderBar.prototype.render = function () {
        var _a = this.props, user = _a.user, onNavClick = _a.onNavClick, customization = _a.customization, title = _a.title;
        // One day
        //<div className="icon-button" onClick={this.handleSettings.bind(this)}>
        //  <SvgIcon className="not-implemented" svg={require('../../icons/full-settings.svg')}/>
        //</div>
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
        return React.createElement("header", {className: "home-header-bar", style: headerStyle}, React.createElement("div", {className: "left-bar", onClick: onNavClick}, React.createElement("div", {className: "menu-icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/menu.svg')})), React.createElement("div", {className: "title"}, title)), React.createElement("div", {className: "right-bar"}, React.createElement("a", {className: "icon-button help", href: "https://groups.google.com/forum/#!forum/imply-user-group", target: "_blank"}, React.createElement(svg_icon_1.SvgIcon, {className: "help-icon", svg: require('../../icons/help.svg')})), React.createElement("a", {className: "icon-button github", href: "https://github.com/implydata/pivot", target: "_blank"}, React.createElement(svg_icon_1.SvgIcon, {className: "github-icon", svg: require('../../icons/github.svg')})), userButton));
    };
    return HomeHeaderBar;
}(React.Component));
exports.HomeHeaderBar = HomeHeaderBar;
