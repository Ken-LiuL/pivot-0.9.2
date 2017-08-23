"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./date-range-input.css');
var React = require('react');
var chronoshift_1 = require('chronoshift');
var time_1 = require('../../../common/utils/time/time');
var DateRangeInput = (function (_super) {
    __extends(DateRangeInput, _super);
    function DateRangeInput() {
        _super.call(this);
        this.state = {
            dateString: ''
        };
    }
    // 2015-09-23T17:42:57.636Z
    // 2015-09-23 17:42
    DateRangeInput.prototype.componentDidMount = function () {
        var _a = this.props, time = _a.time, timezone = _a.timezone;
        this.updateStateFromTime(time, timezone);
    };
    DateRangeInput.prototype.componentWillReceiveProps = function (nextProps) {
        var time = nextProps.time, timezone = nextProps.timezone;
        this.updateStateFromTime(time, timezone);
    };
    DateRangeInput.prototype.updateStateFromTime = function (time, timezone) {
        if (!time)
            return;
        if (isNaN(time.valueOf())) {
            this.setState({
                dateString: ''
            });
            return;
        }
        var effectiveTime = this.props.type === "end" ? time_1.exclusiveToInclusiveEnd(time) : time;
        this.setState({
            dateString: time_1.getWallTimeString(effectiveTime, timezone)
        });
    };
    DateRangeInput.prototype.dateChange = function (e) {
        var dateString = e.target.value.replace(/[^\d-]/g, '').substr(0, 10);
        this.setState({
            dateString: dateString
        });
        if (dateString.length === 10) {
            this.changeDate(dateString);
        }
    };
    DateRangeInput.prototype.changeDate = function (possibleDateString) {
        var _a = this.props, timezone = _a.timezone, onChange = _a.onChange, type = _a.type;
        var possibleDate = new Date(possibleDateString);
        // add one if end so it passes the inclusive formatting
        var day = type === "end" ? possibleDate.getUTCDate() + 1 : possibleDate.getUTCDate();
        if (isNaN(possibleDate.valueOf())) {
            onChange(null);
        }
        else {
            // Convert from WallTime to UTC
            var possibleDate = chronoshift_1.WallTime.WallTimeToUTC(timezone.toString(), possibleDate.getUTCFullYear(), possibleDate.getUTCMonth(), day, possibleDate.getUTCHours(), possibleDate.getUTCMinutes(), possibleDate.getUTCSeconds(), possibleDate.getUTCMilliseconds());
            onChange(possibleDate);
        }
    };
    DateRangeInput.prototype.render = function () {
        var hide = this.props.hide;
        var dateString = this.state.dateString;
        var value = hide ? '' : dateString;
        return React.createElement("div", {className: "date-range-input"}, React.createElement("input", {className: "input-field", value: value, onChange: this.dateChange.bind(this)}));
    };
    return DateRangeInput;
}(React.Component));
exports.DateRangeInput = DateRangeInput;
