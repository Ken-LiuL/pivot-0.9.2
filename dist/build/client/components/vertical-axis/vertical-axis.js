"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./vertical-axis.css');
var React = require('react');
var formatter_1 = require('../../../common/utils/formatter/formatter');
var dom_1 = require('../../utils/dom/dom');
var index_1 = require('../../../common/models/index');
var TICK_WIDTH = 5;
var TEXT_OFFSET = 2;
var VerticalAxis = (function (_super) {
    __extends(VerticalAxis, _super);
    function VerticalAxis() {
        _super.call(this);
    }
    VerticalAxis.prototype.render = function () {
        var _a = this.props, stage = _a.stage, ticks = _a.ticks, scale = _a.scale, topLineExtend = _a.topLineExtend, hideZero = _a.hideZero;
        if (hideZero)
            ticks = ticks.filter(function (tick) { return tick !== 0; });
        var formatter = formatter_1.formatterFromData(ticks, index_1.Measure.DEFAULT_FORMAT);
        var lines = ticks.map(function (tick) {
            var y = dom_1.roundToHalfPx(scale(tick));
            return React.createElement("line", {className: "tick", key: String(tick), x1: 0, y1: y, x2: TICK_WIDTH, y2: y});
        });
        var labelX = TICK_WIDTH + TEXT_OFFSET;
        var dy = "0.31em";
        var labels = ticks.map(function (tick) {
            var y = scale(tick);
            return React.createElement("text", {className: "tick", key: String(tick), x: labelX, y: y, dy: dy}, formatter(tick));
        });
        return React.createElement("g", {className: "vertical-axis", transform: stage.getTransform()}, React.createElement("line", {className: "border", x1: 0.5, y1: -topLineExtend, x2: 0.5, y2: stage.height}), lines, labels);
    };
    VerticalAxis.defaultProps = {
        topLineExtend: 0
    };
    return VerticalAxis;
}(React.Component));
exports.VerticalAxis = VerticalAxis;
