"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./grid-lines.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var GridLines = (function (_super) {
    __extends(GridLines, _super);
    function GridLines() {
        _super.call(this);
    }
    GridLines.prototype.render = function () {
        var _a = this.props, orientation = _a.orientation, stage = _a.stage, ticks = _a.ticks, scale = _a.scale;
        var lines = ticks.map(function (tick) {
            var lineProps = {
                key: String(tick)
            };
            if (orientation === 'horizontal') {
                var y = dom_1.roundToHalfPx(scale(tick));
                lineProps.x1 = 0;
                lineProps.x2 = stage.width;
                lineProps.y1 = y;
                lineProps.y2 = y;
            }
            else {
                var x = dom_1.roundToHalfPx(scale(tick));
                lineProps.x1 = x;
                lineProps.x2 = x;
                lineProps.y1 = 0;
                lineProps.y2 = stage.height;
            }
            return React.createElement('line', lineProps);
        });
        return React.createElement("g", {className: dom_1.classNames('grid-lines', orientation), transform: stage.getTransform()}, lines);
    };
    return GridLines;
}(React.Component));
exports.GridLines = GridLines;
