"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./clearable-input.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
function focusOnInput(component) {
    if (!component)
        return;
    component.focus();
}
var ClearableInput = (function (_super) {
    __extends(ClearableInput, _super);
    function ClearableInput() {
        _super.call(this);
    }
    ClearableInput.prototype.onChange = function (e) {
        this.props.onChange(e.target.value);
    };
    ClearableInput.prototype.onClear = function () {
        this.props.onChange('');
    };
    ClearableInput.prototype.render = function () {
        var _a = this.props, className = _a.className, type = _a.type, placeholder = _a.placeholder, focusOnMount = _a.focusOnMount, value = _a.value, onBlur = _a.onBlur;
        var ref = focusOnMount ? focusOnInput : null;
        var classNames = ['clearable-input'];
        if (className)
            classNames.push(className);
        if (!value)
            classNames.push('empty');
        return React.createElement("div", {className: classNames.join(' ')}, React.createElement("input", {type: type || 'text', placeholder: placeholder, value: value || '', onChange: this.onChange.bind(this), onBlur: onBlur, ref: ref}), React.createElement("div", {className: "clear", onClick: this.onClear.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/x.svg')})));
    };
    return ClearableInput;
}(React.Component));
exports.ClearableInput = ClearableInput;
