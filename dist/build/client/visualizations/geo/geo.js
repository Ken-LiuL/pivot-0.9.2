"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./geo.css');
var React = require('react');
var geo_1 = require('../../../common/manifests/geo/geo');
var base_visualization_1 = require('../base-visualization/base-visualization');
var Geo = (function (_super) {
    __extends(Geo, _super);
    function Geo() {
        _super.call(this);
    }
    Geo.prototype.getDefaultState = function () {
        return _super.prototype.getDefaultState.call(this);
    };
    Geo.prototype.componentWillMount = function () { };
    Geo.prototype.componentDidMount = function () { };
    Geo.prototype.componentWillReceiveProps = function (nextProps) { };
    Geo.prototype.renderInternals = function () {
        return React.createElement("div", {className: "internals"});
    };
    Geo.id = geo_1.GEO_MANIFEST.name;
    return Geo;
}(base_visualization_1.BaseVisualization));
exports.Geo = Geo;
