"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./time-filter-menu.css');
var React = require('react');
var chronoshift_1 = require('chronoshift');
var plywood_1 = require('plywood');
var constants_1 = require('../../config/constants');
var index_1 = require('../../../common/models/index');
var time_1 = require('../../../common/utils/time/time');
var dom_1 = require('../../utils/dom/dom');
var button_1 = require('../button/button');
var button_group_1 = require('../button-group/button-group');
var date_range_picker_1 = require('../date-range-picker/date-range-picker');
var $maxTime = plywood_1.$(index_1.FilterClause.MAX_TIME_REF_NAME);
var latestPresets = [
    { name: '1H', selection: $maxTime.timeRange('PT1H', -1) },
    { name: '6H', selection: $maxTime.timeRange('PT6H', -1) },
    { name: '1D', selection: $maxTime.timeRange('P1D', -1) },
    { name: '7D', selection: $maxTime.timeRange('P1D', -7) },
    { name: '30D', selection: $maxTime.timeRange('P1D', -30) }
];
var $now = plywood_1.$(index_1.FilterClause.NOW_REF_NAME);
var currentPresets = [
    { name: 'D', selection: $now.timeBucket('P1D') },
    { name: 'W', selection: $now.timeBucket('P1W') },
    { name: 'M', selection: $now.timeBucket('P1M') },
    { name: 'Q', selection: $now.timeBucket('P3M') },
    { name: 'Y', selection: $now.timeBucket('P1Y') }
];
var previousPresets = [
    { name: 'D', selection: $now.timeFloor('P1D').timeRange('P1D', -1) },
    { name: 'W', selection: $now.timeFloor('P1W').timeRange('P1W', -1) },
    { name: 'M', selection: $now.timeFloor('P1M').timeRange('P1M', -1) },
    { name: 'Q', selection: $now.timeFloor('P3M').timeRange('P3M', -1) },
    { name: 'Y', selection: $now.timeFloor('P1Y').timeRange('P1Y', -1) }
];
var TimeFilterMenu = (function (_super) {
    __extends(TimeFilterMenu, _super);
    function TimeFilterMenu() {
        _super.call(this);
        this.state = {
            tab: null,
            timeSelection: null,
            startTime: null,
            endTime: null,
            hoverPreset: null
        };
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    TimeFilterMenu.prototype.componentWillMount = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var filter = essence.filter;
        var timezone = essence.timezone;
        var dimensionExpression = dimension.expression;
        var timeSelection = filter.getSelection(dimensionExpression);
        var selectedTimeRangeSet = essence.getEffectiveFilter().getLiteralSet(dimensionExpression);
        var selectedTimeRange = (selectedTimeRangeSet && selectedTimeRangeSet.size() === 1) ? selectedTimeRangeSet.elements[0] : null;
        var clause = filter.clauseForExpression(dimensionExpression);
        this.setState({
            timeSelection: timeSelection,
            tab: (!clause || clause.relative) ? 'relative' : 'specific',
            startTime: selectedTimeRange ? chronoshift_1.day.floor(selectedTimeRange.start, timezone) : null,
            endTime: selectedTimeRange ? chronoshift_1.day.ceil(selectedTimeRange.end, timezone) : null
        });
    };
    TimeFilterMenu.prototype.componentDidMount = function () {
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    TimeFilterMenu.prototype.componentWillUnmount = function () {
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    TimeFilterMenu.prototype.globalKeyDownListener = function (e) {
        if (dom_1.enterKey(e)) {
            this.onOkClick();
        }
    };
    TimeFilterMenu.prototype.constructFilter = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var _b = this.state, tab = _b.tab, startTime = _b.startTime, endTime = _b.endTime;
        var filter = essence.filter;
        var timezone = essence.timezone;
        if (tab !== 'specific')
            return null;
        if (startTime && !endTime) {
            endTime = chronoshift_1.day.shift(startTime, timezone, 1);
        }
        if (startTime && endTime && startTime < endTime) {
            return filter.setSelection(dimension.expression, plywood_1.r(plywood_1.TimeRange.fromJS({ start: startTime, end: endTime })));
        }
        else {
            return null;
        }
    };
    TimeFilterMenu.prototype.onPresetClick = function (preset) {
        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose, essence = _a.essence, dimension = _a.dimension;
        var filter = essence.filter;
        var newFilter = filter.setSelection(dimension.expression, preset.selection);
        clicker.changeFilter(newFilter);
        onClose();
    };
    TimeFilterMenu.prototype.onPresetMouseEnter = function (preset) {
        var hoverPreset = this.state.hoverPreset;
        if (hoverPreset === preset)
            return;
        this.setState({
            hoverPreset: preset
        });
    };
    TimeFilterMenu.prototype.onPresetMouseLeave = function (preset) {
        var hoverPreset = this.state.hoverPreset;
        if (hoverPreset !== preset)
            return;
        this.setState({
            hoverPreset: null
        });
    };
    TimeFilterMenu.prototype.onStartChange = function (start) {
        this.setState({
            startTime: start
        });
    };
    TimeFilterMenu.prototype.onEndChange = function (end) {
        this.setState({
            endTime: end
        });
    };
    TimeFilterMenu.prototype.selectTab = function (tab) {
        this.setState({ tab: tab });
    };
    TimeFilterMenu.prototype.onOkClick = function () {
        if (!this.actionEnabled())
            return;
        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
        var newFilter = this.constructFilter();
        if (!newFilter)
            return;
        clicker.changeFilter(newFilter);
        onClose();
    };
    TimeFilterMenu.prototype.onCancelClick = function () {
        var onClose = this.props.onClose;
        onClose();
    };
    TimeFilterMenu.prototype.renderPresets = function () {
        var _this = this;
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var _b = this.state, timeSelection = _b.timeSelection, hoverPreset = _b.hoverPreset;
        if (!dimension)
            return null;
        var timezone = essence.timezone;
        var presetToButton = function (preset) {
            return React.createElement("button", {key: preset.name, className: dom_1.classNames('preset', { hover: preset === hoverPreset, selected: preset.selection.equals(timeSelection) }), onClick: _this.onPresetClick.bind(_this, preset), onMouseEnter: _this.onPresetMouseEnter.bind(_this, preset), onMouseLeave: _this.onPresetMouseLeave.bind(_this, preset)}, preset.name);
        };
        var previewTimeRange = essence.evaluateSelection(hoverPreset ? hoverPreset.selection : timeSelection);
        var previewText = previewTimeRange ? time_1.formatTimeRange(previewTimeRange, timezone, time_1.DisplayYear.IF_DIFF) : constants_1.STRINGS.noFilter;
        var maxTimeBasedPresets = React.createElement("div", null, React.createElement("div", {className: "type"}, constants_1.STRINGS.latest), React.createElement("div", {className: "buttons"}, latestPresets.map(presetToButton)));
        return React.createElement("div", {className: "cont"}, essence.dataSource.isTimeAttribute(dimension.expression) ? maxTimeBasedPresets : null, React.createElement("div", {className: "type"}, constants_1.STRINGS.current), React.createElement("div", {className: "buttons"}, currentPresets.map(presetToButton)), React.createElement("div", {className: "type"}, constants_1.STRINGS.previous), React.createElement("div", {className: "buttons"}, previousPresets.map(presetToButton)), React.createElement("div", {className: "preview"}, previewText));
    };
    TimeFilterMenu.prototype.actionEnabled = function () {
        var essence = this.props.essence;
        var tab = this.state.tab;
        if (tab !== 'specific')
            return false;
        var newFilter = this.constructFilter();
        return newFilter && !essence.filter.equals(newFilter);
    };
    TimeFilterMenu.prototype.renderCustom = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var _b = this.state, startTime = _b.startTime, endTime = _b.endTime;
        if (!dimension)
            return null;
        return React.createElement("div", null, React.createElement(date_range_picker_1.DateRangePicker, {startTime: startTime, endTime: endTime, maxTime: essence.dataSource.getMaxTimeDate(), timezone: essence.timezone, onStartChange: this.onStartChange.bind(this), onEndChange: this.onEndChange.bind(this)}), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled(), title: constants_1.STRINGS.ok}), React.createElement(button_1.Button, {type: "secondary", onClick: this.onCancelClick.bind(this), title: constants_1.STRINGS.cancel})));
    };
    ;
    TimeFilterMenu.prototype.render = function () {
        var _this = this;
        var dimension = this.props.dimension;
        var tab = this.state.tab;
        if (!dimension)
            return null;
        var tabs = ['relative', 'specific'].map(function (name) {
            return {
                isSelected: tab === name,
                title: (name === 'relative' ? constants_1.STRINGS.relative : constants_1.STRINGS.specific),
                key: name,
                onClick: _this.selectTab.bind(_this, name)
            };
        });
        return React.createElement("div", {className: "time-filter-menu"}, React.createElement(button_group_1.ButtonGroup, {groupMembers: tabs}), tab === 'relative' ? this.renderPresets() : this.renderCustom());
    };
    return TimeFilterMenu;
}(React.Component));
exports.TimeFilterMenu = TimeFilterMenu;
