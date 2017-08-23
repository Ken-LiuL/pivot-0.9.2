"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./form-label.css');
var React = require('react');
var svg_icon_1 = require('../svg-icon/svg-icon');
var dom_1 = require('../../utils/dom/dom');
var FormLabel = (function (_super) {
    __extends(FormLabel, _super);
    function FormLabel() {
        _super.call(this);
        this.state = { helpVisible: false };
    }
    FormLabel.prototype.onHelpClick = function () {
        this.setState({ helpVisible: !this.state.helpVisible });
    };
    FormLabel.prototype.renderIcon = function () {
        var _a = this.props, helpText = _a.helpText, errorText = _a.errorText;
        if (!helpText && !errorText)
            return null;
        var helpVisible = this.state.helpVisible;
        if (errorText) {
            return React.createElement("div", {className: "icon-container", onClick: this.onHelpClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: require("../../icons/help-brand.svg")}), React.createElement(svg_icon_1.SvgIcon, {className: "icon hover", svg: require("../../icons/help-brand.svg")}));
        }
        if (helpVisible) {
            return React.createElement("div", {className: "icon-container", onClick: this.onHelpClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: require("../../icons/help-brand.svg")}), React.createElement(svg_icon_1.SvgIcon, {className: "icon hover", svg: require("../../icons/help-brand.svg")}));
        }
        return React.createElement("div", {className: "icon-container", onClick: this.onHelpClick.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: require("../../icons/help-brand-light.svg")}), React.createElement(svg_icon_1.SvgIcon, {className: "icon hover", svg: require("../../icons/help-brand.svg")}));
    };
    FormLabel.prototype.renderAdditionalText = function () {
        var _a = this.props, helpText = _a.helpText, errorText = _a.errorText;
        var helpVisible = this.state.helpVisible;
        if (!helpVisible && !errorText)
            return null;
        return React.createElement("div", {className: "additional-text"}, errorText ? React.createElement("div", {className: "error-text"}, errorText) : null, helpVisible ? React.createElement("div", {className: "help-text"}, helpText) : null);
    };
    FormLabel.prototype.render = function () {
        var _a = this.props, label = _a.label, errorText = _a.errorText;
        return React.createElement("div", {className: dom_1.classNames('form-label', { error: !!errorText })}, React.createElement("div", {className: "label"}, label), this.renderIcon(), this.renderAdditionalText());
    };
    return FormLabel;
}(React.Component));
exports.FormLabel = FormLabel;
