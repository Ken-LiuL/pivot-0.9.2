"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dom_1 = require('../../utils/dom/dom');
require('./tile-header.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var TileHeader = (function (_super) {
    __extends(TileHeader, _super);
    function TileHeader() {
        _super.call(this);
    }
    TileHeader.prototype.renderIcons = function () {
        var icons = this.props.icons;
        if (!icons || !icons.length)
            return null;
        var iconElements = icons.map(function (icon) {
            return React.createElement("div", {className: dom_1.classNames('icon', icon.name, { active: icon.active }), key: icon.name, onClick: icon.onClick, ref: icon.ref}, React.createElement(svg_icon_1.SvgIcon, {svg: icon.svg}));
        });
        return React.createElement("div", {className: "icons"}, iconElements);
    };
    TileHeader.prototype.render = function () {
        var _a = this.props, title = _a.title, onDragStart = _a.onDragStart;
        return React.createElement("div", {className: "tile-header", draggable: onDragStart ? true : null, onDragStart: onDragStart}, React.createElement("div", {className: "title"}, title), this.renderIcons());
    };
    return TileHeader;
}(React.Component));
exports.TileHeader = TileHeader;
