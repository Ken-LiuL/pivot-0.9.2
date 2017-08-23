"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./dimension-modal.css');
var React = require('react');
var form_label_1 = require('../../../components/form-label/form-label');
var button_1 = require('../../../components/button/button');
var immutable_input_1 = require('../../../components/immutable-input/immutable-input');
var modal_1 = require('../../../components/modal/modal');
var dropdown_1 = require('../../../components/dropdown/dropdown');
var index_1 = require('../../../../common/models/index');
var DimensionModal = (function (_super) {
    __extends(DimensionModal, _super);
    function DimensionModal() {
        _super.call(this);
        this.kinds = [
            { label: 'Time', value: 'time' },
            { label: 'String', value: 'string' },
            { label: 'Boolean', value: 'boolean' },
            { label: 'String-geo', value: 'string-geo' }
        ];
        this.state = { canSave: false };
    }
    DimensionModal.prototype.initStateFromProps = function (props) {
        if (props.dimension) {
            this.setState({
                newDimension: new index_1.Dimension(props.dimension.valueOf()),
                canSave: true
            });
        }
    };
    DimensionModal.prototype.componentWillReceiveProps = function (nextProps) {
        this.initStateFromProps(nextProps);
    };
    DimensionModal.prototype.componentDidMount = function () {
        this.initStateFromProps(this.props);
    };
    DimensionModal.prototype.onKindChange = function (newKind) {
        var dimension = this.state.newDimension;
        dimension = dimension.changeKind(newKind.value);
        this.setState({
            newDimension: dimension,
            canSave: !this.props.dimension.equals(dimension)
        });
    };
    DimensionModal.prototype.onChange = function (newDimension, isValid) {
        if (isValid) {
            this.setState({
                newDimension: newDimension,
                canSave: !this.props.dimension.equals(newDimension)
            });
        }
        else {
            this.setState({ canSave: false });
        }
    };
    DimensionModal.prototype.save = function () {
        this.props.onSave(this.state.newDimension);
    };
    DimensionModal.prototype.render = function () {
        var dimension = this.props.dimension;
        var _a = this.state, newDimension = _a.newDimension, canSave = _a.canSave;
        if (!newDimension)
            return null;
        var selectedKind = this.kinds.filter(function (d) { return d.value === newDimension.kind; })[0] || this.kinds[0];
        // Specializing the Dropdown FTW
        var KindDropDown = dropdown_1.Dropdown;
        return React.createElement(modal_1.Modal, {className: "dimension-modal", title: dimension.title, onClose: this.props.onClose, onEnter: this.save.bind(this)}, React.createElement("form", {className: "general vertical"}, React.createElement(form_label_1.FormLabel, {label: "Title"}), React.createElement(immutable_input_1.ImmutableInput, {focusOnStartUp: true, instance: newDimension, path: 'title', onChange: this.onChange.bind(this), validator: /^.+$/}), React.createElement(KindDropDown, {label: 'Kind', items: this.kinds, selectedItem: selectedKind, equal: function (a, b) { return a.value === b.value; }, renderItem: function (a) { return a.label; }, keyItem: function (a) { return a.value; }, onSelect: this.onKindChange.bind(this)})), React.createElement("div", {className: "button-group"}, canSave ? React.createElement(button_1.Button, {className: "save", title: "Save", type: "primary", onClick: this.save.bind(this)}) : null, React.createElement(button_1.Button, {className: "cancel", title: "Cancel", type: "secondary", onClick: this.props.onClose})));
    };
    return DimensionModal;
}(React.Component));
exports.DimensionModal = DimensionModal;
