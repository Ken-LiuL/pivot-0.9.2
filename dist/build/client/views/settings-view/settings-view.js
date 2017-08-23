"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./settings-view.css');
var React = require('react');
var Qajax = require('qajax');
var index_1 = require('../../../common/manifests/index');
var constants_1 = require('../../config/constants');
var ajax_1 = require('../../utils/ajax/ajax');
var dom_1 = require('../../utils/dom/dom');
var notifications_1 = require('../../components/notifications/notifications');
var home_header_bar_1 = require('../../components/home-header-bar/home-header-bar');
var button_1 = require('../../components/button/button');
var router_1 = require('../../components/router/router');
var index_2 = require('../../../common/models/index');
var general_1 = require('./general/general');
var clusters_1 = require('./clusters/clusters');
var cluster_edit_1 = require('./cluster-edit/cluster-edit');
var data_cubes_1 = require('./data-cubes/data-cubes');
var data_cube_edit_1 = require('./data-cube-edit/data-cube-edit');
var VIEWS = [
    { label: 'General', value: 'general', svg: require('../../icons/full-settings.svg') },
    { label: 'Clusters', value: 'clusters', svg: require('../../icons/full-cluster.svg') },
    { label: 'Data Cubes', value: 'data_cubes', svg: require('../../icons/full-cube.svg') }
];
var SettingsView = (function (_super) {
    __extends(SettingsView, _super);
    function SettingsView() {
        _super.call(this);
        this.state = {
            errorText: '',
            messageText: 'Welcome to the world of settings!'
        };
    }
    SettingsView.prototype.componentDidMount = function () {
        var _this = this;
        this.mounted = true;
        Qajax({ method: "GET", url: 'settings' })
            .then(Qajax.filterSuccess)
            .then(Qajax.toJSON)
            .then(function (resp) {
            if (!_this.mounted)
                return;
            _this.setState({
                errorText: '',
                messageText: '',
                settings: index_2.AppSettings.fromJS(resp.appSettings, { visualizations: index_1.MANIFESTS })
            });
        }, function (xhr) {
            if (!_this.mounted)
                return;
            var jsonError = JSON.parse(xhr.responseText);
            _this.setState({
                errorText: "Server error: " + jsonError,
                messageText: ''
            });
        }).done();
    };
    SettingsView.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    SettingsView.prototype.onSave = function (settings, okMessage) {
        var _this = this;
        var _a = this.props, version = _a.version, onSettingsChange = _a.onSettingsChange;
        Qajax({
            method: "POST",
            url: 'settings',
            data: {
                version: version,
                appSettings: settings
            }
        })
            .then(Qajax.filterSuccess)
            .then(Qajax.toJSON)
            .then(function (status) {
            if (!_this.mounted)
                return;
            _this.setState({ settings: settings });
            notifications_1.Notifier.success(okMessage ? okMessage : 'Settings saved');
            if (onSettingsChange) {
                onSettingsChange(settings.toClientSettings().attachExecutors(function (dataSource) {
                    return ajax_1.queryUrlExecutorFactory(dataSource.name, 'plywood', version);
                }));
            }
        }, function (xhr) {
            if (!_this.mounted)
                return;
            notifications_1.Notifier.failure('Woops', 'Something bad happened');
        }).done();
    };
    SettingsView.prototype.selectTab = function (value) {
        window.location.hash = "settings/" + value;
    };
    SettingsView.prototype.renderLeftButtons = function (breadCrumbs) {
        var _this = this;
        if (!breadCrumbs || !breadCrumbs.length)
            return [];
        return VIEWS.map(function (_a) {
            var label = _a.label, value = _a.value, svg = _a.svg;
            return React.createElement(button_1.Button, {className: dom_1.classNames({ active: breadCrumbs[0] === value }), title: label, type: "primary", svg: svg, key: value, onClick: _this.selectTab.bind(_this, value)});
        });
    };
    SettingsView.prototype.onURLChange = function (breadCrumbs) {
        this.setState({ breadCrumbs: breadCrumbs });
    };
    SettingsView.prototype.render = function () {
        var _a = this.props, user = _a.user, onNavClick = _a.onNavClick, customization = _a.customization, hash = _a.hash;
        var _b = this.state, errorText = _b.errorText, messageText = _b.messageText, settings = _b.settings, breadCrumbs = _b.breadCrumbs;
        return React.createElement("div", {className: "settings-view"}, React.createElement(home_header_bar_1.HomeHeaderBar, {user: user, onNavClick: onNavClick, customization: customization, title: constants_1.STRINGS.settings}), React.createElement("div", {className: "left-panel"}, this.renderLeftButtons(breadCrumbs)), React.createElement("div", {className: "main-panel"}, React.createElement(router_1.Router, {onURLChange: this.onURLChange.bind(this), rootFragment: "settings", hash: hash}, React.createElement(router_1.Route, {fragment: "general"}, React.createElement(general_1.General, {settings: settings, onSave: this.onSave.bind(this)})), React.createElement(router_1.Route, {fragment: "clusters"}, React.createElement(clusters_1.Clusters, {settings: settings, onSave: this.onSave.bind(this)}), React.createElement(router_1.Route, {fragment: ":clusterId"}, React.createElement(cluster_edit_1.ClusterEdit, {settings: settings, onSave: this.onSave.bind(this)}))), React.createElement(router_1.Route, {fragment: "data_cubes"}, React.createElement(data_cubes_1.DataCubes, {settings: settings, onSave: this.onSave.bind(this)}), React.createElement(router_1.Route, {fragment: ":cubeId/:tab=general"}, React.createElement(data_cube_edit_1.DataCubeEdit, {settings: settings, onSave: this.onSave.bind(this)}))))));
    };
    return SettingsView;
}(React.Component));
exports.SettingsView = SettingsView;
