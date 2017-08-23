"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./general.css');
var React = require('react');
var form_label_1 = require('../../../components/form-label/form-label');
var button_1 = require('../../../components/button/button');
var immutable_input_1 = require('../../../components/immutable-input/immutable-input');
var labels_1 = require('../utils/labels');
var General = (function (_super) {
    __extends(General, _super);
    function General() {
        _super.call(this);
        this.state = { hasChanged: false, errors: {} };
    }
    General.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.settings)
            this.setState({
                newSettings: nextProps.settings,
                hasChanged: false,
                errors: {}
            });
    };
    General.prototype.onChange = function (newSettings, isValid, path) {
        var errors = this.state.errors;
        var settings = this.props.settings;
        errors[path] = !isValid;
        this.setState({
            newSettings: newSettings,
            errors: errors,
            hasChanged: !settings.equals(newSettings)
        });
    };
    General.prototype.save = function () {
        if (this.props.onSave) {
            this.props.onSave(this.state.newSettings);
        }
    };
    General.prototype.render = function () {
        var _a = this.state, hasChanged = _a.hasChanged, newSettings = _a.newSettings, errors = _a.errors;
        if (!newSettings)
            return null;
        return React.createElement("div", {className: "general"}, React.createElement("div", {className: "title-bar"}, React.createElement("div", {className: "title"}, "General"), hasChanged ? React.createElement(button_1.Button, {className: "save", title: "Save", type: "primary", onClick: this.save.bind(this)}) : null), React.createElement("div", {className: "content"}, React.createElement("form", {className: "vertical"}, React.createElement(form_label_1.FormLabel, {label: "Browser title", helpText: labels_1.GENERAL.title.help, errorText: errors['customization.title'] ? labels_1.GENERAL.title.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: newSettings, path: 'customization.title', onChange: this.onChange.bind(this), focusOnStartUp: true, validator: /^.+$/}))));
    };
    return General;
}(React.Component));
exports.General = General;
