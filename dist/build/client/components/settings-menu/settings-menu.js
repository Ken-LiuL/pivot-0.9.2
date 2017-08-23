"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./settings-menu.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var constants_1 = require('../../config/constants');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var dropdown_1 = require('../dropdown/dropdown');
var SettingsMenu = (function (_super) {
    __extends(SettingsMenu, _super);
    function SettingsMenu() {
        _super.call(this);
    }
    SettingsMenu.prototype.changeTimezone = function (newTimezone) {
        var _a = this.props, onClose = _a.onClose, changeTimezone = _a.changeTimezone;
        changeTimezone(newTimezone);
        onClose();
    };
    SettingsMenu.prototype.renderTimezonesDropdown = function () {
        var _a = this.props, timezone = _a.timezone, timezones = _a.timezones;
        return React.createElement(dropdown_1.Dropdown, {
            label: constants_1.STRINGS.timezone,
            selectedItem: timezone,
            renderItem: function (d) { return d.toString().replace(/_/g, ' '); },
            items: timezones,
            onSelect: this.changeTimezone.bind(this)
        });
    };
    SettingsMenu.prototype.render = function () {
        var _a = this.props, openOn = _a.openOn, onClose = _a.onClose;
        var stage = index_1.Stage.fromSize(240, 200);
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "settings-menu", direction: "down", stage: stage, openOn: openOn, onClose: onClose}, this.renderTimezonesDropdown());
    };
    return SettingsMenu;
}(React.Component));
exports.SettingsMenu = SettingsMenu;
