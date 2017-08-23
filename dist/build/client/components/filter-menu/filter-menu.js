"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./filter-menu.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var string_filter_menu_1 = require('../string-filter-menu/string-filter-menu');
var time_filter_menu_1 = require('../time-filter-menu/time-filter-menu');
var number_filter_menu_1 = require('../number-filter-menu/number-filter-menu');
var FilterMenu = (function (_super) {
    __extends(FilterMenu, _super);
    function FilterMenu() {
        _super.call(this);
    }
    FilterMenu.prototype.render = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, changePosition = _a.changePosition, direction = _a.direction, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose, inside = _a.inside;
        if (!dimension)
            return null;
        var menuSize = null;
        var menuCont = null;
        if (dimension.kind === 'time') {
            menuSize = index_1.Stage.fromSize(250, 274);
            menuCont = React.createElement(time_filter_menu_1.TimeFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, onClose: onClose});
        }
        else if (dimension.kind === 'number') {
            menuSize = index_1.Stage.fromSize(250, 274);
            menuCont = React.createElement(number_filter_menu_1.NumberFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, onClose: onClose});
        }
        else {
            menuSize = index_1.Stage.fromSize(250, 410);
            menuCont = React.createElement(string_filter_menu_1.StringFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, changePosition: changePosition, onClose: onClose});
        }
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "filter-menu", direction: direction, containerStage: containerStage, stage: menuSize, openOn: openOn, onClose: onClose, inside: inside}, menuCont);
    };
    return FilterMenu;
}(React.Component));
exports.FilterMenu = FilterMenu;
