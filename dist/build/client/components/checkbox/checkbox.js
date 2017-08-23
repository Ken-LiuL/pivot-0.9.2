"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./checkbox.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var dom_1 = require('../../utils/dom/dom');
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        _super.call(this);
    }
    Checkbox.prototype.renderIcon = function () {
        var _a = this.props, selected = _a.selected, type = _a.type;
        if (!selected)
            return null;
        if (type === 'check') {
            return React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/check.svg')});
        }
        else if (type === 'cross') {
            return React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/x.svg')});
        }
        return null;
    };
    Checkbox.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, type = _a.type, color = _a.color, selected = _a.selected;
        var style = null;
        if (color) {
            style = { background: color };
        }
        return React.createElement("div", {className: dom_1.classNames('checkbox', type, { selected: selected, color: color }), onClick: onClick}, React.createElement("div", {className: "checkbox-body", style: style}), this.renderIcon());
    };
    Checkbox.defaultProps = {
        type: 'check'
    };
    return Checkbox;
}(React.Component));
exports.Checkbox = Checkbox;
