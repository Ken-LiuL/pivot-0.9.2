"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./chart-line.css');
var immutable_class_1 = require('immutable-class');
var React = require('react');
var d3 = require('d3');
var lineFn = d3.svg.line();
var ChartLine = (function (_super) {
    __extends(ChartLine, _super);
    function ChartLine() {
        _super.call(this);
    }
    ChartLine.prototype.render = function () {
        var _a = this.props, stage = _a.stage, dataset = _a.dataset, getY = _a.getY, getX = _a.getX, scaleX = _a.scaleX, scaleY = _a.scaleY, color = _a.color, showArea = _a.showArea, hoverRange = _a.hoverRange;
        if (!dataset || !color)
            return null;
        var dataPoints = [];
        var hoverDataPoint = null;
        var ds = dataset.data;
        for (var i = 0; i < ds.length; i++) {
            var datum = ds[i];
            var range = getX(datum);
            if (!range)
                return null; // Incorrect data loaded
            var rangeMidpoint = range.midpoint();
            var measureValue = getY(datum);
            // Add potential pre zero point
            var prevDatum = ds[i - 1];
            if (prevDatum) {
                var prevRange = getX(prevDatum);
                if (prevRange.end.valueOf() !== range.start.valueOf()) {
                    dataPoints.push([
                        scaleX(rangeMidpoint.valueOf() - (range.end.valueOf() - range.start.valueOf())),
                        scaleY(0)
                    ]);
                }
            }
            // Add the point itself
            var y = scaleY(measureValue);
            var dataPoint = [scaleX(rangeMidpoint), isNaN(y) ? 0 : y];
            dataPoints.push(dataPoint);
            if (hoverRange && immutable_class_1.immutableEqual(hoverRange, range)) {
                hoverDataPoint = dataPoint;
            }
            // Add potential post zero point
            var nextDatum = ds[i + 1];
            if (nextDatum) {
                var nextRange = getX(nextDatum);
                if (range.end.valueOf() !== nextRange.start.valueOf()) {
                    dataPoints.push([
                        scaleX(rangeMidpoint.valueOf() + (range.end.valueOf() - range.start.valueOf())),
                        scaleY(0)
                    ]);
                }
            }
        }
        var strokeStyle = null;
        var fillStyle = null;
        if (color !== 'default') {
            strokeStyle = { stroke: color };
            fillStyle = { fill: color };
        }
        var areaPath = null;
        var linePath = null;
        var singletonCircle = null;
        if (dataPoints.length > 1) {
            if (showArea) {
                var areaFn = d3.svg.area().y0(scaleY(0));
                areaPath = React.createElement("path", {className: "area", d: areaFn(dataPoints)});
            }
            linePath = React.createElement("path", {className: "line", d: lineFn(dataPoints), style: strokeStyle});
        }
        else if (dataPoints.length === 1) {
            singletonCircle = React.createElement("circle", {className: "singleton", cx: dataPoints[0][0], cy: dataPoints[0][1], r: "2", style: fillStyle});
        }
        var hoverCircle = null;
        if (hoverDataPoint) {
            hoverCircle = React.createElement("circle", {className: "hover", cx: hoverDataPoint[0], cy: hoverDataPoint[1], r: "2.5", style: strokeStyle});
        }
        return React.createElement("g", {className: "chart-line", transform: stage.getTransform()}, areaPath, linePath, singletonCircle, hoverCircle);
    };
    return ChartLine;
}(React.Component));
exports.ChartLine = ChartLine;
