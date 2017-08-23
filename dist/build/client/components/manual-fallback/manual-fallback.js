"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./manual-fallback.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var ManualFallback = (function (_super) {
    __extends(ManualFallback, _super);
    function ManualFallback() {
        _super.call(this);
    }
    ManualFallback.prototype.onResolutionClick = function (resolution) {
        var clicker = this.props.clicker;
        clicker.changeSplits(resolution.adjustment.splits, index_1.VisStrategy.KeepAlways);
    };
    ManualFallback.prototype.render = function () {
        var _this = this;
        var essence = this.props.essence;
        var visResolve = essence.visResolve;
        if (!visResolve.isManual())
            return null;
        var resolutionItems = visResolve.resolutions.map(function (resolution, i) {
            return React.createElement("li", {key: i, onClick: _this.onResolutionClick.bind(_this, resolution)}, resolution.description);
        });
        return React.createElement("div", {className: "manual-fallback"}, React.createElement("div", {className: "message"}, visResolve.message), React.createElement("ul", null, resolutionItems));
    };
    return ManualFallback;
}(React.Component));
exports.ManualFallback = ManualFallback;
