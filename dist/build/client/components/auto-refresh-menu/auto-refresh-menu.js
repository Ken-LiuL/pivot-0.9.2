"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./auto-refresh-menu.css');
var React = require('react');
var chronoshift_1 = require('chronoshift');
var index_1 = require('../../../common/models/index');
var constants_1 = require('../../config/constants');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var dropdown_1 = require('../dropdown/dropdown');
var AUTO_REFRESH_LABELS = {
    "null": "Off",
    "PT5S": "Every 5 seconds",
    "PT15S": "Every 15 seconds",
    "PT1M": "Every minute",
    "PT5M": "Every 5 minutes",
    "PT10M": "Every 10 minutes",
    "PT30M": "Every 30 minutes"
};
var REFRESH_DURATIONS = [
    null,
    chronoshift_1.Duration.fromJS("PT5S"),
    chronoshift_1.Duration.fromJS("PT15S"),
    chronoshift_1.Duration.fromJS("PT1M"),
    chronoshift_1.Duration.fromJS("PT5M"),
    chronoshift_1.Duration.fromJS("PT10M"),
    chronoshift_1.Duration.fromJS("PT30M")
];
var AutoRefreshMenu = (function (_super) {
    __extends(AutoRefreshMenu, _super);
    function AutoRefreshMenu() {
        _super.call(this);
    }
    AutoRefreshMenu.prototype.onRefreshNowClick = function () {
        var refreshMaxTime = this.props.refreshMaxTime;
        refreshMaxTime();
    };
    AutoRefreshMenu.prototype.renderRefreshIntervalDropdown = function () {
        var _a = this.props, autoRefreshRate = _a.autoRefreshRate, setAutoRefreshRate = _a.setAutoRefreshRate;
        return React.createElement(dropdown_1.Dropdown, {
            label: constants_1.STRINGS.autoUpdate,
            items: REFRESH_DURATIONS,
            selectedItem: autoRefreshRate,
            renderItem: function (d) { return AUTO_REFRESH_LABELS[String(d)] || "Custom " + d; },
            onSelect: setAutoRefreshRate
        });
    };
    AutoRefreshMenu.prototype.render = function () {
        var _a = this.props, openOn = _a.openOn, onClose = _a.onClose, dataSource = _a.dataSource;
        var stage = index_1.Stage.fromSize(240, 200);
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "auto-refresh-menu", direction: "down", stage: stage, openOn: openOn, onClose: onClose}, this.renderRefreshIntervalDropdown(), React.createElement("button", {className: "update-now-button", onClick: this.onRefreshNowClick.bind(this)}, "Update now"), React.createElement("div", {className: "update-info"}, dataSource.updatedText()));
    };
    return AutoRefreshMenu;
}(React.Component));
exports.AutoRefreshMenu = AutoRefreshMenu;
