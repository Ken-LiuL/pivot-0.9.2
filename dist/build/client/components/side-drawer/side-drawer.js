"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./side-drawer.css');
var React = require('react');
var ReactDOM = require('react-dom');
var constants_1 = require('../../config/constants');
var dom_1 = require('../../utils/dom/dom');
var nav_logo_1 = require('../nav-logo/nav-logo');
var svg_icon_1 = require('../svg-icon/svg-icon');
var nav_list_1 = require('../nav-list/nav-list');
var SideDrawer = (function (_super) {
    __extends(SideDrawer, _super);
    function SideDrawer() {
        _super.call(this);
        //this.state = {};
        this.globalMouseDownListener = this.globalMouseDownListener.bind(this);
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    SideDrawer.prototype.componentDidMount = function () {
        window.addEventListener('mousedown', this.globalMouseDownListener);
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    SideDrawer.prototype.componentWillUnmount = function () {
        window.removeEventListener('mousedown', this.globalMouseDownListener);
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    SideDrawer.prototype.globalMouseDownListener = function (e) {
        var myElement = ReactDOM.findDOMNode(this);
        var target = e.target;
        if (dom_1.isInside(target, myElement))
            return;
        this.props.onClose();
    };
    SideDrawer.prototype.globalKeyDownListener = function (e) {
        if (!dom_1.escapeKey(e))
            return;
        this.props.onClose();
    };
    SideDrawer.prototype.onHomeClick = function () {
        window.location.hash = '#';
    };
    SideDrawer.prototype.renderOverviewLink = function () {
        var showOverviewLink = this.props.showOverviewLink;
        if (!showOverviewLink)
            return null;
        return React.createElement("div", {className: "home-link", onClick: this.onHomeClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/home.svg')}), React.createElement("span", null, "Overview"));
    };
    SideDrawer.prototype.render = function () {
        var _a = this.props, onClose = _a.onClose, selectedDataSource = _a.selectedDataSource, dataSources = _a.dataSources, onOpenAbout = _a.onOpenAbout, customization = _a.customization;
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
                onClick: function () {
                    onClose();
                    onOpenAbout();
                }
            }];
        var customLogoSvg = null;
        if (customization && customization.customLogoSvg) {
            customLogoSvg = customization.customLogoSvg;
        }
        return React.createElement("div", {className: "side-drawer"}, React.createElement(nav_logo_1.NavLogo, {customLogoSvg: customLogoSvg, onClick: onClose}), this.renderOverviewLink(), React.createElement(nav_list_1.NavList, {title: "Data Cubes", selected: selectedDataSource ? selectedDataSource.name : null, navLinks: navLinks, iconSvg: require('../../icons/full-cube.svg')}), React.createElement(nav_list_1.NavList, {navLinks: infoAndFeedback}));
    };
    return SideDrawer;
}(React.Component));
exports.SideDrawer = SideDrawer;
