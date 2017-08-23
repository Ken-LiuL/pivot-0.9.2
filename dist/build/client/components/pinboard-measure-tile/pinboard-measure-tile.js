"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./pinboard-measure-tile.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
// import { ... } from '../../config/constants';
var dropdown_1 = require('../dropdown/dropdown');
var PinboardMeasureTile = (function (_super) {
    __extends(PinboardMeasureTile, _super);
    function PinboardMeasureTile() {
        _super.call(this);
    }
    PinboardMeasureTile.prototype.render = function () {
        var _a = this.props, essence = _a.essence, title = _a.title, dimension = _a.dimension, sortOn = _a.sortOn, onSelect = _a.onSelect;
        var sortOns = (dimension ? [index_1.SortOn.fromDimension(dimension)] : []).concat(essence.dataSource.measures.toArray().map(index_1.SortOn.fromMeasure));
        var dropdown = React.createElement(dropdown_1.Dropdown, {
            items: sortOns,
            selectedItem: sortOn,
            equal: index_1.SortOn.equal,
            renderItem: index_1.SortOn.getTitle,
            keyItem: index_1.SortOn.getName,
            onSelect: onSelect
        });
        return React.createElement("div", {className: "pinboard-measure-tile"}, React.createElement("div", {className: "title"}, title), dropdown);
    };
    return PinboardMeasureTile;
}(React.Component));
exports.PinboardMeasureTile = PinboardMeasureTile;
