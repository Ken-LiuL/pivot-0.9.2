"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./home-view.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var home_header_bar_1 = require('../../components/home-header-bar/home-header-bar');
var golden_center_1 = require('../../components/golden-center/golden-center');
var nav_logo_1 = require('../../components/nav-logo/nav-logo');
var nav_list_1 = require('../../components/nav-list/nav-list');
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        _super.apply(this, arguments);
    }
    HomeView.prototype.render = function () {
        var _a = this.props, user = _a.user, dataSources = _a.dataSources, onNavClick = _a.onNavClick, onOpenAbout = _a.onOpenAbout, customization = _a.customization;
        var navLinks = dataSources.map(function (ds) {
            return {
                name: ds.name,
                title: ds.title,
                href: '#' + ds.name
            };
        });
        var infoAndFeedback = [{
                name: 'info',
                title: constants_1.STRINGS.infoAndFeedback,
                onClick: onOpenAbout
            }];
        return React.createElement("div", {className: "home-view"}, React.createElement(home_header_bar_1.HomeHeaderBar, {user: user, onNavClick: onNavClick, customization: customization, title: constants_1.STRINGS.home}), React.createElement("div", {className: "container"}, React.createElement(golden_center_1.GoldenCenter, null, React.createElement("div", {className: "home"}, React.createElement(nav_logo_1.NavLogo, null), React.createElement(nav_list_1.NavList, {title: "Data Cubes", navLinks: navLinks, iconSvg: require('../../icons/full-cube.svg')}), React.createElement(nav_list_1.NavList, {navLinks: infoAndFeedback})))));
    };
    return HomeView;
}(React.Component));
exports.HomeView = HomeView;
