"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./pivot-application.css');
var React = require('react');
var plywood_1 = require('plywood');
var home_view_1 = require('../home-view/home-view');
var link_view_1 = require('../link-view/link-view');
var cube_view_1 = require('../cube-view/cube-view');
var settings_view_1 = require('../settings-view/settings-view');
exports.HOME = "home";
exports.CUBE = "cube";
exports.LINK = "link";
exports.SETTINGS = "settings";
var PivotApplication = (function (_super) {
    __extends(PivotApplication, _super);
    function PivotApplication() {
        _super.call(this);
        this.hashUpdating = false;
        this.state = {
            appSettings: null,
            drawerOpen: false,
            selectedDataSource: null,
            viewType: null,
            viewHash: null,
            showAboutModal: false
        };
        this.globalHashChangeListener = this.globalHashChangeListener.bind(this);
    }
    PivotApplication.prototype.componentWillMount = function () {
        var appSettings = this.props.appSettings;
        var dataSources = appSettings.dataSources;
        if (!dataSources.length)
            throw new Error('must have data sources');
        var hash = window.location.hash;
        var viewType = this.getViewTypeFromHash(hash);
        var selectedDataSource = this.getDataSourceFromHash(appSettings.dataSources, hash);
        var viewHash = this.getViewHashFromHash(hash);
        // If datasource does not exit bounce to home
        if (viewType === exports.CUBE && !selectedDataSource) {
            this.changeHash('');
            viewType = exports.HOME;
        }
        if (viewType === exports.HOME && dataSources.length === 1) {
            viewType = exports.CUBE;
            selectedDataSource = dataSources[0];
        }
        this.setState({
            viewType: viewType,
            viewHash: viewHash,
            selectedDataSource: selectedDataSource,
            appSettings: appSettings
        });
    };
    PivotApplication.prototype.componentDidMount = function () {
        var _this = this;
        window.addEventListener('hashchange', this.globalHashChangeListener);
        require.ensure(['clipboard'], function (require) {
            var Clipboard = require('clipboard');
            var clipboard = new Clipboard('.clipboard');
            clipboard.on('success', function (e) {
                // ToDo: do something here
            });
        }, 'clipboard');
        require.ensure(['react-addons-css-transition-group', '../../components/side-drawer/side-drawer'], function (require) {
            _this.setState({
                ReactCSSTransitionGroupAsync: require('react-addons-css-transition-group'),
                SideDrawerAsync: require('../../components/side-drawer/side-drawer').SideDrawer
            });
        }, 'side-drawer');
        require.ensure(['../../components/about-modal/about-modal'], function (require) {
            _this.setState({
                AboutModalAsync: require('../../components/about-modal/about-modal').AboutModal
            });
        }, 'about-modal');
        require.ensure(['../../components/notifications/notifications'], function (require) {
            _this.setState({
                NotificationsAsync: require('../../components/notifications/notifications').Notifications
            });
        }, 'notifications');
    };
    PivotApplication.prototype.componentWillUnmount = function () {
        window.removeEventListener('hashchange', this.globalHashChangeListener);
    };
    PivotApplication.prototype.globalHashChangeListener = function () {
        if (this.hashUpdating)
            return;
        this.hashToState(window.location.hash);
    };
    PivotApplication.prototype.hashToState = function (hash) {
        var dataSources = this.state.appSettings.dataSources;
        var viewType = this.getViewTypeFromHash(hash);
        var viewHash = this.getViewHashFromHash(hash);
        var newState = {
            viewType: viewType,
            viewHash: viewHash,
            drawerOpen: false
        };
        if (viewType === exports.CUBE) {
            var dataSource = this.getDataSourceFromHash(dataSources, hash);
            if (!dataSource)
                dataSource = dataSources[0];
            newState.selectedDataSource = dataSource;
        }
        else {
            newState.selectedDataSource = null;
        }
        this.setState(newState);
    };
    PivotApplication.prototype.parseHash = function (hash) {
        if (hash[0] === '#')
            hash = hash.substr(1);
        return hash.split('/');
    };
    PivotApplication.prototype.getViewTypeFromHash = function (hash) {
        var readOnly = this.props.readOnly;
        var appSettings = this.state.appSettings || this.props.appSettings;
        var viewType = this.parseHash(hash)[0];
        if (!viewType || viewType === exports.HOME)
            return appSettings.linkViewConfig ? exports.LINK : exports.HOME;
        if (viewType === exports.SETTINGS)
            return readOnly ? exports.HOME : exports.SETTINGS;
        if (appSettings.linkViewConfig && viewType === exports.LINK)
            return exports.LINK;
        return exports.CUBE;
    };
    PivotApplication.prototype.getDataSourceFromHash = function (dataSources, hash) {
        // can change header from hash
        var parts = this.parseHash(hash);
        var dataSourceName = parts.shift();
        return plywood_1.helper.findByName(dataSources, dataSourceName);
    };
    PivotApplication.prototype.getViewHashFromHash = function (hash) {
        var parts = this.parseHash(hash);
        if (parts.length < 2)
            return null;
        parts.shift();
        return parts.join('/');
    };
    PivotApplication.prototype.sideDrawerOpen = function (drawerOpen) {
        this.setState({ drawerOpen: drawerOpen });
    };
    PivotApplication.prototype.changeHash = function (hash, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        this.hashUpdating = true;
        // Hash initialization, no need to add the intermediary url in the history
        if (window.location.hash === "#" + hash.split('/')[0]) {
            window.history.replaceState(undefined, undefined, "#" + hash);
        }
        else {
            window.location.hash = "#" + hash;
        }
        setTimeout(function () {
            _this.hashUpdating = false;
        }, 5);
        if (force)
            this.hashToState(hash);
    };
    PivotApplication.prototype.updateViewHash = function (viewHash, force) {
        if (force === void 0) { force = false; }
        var viewType = this.state.viewType;
        var newHash;
        if (viewType === exports.CUBE) {
            newHash = this.state.selectedDataSource.name + "/" + viewHash;
        }
        else if (viewType === exports.LINK) {
            newHash = viewType + "/" + viewHash;
        }
        else {
            newHash = viewType;
        }
        this.changeHash(newHash, force);
    };
    PivotApplication.prototype.getUrlPrefix = function (baseOnly) {
        if (baseOnly === void 0) { baseOnly = false; }
        var viewType = this.state.viewType;
        var url = window.location;
        var urlBase = url.origin + url.pathname;
        if (baseOnly)
            return urlBase;
        var newPrefix;
        if (viewType === exports.CUBE) {
            newPrefix = this.state.selectedDataSource.name + "/";
        }
        else {
            newPrefix = viewType;
        }
        return urlBase + '#' + newPrefix;
    };
    PivotApplication.prototype.openAboutModal = function () {
        this.setState({
            showAboutModal: true
        });
    };
    PivotApplication.prototype.onAboutModalClose = function () {
        this.setState({
            showAboutModal: false
        });
    };
    PivotApplication.prototype.onSettingsChange = function (newSettings) {
        this.setState({
            appSettings: newSettings
        });
    };
    PivotApplication.prototype.renderAboutModal = function () {
        var version = this.props.version;
        var _a = this.state, AboutModalAsync = _a.AboutModalAsync, showAboutModal = _a.showAboutModal;
        if (!AboutModalAsync || !showAboutModal)
            return null;
        return React.createElement(AboutModalAsync, {version: version, onClose: this.onAboutModalClose.bind(this)});
    };
    PivotApplication.prototype.renderNotifications = function () {
        var version = this.props.version;
        var NotificationsAsync = this.state.NotificationsAsync;
        if (!NotificationsAsync)
            return null;
        return React.createElement(NotificationsAsync, null);
    };
    PivotApplication.prototype.render = function () {
        var _a = this.props, maxFilters = _a.maxFilters, maxSplits = _a.maxSplits, user = _a.user, version = _a.version;
        var _b = this.state, viewType = _b.viewType, viewHash = _b.viewHash, selectedDataSource = _b.selectedDataSource, ReactCSSTransitionGroupAsync = _b.ReactCSSTransitionGroupAsync, drawerOpen = _b.drawerOpen, SideDrawerAsync = _b.SideDrawerAsync, appSettings = _b.appSettings;
        var dataSources = appSettings.dataSources, customization = appSettings.customization, linkViewConfig = appSettings.linkViewConfig;
        var sideDrawer = null;
        if (drawerOpen && SideDrawerAsync) {
            var closeSideDrawer = this.sideDrawerOpen.bind(this, false);
            sideDrawer = React.createElement(SideDrawerAsync, {key: 'drawer', selectedDataSource: selectedDataSource, dataSources: dataSources, onOpenAbout: this.openAboutModal.bind(this), onClose: closeSideDrawer, customization: customization, showOverviewLink: Boolean(linkViewConfig && viewType === exports.CUBE)});
        }
        if (ReactCSSTransitionGroupAsync) {
            var sideDrawerTransition = React.createElement(ReactCSSTransitionGroupAsync, {component: "div", className: "side-drawer-container", transitionName: "side-drawer", transitionEnterTimeout: 500, transitionLeaveTimeout: 300}, sideDrawer);
        }
        var view = null;
        switch (viewType) {
            case exports.HOME:
                view = React.createElement(home_view_1.HomeView, {user: user, dataSources: dataSources, onNavClick: this.sideDrawerOpen.bind(this, true), onOpenAbout: this.openAboutModal.bind(this), customization: customization});
                break;
            case exports.CUBE:
                view = React.createElement(cube_view_1.CubeView, {user: user, dataSource: selectedDataSource, hash: viewHash, updateViewHash: this.updateViewHash.bind(this), getUrlPrefix: this.getUrlPrefix.bind(this), maxFilters: maxFilters, maxSplits: maxSplits, onNavClick: this.sideDrawerOpen.bind(this, true), customization: customization});
                break;
            case exports.LINK:
                view = React.createElement(link_view_1.LinkView, {user: user, linkViewConfig: linkViewConfig, hash: viewHash, updateViewHash: this.updateViewHash.bind(this), changeHash: this.changeHash.bind(this), getUrlPrefix: this.getUrlPrefix.bind(this), onNavClick: this.sideDrawerOpen.bind(this, true), customization: customization});
                break;
            case exports.SETTINGS:
                view = React.createElement(settings_view_1.SettingsView, {user: user, hash: window.location.hash, onNavClick: this.sideDrawerOpen.bind(this, true), onSettingsChange: this.onSettingsChange.bind(this), customization: customization, version: version});
                break;
            default:
                throw new Error('unknown view');
        }
        return React.createElement("main", {className: 'pivot-application'}, view, sideDrawerTransition, this.renderAboutModal(), this.renderNotifications());
    };
    return PivotApplication;
}(React.Component));
exports.PivotApplication = PivotApplication;
