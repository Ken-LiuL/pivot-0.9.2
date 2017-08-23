"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./number-filter-menu.css');
var React = require('react');
var plywood_1 = require('plywood');
var index_1 = require('../../../common/models/index');
var constants_1 = require('../../config/constants');
var dom_1 = require('../../utils/dom/dom');
var button_1 = require('../button/button');
var number_range_picker_1 = require('../number-range-picker/number-range-picker');
function numberOrAnyToString(start) {
    if (start === number_range_picker_1.ANY_VALUE)
        return constants_1.STRINGS.any;
    return '' + start;
}
function stringToNumberOrAny(startInput) {
    var parse = parseFloat(startInput);
    return isNaN(parse) ? number_range_picker_1.ANY_VALUE : parse;
}
var NumberFilterMenu = (function (_super) {
    __extends(NumberFilterMenu, _super);
    function NumberFilterMenu() {
        _super.call(this);
        this.state = {
            leftOffset: null,
            rightBound: null,
            start: null,
            startInput: "",
            end: null,
            endInput: ""
        };
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    NumberFilterMenu.prototype.componentWillMount = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var valueSet = essence.filter.getLiteralSet(dimension.expression);
        var hasRange = valueSet && valueSet.elements.length !== 0;
        var start = null;
        var end = null;
        if (hasRange) {
            var range = valueSet.elements[0];
            start = range.start;
            end = range.end;
        }
        this.setState({
            startInput: numberOrAnyToString(start),
            endInput: numberOrAnyToString(end),
            start: start,
            end: end
        });
    };
    NumberFilterMenu.prototype.componentDidMount = function () {
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    NumberFilterMenu.prototype.componentWillUnmount = function () {
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    NumberFilterMenu.prototype.constructFilter = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var _b = this.state, start = _b.start, end = _b.end;
        var filter = essence.filter;
        var validFilter = false;
        if ((start !== null && end !== null)) {
            validFilter = start <= end;
        }
        else {
            validFilter = (!isNaN(start) && !(isNaN(end))) && (start !== null || end !== null);
        }
        if (validFilter) {
            var bounds = start === end ? '[]' : '[)';
            var newSet = plywood_1.Set.fromJS({ setType: "NUMBER_RANGE", elements: [plywood_1.NumberRange.fromJS({ start: start, end: end, bounds: bounds })] });
            var clause = new index_1.FilterClause({
                expression: dimension.expression,
                selection: new plywood_1.LiteralExpression({ type: "SET/NUMBER_RANGE", value: newSet })
            });
            return filter.setClause(clause);
        }
        else {
            return null;
        }
    };
    NumberFilterMenu.prototype.globalKeyDownListener = function (e) {
        if (dom_1.enterKey(e)) {
            this.onOkClick();
        }
    };
    NumberFilterMenu.prototype.onOkClick = function () {
        if (!this.actionEnabled())
            return;
        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
        clicker.changeFilter(this.constructFilter());
        onClose();
    };
    NumberFilterMenu.prototype.onCancelClick = function () {
        var onClose = this.props.onClose;
        onClose();
    };
    NumberFilterMenu.prototype.onRangeInputStartChange = function (e) {
        var startInput = e.target.value;
        this.setState({
            startInput: startInput,
            start: stringToNumberOrAny(startInput)
        });
    };
    NumberFilterMenu.prototype.onRangeInputEndChange = function (e) {
        var endInput = e.target.value;
        this.setState({
            endInput: endInput,
            end: stringToNumberOrAny(endInput)
        });
    };
    NumberFilterMenu.prototype.onRangeStartChange = function (newStart) {
        this.setState({ startInput: numberOrAnyToString(newStart), start: newStart });
    };
    NumberFilterMenu.prototype.onRangeEndChange = function (newEnd) {
        this.setState({ endInput: numberOrAnyToString(newEnd), end: newEnd });
    };
    NumberFilterMenu.prototype.actionEnabled = function () {
        var essence = this.props.essence;
        return !essence.filter.equals(this.constructFilter()) && Boolean(this.constructFilter());
    };
    NumberFilterMenu.prototype.render = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var _b = this.state, endInput = _b.endInput, startInput = _b.startInput, end = _b.end, start = _b.start;
        return React.createElement("div", {className: "number-filter-menu", ref: "number-filter-menu"}, React.createElement("div", {className: "side-by-side"}, React.createElement("div", {className: "group"}, React.createElement("label", {className: "input-top-label"}, "Min"), React.createElement("input", {value: startInput, onChange: this.onRangeInputStartChange.bind(this)})), React.createElement("div", {className: "group"}, React.createElement("label", {className: "input-top-label"}, "Max"), React.createElement("input", {value: endInput, onChange: this.onRangeInputEndChange.bind(this)}))), React.createElement(number_range_picker_1.NumberRangePicker, {onRangeEndChange: this.onRangeEndChange.bind(this), onRangeStartChange: this.onRangeStartChange.bind(this), start: start, end: end, dimension: dimension, essence: essence}), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", title: constants_1.STRINGS.ok, onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled()}), React.createElement(button_1.Button, {type: "secondary", title: constants_1.STRINGS.cancel, onClick: this.onCancelClick.bind(this)})));
    };
    return NumberFilterMenu;
}(React.Component));
exports.NumberFilterMenu = NumberFilterMenu;
