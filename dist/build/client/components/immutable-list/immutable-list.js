"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./immutable-list.css');
var React = require('react');
var button_1 = require('../button/button');
var modal_1 = require('../modal/modal');
var form_label_1 = require('../form-label/form-label');
var simple_list_1 = require('../simple-list/simple-list');
var ImmutableList = (function (_super) {
    __extends(ImmutableList, _super);
    function ImmutableList() {
        _super.call(this);
        this.state = {};
    }
    // Allows usage in TSX :
    // const MyList = ImmutableList.specialize<MyImmutableClass>();
    // then : <MyList ... />
    ImmutableList.specialize = function () {
        return ImmutableList;
    };
    ImmutableList.prototype.editItem = function (index) {
        this.setState({ editedIndex: index });
    };
    ImmutableList.prototype.addItem = function () {
        this.setState({ nameNeeded: true, tempName: '' });
    };
    ImmutableList.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.items) {
            this.setState({ tempItems: nextProps.items });
        }
    };
    ImmutableList.prototype.componentDidMount = function () {
        if (this.props.items) {
            this.setState({ tempItems: this.props.items });
        }
    };
    ImmutableList.prototype.deleteItem = function (index) {
        var tempItems = this.state.tempItems;
        this.setState({ tempItems: tempItems.delete(index) }, this.onChange);
    };
    ImmutableList.prototype.onChange = function () {
        this.props.onChange(this.state.tempItems);
    };
    ImmutableList.prototype.renderEditModal = function (dimensionIndex) {
        var _this = this;
        var tempItems = this.state.tempItems;
        var dimension = tempItems.get(dimensionIndex);
        var onSave = function (newDimension) {
            var newItems = tempItems.update(dimensionIndex, function () { return newDimension; });
            _this.setState({ tempItems: newItems, editedIndex: undefined }, _this.onChange);
        };
        var onClose = function () { return _this.setState({ editedIndex: undefined }); };
        return React.cloneElement(this.props.getModal(dimension), { onSave: onSave, onClose: onClose });
    };
    ImmutableList.prototype.renderAddModal = function (dimension) {
        var _this = this;
        var onSave = function (newDimension) {
            var tempItems = _this.state.tempItems;
            var newItems = tempItems.push(newDimension);
            _this.setState({ tempItems: newItems, pendingAddItem: null }, _this.onChange);
        };
        var onClose = function () { return _this.setState({ pendingAddItem: null }); };
        return React.cloneElement(this.props.getModal(dimension), { onSave: onSave, onClose: onClose });
    };
    ImmutableList.prototype.renderNameModal = function () {
        var _this = this;
        var canSave = true;
        var tempName = this.state.tempName;
        var onChange = function (e) {
            _this.setState({ tempName: e.target.value });
        };
        var onOk = function () {
            _this.setState({
                tempName: '',
                nameNeeded: false,
                pendingAddItem: _this.props.getNewItem(_this.state.tempName)
            });
        };
        var onCancel = function () { return _this.setState({ nameNeeded: false, tempName: '' }); };
        return React.createElement(modal_1.Modal, {className: "dimension-modal", title: "Please give a name to this new dimension", onClose: onCancel, onEnter: onOk, startUpFocusOn: 'focus-me'}, React.createElement("form", {className: "general vertical"}, React.createElement(form_label_1.FormLabel, {label: "Name"}), React.createElement("input", {id: "focus-me", type: "text", onChange: onChange, value: tempName})), React.createElement("div", {className: "button-group"}, canSave ? React.createElement(button_1.Button, {className: "ok", title: "OK", type: "primary", onClick: onOk}) : null, React.createElement(button_1.Button, {className: "cancel", title: "Cancel", type: "secondary", onClick: onCancel})));
    };
    ImmutableList.prototype.render = function () {
        var _a = this.props, items = _a.items, getRows = _a.getRows;
        var _b = this.state, editedIndex = _b.editedIndex, pendingAddItem = _b.pendingAddItem, nameNeeded = _b.nameNeeded;
        if (!items)
            return null;
        return React.createElement("div", {className: "dimensions-list"}, React.createElement("div", {className: "list-title"}, React.createElement("div", {className: "label"}, "Dimensions"), React.createElement("div", {className: "actions"}, React.createElement("button", null, "Introspect"), React.createElement("button", {onClick: this.addItem.bind(this)}, "Add item"))), React.createElement(simple_list_1.SimpleList, {rows: getRows(items), onEdit: this.editItem.bind(this), onRemove: this.deleteItem.bind(this)}), editedIndex !== undefined ? this.renderEditModal(editedIndex) : null, pendingAddItem ? this.renderAddModal(pendingAddItem) : null, nameNeeded ? this.renderNameModal() : null);
    };
    return ImmutableList;
}(React.Component));
exports.ImmutableList = ImmutableList;
