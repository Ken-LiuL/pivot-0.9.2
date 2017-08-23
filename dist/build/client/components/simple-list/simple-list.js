"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./simple-list.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var SimpleList = (function (_super) {
    __extends(SimpleList, _super);
    function SimpleList() {
        _super.call(this);
    }
    SimpleList.prototype.renderRows = function (rows) {
        var _this = this;
        if (!rows || !rows.length)
            return [];
        var _a = this.props, onEdit = _a.onEdit, onRemove = _a.onRemove;
        var svgize = function (iconName) { return iconName ? React.createElement(svg_icon_1.SvgIcon, {svg: require("../../icons/" + iconName + ".svg")}) : null; };
        return rows.map(function (_a, i) {
            var title = _a.title, description = _a.description, icon = _a.icon;
            var svg = svgize(icon);
            var text = React.createElement("div", {className: "text"}, React.createElement("div", {className: "title"}, title), React.createElement("div", {className: "description"}, description));
            var actions = React.createElement("div", {className: "actions"}, React.createElement("button", {onClick: onEdit.bind(_this, i)}, svgize('full-edit')), React.createElement("button", {onClick: onRemove.bind(_this, i)}, svgize('full-remove')));
            return React.createElement("div", {className: "row", key: "row-" + i}, svg, text, actions);
        });
    };
    SimpleList.prototype.render = function () {
        var rows = this.renderRows(this.props.rows);
        return React.createElement("div", {className: "simple-list"}, rows);
    };
    return SimpleList;
}(React.Component));
exports.SimpleList = SimpleList;
