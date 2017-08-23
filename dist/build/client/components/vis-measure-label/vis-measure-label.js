"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./vis-measure-label.css');
var React = require('react');
var VisMeasureLabel = (function (_super) {
    __extends(VisMeasureLabel, _super);
    function VisMeasureLabel() {
        _super.call(this);
    }
    VisMeasureLabel.prototype.render = function () {
        var _a = this.props, measure = _a.measure, datum = _a.datum;
        return React.createElement("div", {className: "vis-measure-label"}, React.createElement("span", {className: "measure-title"}, measure.title), React.createElement("span", {className: "colon"}, ": "), React.createElement("span", {className: "measure-value"}, measure.formatFn(datum[measure.name])));
    };
    return VisMeasureLabel;
}(React.Component));
exports.VisMeasureLabel = VisMeasureLabel;
