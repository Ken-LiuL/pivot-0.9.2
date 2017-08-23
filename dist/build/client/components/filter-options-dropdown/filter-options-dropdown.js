"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./filter-options-dropdown.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var index_1 = require('../../../common/models/index');
var dropdown_1 = require("../dropdown/dropdown");
var svg_icon_1 = require('../svg-icon/svg-icon');
var FILTER_OPTIONS = [
    {
        label: constants_1.STRINGS.include,
        value: index_1.Filter.INCLUDED,
        svg: require('../../icons/filter-include.svg'),
        checkType: 'check'
    },
    {
        label: constants_1.STRINGS.exclude,
        value: index_1.Filter.EXCLUDED,
        svg: require('../../icons/filter-exclude.svg'),
        checkType: 'cross'
    }
];
var FilterOptionsDropdown = (function (_super) {
    __extends(FilterOptionsDropdown, _super);
    function FilterOptionsDropdown() {
        _super.call(this);
    }
    FilterOptionsDropdown.prototype.onSelectOption = function (option) {
        this.props.onSelectOption(option.value);
    };
    FilterOptionsDropdown.prototype.renderFilterOption = function (option) {
        return React.createElement("span", {className: "filter-option"}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: option.svg}), React.createElement("span", {className: "option-label"}, option.label));
    };
    FilterOptionsDropdown.prototype.render = function () {
        var _a = this.props, selectedOption = _a.selectedOption, onSelectOption = _a.onSelectOption;
        var selectedItem = FILTER_OPTIONS.filter(function (o) { return o.value === selectedOption; })[0] || FILTER_OPTIONS[0];
        var dropdown = React.createElement(dropdown_1.Dropdown, {
            className: 'filter-options',
            items: FILTER_OPTIONS,
            selectedItem: selectedItem,
            equal: function (a, b) { return a.value === b.value; },
            keyItem: function (d) { return d.value; },
            renderItem: this.renderFilterOption.bind(this),
            renderSelectedItem: function (d) { return React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: d.svg}); },
            onSelect: this.onSelectOption.bind(this)
        });
        return React.createElement("div", {className: "filter-options-dropdown"}, dropdown);
    };
    return FilterOptionsDropdown;
}(React.Component));
exports.FilterOptionsDropdown = FilterOptionsDropdown;
