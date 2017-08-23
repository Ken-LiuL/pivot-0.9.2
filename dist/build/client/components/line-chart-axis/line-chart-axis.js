"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./line-chart-axis.css');
var d3 = require('d3');
var React = require('react');
var chronoshift_1 = require('chronoshift');
var dom_1 = require('../../utils/dom/dom');
var TICK_HEIGHT = 5;
var TEXT_OFFSET = 12;
var floatFormat = d3.format(".1f");
var LineChartAxis = (function (_super) {
    __extends(LineChartAxis, _super);
    function LineChartAxis() {
        _super.call(this);
    }
    LineChartAxis.prototype.render = function () {
        var _a = this.props, stage = _a.stage, ticks = _a.ticks, scale = _a.scale, timezone = _a.timezone;
        //var format = d3.time.format('%b %-d');
        var format = scale.tickFormat();
        var timezoneString = timezone.toString();
        function formatLabel(v) {
            if (v instanceof Date) {
                return formatWithTimezone(v);
            }
            return String(floatFormat(v));
        }
        function formatWithTimezone(d) {
            return format(chronoshift_1.WallTime.UTCToWallTime(d, timezoneString));
        }
        var lines = ticks.map(function (tick) {
            var x = dom_1.roundToHalfPx(scale(tick));
            return React.createElement("line", {key: String(tick), x1: x, y1: 0, x2: x, y2: TICK_HEIGHT});
        });
        var labelY = TICK_HEIGHT + TEXT_OFFSET;
        var labels = ticks.map(function (tick) {
            var x = scale(tick);
            return React.createElement("text", {key: String(tick), x: x, y: labelY}, formatLabel(tick));
        });
        return React.createElement("g", {className: "line-chart-axis", transform: stage.getTransform()}, lines, labels);
    };
    return LineChartAxis;
}(React.Component));
exports.LineChartAxis = LineChartAxis;
