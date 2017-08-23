"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./date-range-picker.css');
var React = require('react');
var chronoshift_1 = require('chronoshift');
var plywood_1 = require('plywood');
var time_1 = require('../../../common/utils/time/time');
var dom_1 = require('../../utils/dom/dom');
var constants_1 = require('../../config/constants');
var svg_icon_1 = require("../svg-icon/svg-icon");
var date_range_input_1 = require("../date-range-input/date-range-input");
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker() {
        _super.call(this);
        this.state = {
            activeMonthStartDate: null,
            hoverTimeRange: null,
            selectionSet: false
        };
    }
    DateRangePicker.prototype.componentWillMount = function () {
        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, timezone = _a.timezone;
        if (startTime && !time_1.datesEqual(startTime, chronoshift_1.day.floor(startTime, timezone)))
            throw new Error("start time must be round");
        if (endTime && !time_1.datesEqual(endTime, chronoshift_1.day.floor(endTime, timezone)))
            throw new Error("end time must be round");
        var flooredStart = chronoshift_1.month.floor(startTime || new Date(), timezone);
        this.setState({
            activeMonthStartDate: flooredStart,
            selectionSet: true
        });
    };
    DateRangePicker.prototype.navigateToMonth = function (offset) {
        var timezone = this.props.timezone;
        var activeMonthStartDate = this.state.activeMonthStartDate;
        var newDate = chronoshift_1.month.shift(activeMonthStartDate, timezone, offset);
        this.setState({
            activeMonthStartDate: newDate
        });
    };
    DateRangePicker.prototype.goToPreviousMonth = function () {
        return this.navigateToMonth(-1);
    };
    DateRangePicker.prototype.goToNextMonth = function () {
        return this.navigateToMonth(1);
    };
    DateRangePicker.prototype.calculateHoverTimeRange = function (mouseEnteredDay) {
        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime;
        var hoverTimeRange = null;
        if (startTime && !endTime) {
            var start = startTime;
            var end = mouseEnteredDay;
            // if mousing over backwards, set end to old start time
            if (mouseEnteredDay < startTime) {
                start = mouseEnteredDay;
                end = startTime;
            }
            hoverTimeRange = new plywood_1.TimeRange({ start: start, end: end, bounds: '[]' });
        }
        this.setState({ hoverTimeRange: hoverTimeRange });
    };
    DateRangePicker.prototype.onCalendarMouseLeave = function () {
        this.setState({ hoverTimeRange: null });
    };
    DateRangePicker.prototype.selectNewRange = function (startDate, endDate) {
        var _a = this.props, onStartChange = _a.onStartChange, onEndChange = _a.onEndChange, timezone = _a.timezone;
        onStartChange(startDate);
        // real end points are exclusive so +1 full day to selection (which is floored) to get the real end point
        if (endDate)
            endDate = time_1.shiftOneDay(endDate, timezone);
        onEndChange(endDate);
    };
    DateRangePicker.prototype.selectDay = function (selection) {
        var startTime = this.props.startTime;
        var selectionSet = this.state.selectionSet;
        if (selectionSet) {
            this.setState({ hoverTimeRange: null, selectionSet: false });
            this.selectNewRange(selection, null);
        }
        else {
            var isDoubleClickSameDay = time_1.datesEqual(selection, startTime);
            var isBackwardSelection = selection < startTime;
            if (isDoubleClickSameDay) {
                this.selectNewRange(startTime, startTime);
            }
            else if (isBackwardSelection) {
                this.selectNewRange(selection, startTime);
            }
            else {
                this.selectNewRange(startTime, selection);
            }
            this.setState({ selectionSet: true });
        }
    };
    DateRangePicker.prototype.getIsSelectable = function (date) {
        var _a = this.state, hoverTimeRange = _a.hoverTimeRange, selectionSet = _a.selectionSet;
        var inHoverTimeRange = false;
        if (hoverTimeRange) {
            inHoverTimeRange = hoverTimeRange.contains(date);
        }
        return inHoverTimeRange && !selectionSet;
    };
    DateRangePicker.prototype.getIsSelectedEdgeEnd = function (isSingleDate, candidate) {
        if (isSingleDate)
            return false;
        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, timezone = _a.timezone;
        var candidateEndPoint = time_1.shiftOneDay(candidate, timezone);
        return time_1.wallTimeInclusiveEndEqual(endTime, candidateEndPoint, timezone) && endTime > startTime;
    };
    DateRangePicker.prototype.renderDays = function (weeks, monthStart, isSingleDate) {
        var _this = this;
        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, maxTime = _a.maxTime, timezone = _a.timezone;
        var nextMonthStart = chronoshift_1.month.shift(monthStart, timezone, 1);
        return weeks.map(function (daysInWeek, row) {
            return React.createElement("div", {className: "week", key: row}, " ", daysInWeek.map(function (dayDate, column) {
                var isPast = dayDate < monthStart;
                var isFuture = dayDate >= nextMonthStart;
                var isBeyondMaxRange = dayDate > maxTime;
                var isSelectedEdgeStart = time_1.datesEqual(dayDate, startTime);
                var isSelectedEdgeEnd = _this.getIsSelectedEdgeEnd(isSingleDate, dayDate);
                var className = dom_1.classNames("day", "value", {
                    past: isPast,
                    future: isFuture,
                    "beyond-max-range": isBeyondMaxRange,
                    "selectable": _this.getIsSelectable(dayDate),
                    "selected": startTime < dayDate && dayDate < endTime,
                    "selected-edge": isSelectedEdgeStart || isSelectedEdgeEnd
                });
                return React.createElement("div", {className: className, key: column, onClick: _this.selectDay.bind(_this, dayDate), onMouseEnter: _this.calculateHoverTimeRange.bind(_this, dayDate)}, time_1.getWallTimeDay(dayDate, timezone));
            }));
        });
    };
    ;
    DateRangePicker.prototype.renderCalendar = function (startDate, isSingleDate) {
        var timezone = this.props.timezone;
        var weeks = time_1.monthToWeeks(startDate, timezone, constants_1.getLocale());
        var firstWeek = weeks[0];
        var lastWeek = weeks[weeks.length - 1];
        var countPrepend = 7 - firstWeek.length;
        var countAppend = 7 - lastWeek.length;
        weeks[0] = time_1.prependDays(timezone, firstWeek, countPrepend);
        weeks[weeks.length - 1] = time_1.appendDays(timezone, lastWeek, countAppend);
        return this.renderDays(weeks, startDate, isSingleDate);
    };
    DateRangePicker.prototype.renderCalendarNav = function (startDate) {
        var timezone = this.props.timezone;
        return React.createElement("div", {className: "calendar-nav"}, React.createElement("div", {className: 'caret left', onClick: this.goToPreviousMonth.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/full-caret-left.svg')})), time_1.getWallTimeMonthWithYear(startDate, timezone), React.createElement("div", {className: 'caret right', onClick: this.goToNextMonth.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/full-caret-right.svg')})));
    };
    DateRangePicker.prototype.render = function () {
        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, timezone = _a.timezone, onStartChange = _a.onStartChange, onEndChange = _a.onEndChange;
        var _b = this.state, activeMonthStartDate = _b.activeMonthStartDate, selectionSet = _b.selectionSet;
        if (!activeMonthStartDate)
            return null;
        var isSingleDate = endTime ? time_1.getWallTimeDay(startTime, timezone) === time_1.getEndWallTimeInclusive(endTime, timezone).getDate() : true;
        return React.createElement("div", {className: "date-range-picker"}, React.createElement("div", {className: "side-by-side"}, React.createElement(date_range_input_1.DateRangeInput, {type: "start", time: startTime, timezone: timezone, onChange: onStartChange.bind(this)}), React.createElement(date_range_input_1.DateRangeInput, {type: "end", time: endTime, timezone: timezone, onChange: onEndChange.bind(this), hide: !selectionSet})), React.createElement("div", {className: "calendar", onMouseLeave: this.onCalendarMouseLeave.bind(this)}, this.renderCalendarNav(activeMonthStartDate), React.createElement("div", {className: "week"}, constants_1.getLocale().shortDays.map(function (day, i) {
            return React.createElement("div", {className: "day label", key: day + i}, React.createElement("span", {className: "space"}), day);
        })), this.renderCalendar(activeMonthStartDate, isSingleDate)));
    };
    return DateRangePicker;
}(React.Component));
exports.DateRangePicker = DateRangePicker;
