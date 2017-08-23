"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./measure-modal.css');
var React = require('react');
var dom_1 = require('../../../utils/dom/dom');
var form_label_1 = require('../../../components/form-label/form-label');
var button_1 = require('../../../components/button/button');
var immutable_input_1 = require('../../../components/immutable-input/immutable-input');
var modal_1 = require('../../../components/modal/modal');
var index_1 = require('../../../../common/models/index');
var MeasureModal = (function (_super) {
    __extends(MeasureModal, _super);
    function MeasureModal() {
        _super.call(this);
        this.hasInitialized = false;
        this.state = { canSave: false };
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    MeasureModal.prototype.initStateFromProps = function (props) {
        if (props.measure) {
            this.setState({
                newMeasure: new index_1.Measure(props.measure.valueOf()),
                canSave: true
            });
        }
    };
    MeasureModal.prototype.componentWillReceiveProps = function (nextProps) {
        this.initStateFromProps(nextProps);
    };
    MeasureModal.prototype.componentDidMount = function () {
        this.initStateFromProps(this.props);
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    MeasureModal.prototype.componentWillUnmount = function () {
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    MeasureModal.prototype.componentDidUpdate = function () {
        if (!this.hasInitialized && !!this.refs['name-input']) {
            this.refs['name-input'].focus();
            this.hasInitialized = true;
        }
    };
    MeasureModal.prototype.globalKeyDownListener = function (e) {
        if (dom_1.enterKey(e) && this.state.canSave) {
            this.save();
        }
    };
    MeasureModal.prototype.onChange = function (newMeasure, isValid) {
        if (isValid) {
            this.setState({
                newMeasure: newMeasure,
                canSave: !this.props.measure.equals(newMeasure)
            });
        }
        else {
            this.setState({ canSave: false });
        }
    };
    MeasureModal.prototype.save = function () {
        this.props.onSave(this.state.newMeasure);
    };
    MeasureModal.prototype.render = function () {
        var _a = this.state, newMeasure = _a.newMeasure, canSave = _a.canSave;
        if (!newMeasure)
            return null;
        return React.createElement(modal_1.Modal, {className: "dimension-modal", title: newMeasure.title, onClose: this.props.onClose}, React.createElement("form", {className: "general vertical"}, React.createElement(form_label_1.FormLabel, {label: "Title"}), React.createElement(immutable_input_1.ImmutableInput, {focusOnStartUp: true, instance: newMeasure, path: 'title', onChange: this.onChange.bind(this), validator: /^.+$/})), React.createElement("div", {className: "button-group"}, canSave ? React.createElement(button_1.Button, {className: "save", title: "Save", type: "primary", onClick: this.save.bind(this)}) : null, React.createElement(button_1.Button, {className: "cancel", title: "Cancel", type: "secondary", onClick: this.props.onClose})));
    };
    return MeasureModal;
}(React.Component));
exports.MeasureModal = MeasureModal;
