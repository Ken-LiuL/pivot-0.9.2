"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./cube-header-bar.css');
var React = require('react');
var immutable_class_1 = require("immutable-class");
var dom_1 = require("../../utils/dom/dom");
var svg_icon_1 = require('../svg-icon/svg-icon');
var hiluk_menu_1 = require('../hiluk-menu/hiluk-menu');
var auto_refresh_menu_1 = require('../auto-refresh-menu/auto-refresh-menu');
var user_menu_1 = require('../user-menu/user-menu');
var settings_menu_1 = require('../settings-menu/settings-menu');
var CubeHeaderBar = (function (_super) {
    __extends(CubeHeaderBar, _super);
    function CubeHeaderBar() {
        _super.call(this);
        this.state = {
            hilukMenuOpenOn: null,
            autoRefreshMenuOpenOn: null,
            autoRefreshRate: null,
            userMenuOpenOn: null,
            animating: false
        };
    }
    CubeHeaderBar.prototype.componentDidMount = function () {
        this.mounted = true;
        var dataSource = this.props.essence.dataSource;
        this.setAutoRefreshFromDataSource(dataSource);
    };
    CubeHeaderBar.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.essence.dataSource.name !== nextProps.essence.dataSource.name) {
            this.setAutoRefreshFromDataSource(nextProps.essence.dataSource);
        }
        if (!this.props.updatingMaxTime && nextProps.updatingMaxTime) {
            this.setState({ animating: true });
            setTimeout(function () {
                if (!_this.mounted)
                    return;
                _this.setState({ animating: false });
            }, 1000);
        }
    };
    CubeHeaderBar.prototype.componentWillUnmount = function () {
        this.mounted = false;
        this.clearTimerIfExists();
    };
    CubeHeaderBar.prototype.setAutoRefreshFromDataSource = function (dataSource) {
        var refreshRule = dataSource.refreshRule;
        if (refreshRule.isFixed())
            return;
        this.setAutoRefreshRate(refreshRule.refresh);
    };
    CubeHeaderBar.prototype.setAutoRefreshRate = function (rate) {
        var autoRefreshRate = this.state.autoRefreshRate;
        if (immutable_class_1.immutableEqual(autoRefreshRate, rate))
            return;
        this.clearTimerIfExists();
        // Make new timer
        var refreshMaxTime = this.props.refreshMaxTime;
        if (refreshMaxTime && rate) {
            this.autoRefreshTimer = setInterval(function () {
                refreshMaxTime();
            }, rate.getCanonicalLength());
        }
        this.setState({
            autoRefreshRate: rate
        });
    };
    CubeHeaderBar.prototype.clearTimerIfExists = function () {
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
        }
    };
    // Share menu ("hiluk" = share in Hebrew, kind of)
    CubeHeaderBar.prototype.onHilukMenuClick = function (e) {
        var hilukMenuOpenOn = this.state.hilukMenuOpenOn;
        if (hilukMenuOpenOn)
            return this.onHilukMenuClose();
        this.setState({
            hilukMenuOpenOn: e.target
        });
    };
    CubeHeaderBar.prototype.onHilukMenuClose = function () {
        this.setState({
            hilukMenuOpenOn: null
        });
    };
    CubeHeaderBar.prototype.renderHilukMenu = function () {
        var _a = this.props, essence = _a.essence, getUrlPrefix = _a.getUrlPrefix, customization = _a.customization, openRawDataModal = _a.openRawDataModal, getDownloadableDataset = _a.getDownloadableDataset;
        var hilukMenuOpenOn = this.state.hilukMenuOpenOn;
        if (!hilukMenuOpenOn)
            return null;
        var externalViews = null;
        if (customization && customization.externalViews) {
            externalViews = customization.externalViews;
        }
        return React.createElement(hiluk_menu_1.HilukMenu, {essence: essence, openOn: hilukMenuOpenOn, onClose: this.onHilukMenuClose.bind(this), getUrlPrefix: getUrlPrefix, openRawDataModal: openRawDataModal, externalViews: externalViews, getDownloadableDataset: getDownloadableDataset});
    };
    // Auto Refresh menu
    CubeHeaderBar.prototype.onAutoRefreshMenuClick = function (e) {
        var autoRefreshMenuOpenOn = this.state.autoRefreshMenuOpenOn;
        if (autoRefreshMenuOpenOn)
            return this.onAutoRefreshMenuClose();
        this.setState({
            autoRefreshMenuOpenOn: e.target
        });
    };
    CubeHeaderBar.prototype.onAutoRefreshMenuClose = function () {
        this.setState({
            autoRefreshMenuOpenOn: null
        });
    };
    CubeHeaderBar.prototype.renderAutoRefreshMenu = function () {
        var _a = this.props, refreshMaxTime = _a.refreshMaxTime, essence = _a.essence;
        var _b = this.state, autoRefreshMenuOpenOn = _b.autoRefreshMenuOpenOn, autoRefreshRate = _b.autoRefreshRate;
        if (!autoRefreshMenuOpenOn)
            return null;
        return React.createElement(auto_refresh_menu_1.AutoRefreshMenu, {openOn: autoRefreshMenuOpenOn, onClose: this.onAutoRefreshMenuClose.bind(this), autoRefreshRate: autoRefreshRate, setAutoRefreshRate: this.setAutoRefreshRate.bind(this), refreshMaxTime: refreshMaxTime, dataSource: essence.dataSource});
    };
    // User menu
    CubeHeaderBar.prototype.onUserMenuClick = function (e) {
        var userMenuOpenOn = this.state.userMenuOpenOn;
        if (userMenuOpenOn)
            return this.onUserMenuClose();
        this.setState({
            userMenuOpenOn: e.target
        });
    };
    CubeHeaderBar.prototype.onUserMenuClose = function () {
        this.setState({
            userMenuOpenOn: null
        });
    };
    CubeHeaderBar.prototype.renderUserMenu = function () {
        var user = this.props.user;
        var userMenuOpenOn = this.state.userMenuOpenOn;
        if (!userMenuOpenOn)
            return null;
        return React.createElement(user_menu_1.UserMenu, {openOn: userMenuOpenOn, onClose: this.onUserMenuClose.bind(this), user: user});
    };
    // Settings menu
    CubeHeaderBar.prototype.onSettingsMenuClick = function (e) {
        var settingsMenuOpen = this.state.settingsMenuOpen;
        if (settingsMenuOpen)
            return this.onSettingsMenuClose();
        if (e.metaKey && e.altKey) {
            console.log(this.props.essence.toJS());
            return;
        }
        this.setState({
            settingsMenuOpen: e.target
        });
    };
    CubeHeaderBar.prototype.onSettingsMenuClose = function () {
        this.setState({
            settingsMenuOpen: null
        });
    };
    CubeHeaderBar.prototype.renderSettingsMenu = function () {
        var _a = this.props, changeTimezone = _a.changeTimezone, timezone = _a.timezone, customization = _a.customization;
        var settingsMenuOpen = this.state.settingsMenuOpen;
        if (!settingsMenuOpen)
            return null;
        return React.createElement(settings_menu_1.SettingsMenu, {timezone: timezone, timezones: customization.getTimezones(), changeTimezone: changeTimezone, openOn: settingsMenuOpen, onClose: this.onSettingsMenuClose.bind(this)});
    };
    CubeHeaderBar.prototype.render = function () {
        var _a = this.props, user = _a.user, onNavClick = _a.onNavClick, essence = _a.essence, customization = _a.customization;
        var animating = this.state.animating;
        var userButton = null;
        if (user) {
            userButton = React.createElement("div", {className: "icon-button user", onClick: this.onUserMenuClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/full-user.svg')}));
        }
        var headerStyle = null;
        if (customization && customization.headerBackground) {
            headerStyle = {
                background: customization.headerBackground
            };
        }
        return React.createElement("header", {className: "cube-header-bar", style: headerStyle}, React.createElement("div", {className: "left-bar", onClick: onNavClick}, React.createElement("div", {className: "menu-icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/menu.svg')})), React.createElement("div", {className: "title"}, essence.dataSource.title)), React.createElement("div", {className: "right-bar"}, React.createElement("div", {className: dom_1.classNames("icon-button", "auto-refresh", { "refreshing": animating }), onClick: this.onAutoRefreshMenuClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {className: "auto-refresh-icon", svg: require('../../icons/full-refresh.svg')})), React.createElement("div", {className: "icon-button hiluk", onClick: this.onHilukMenuClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {className: "hiluk-icon", svg: require('../../icons/full-hiluk.svg')})), React.createElement("div", {className: "icon-button settings", onClick: this.onSettingsMenuClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {className: "settings-icon", svg: require('../../icons/full-settings.svg')})), userButton), this.renderHilukMenu(), this.renderAutoRefreshMenu(), this.renderSettingsMenu(), this.renderUserMenu());
    };
    return CubeHeaderBar;
}(React.Component));
exports.CubeHeaderBar = CubeHeaderBar;
