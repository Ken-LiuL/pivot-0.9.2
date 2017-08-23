"use strict";
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var dimension_1 = require('../dimension/dimension');
var measure_1 = require('../measure/measure');
var check;
var SortOn = (function () {
    function SortOn(parameters) {
        this.dimension = parameters.dimension;
        this.measure = parameters.measure;
    }
    SortOn.isSortOn = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, SortOn);
    };
    SortOn.equal = function (s1, s2) {
        return s1 === s2 || s1.equals(s2);
    };
    SortOn.getName = function (s) {
        return s.toName();
    };
    SortOn.getTitle = function (s) {
        return s.getTitle();
    };
    SortOn.fromDimension = function (dimension) {
        return new SortOn({ dimension: dimension });
    };
    SortOn.fromMeasure = function (measure) {
        return new SortOn({ measure: measure });
    };
    SortOn.fromSortAction = function (sortAction, dataSource, fallbackDimension) {
        if (!sortAction)
            return SortOn.fromDimension(fallbackDimension);
        var sortOnName = sortAction.expression.name;
        var measure = dataSource.getMeasure(sortOnName);
        if (measure)
            return SortOn.fromMeasure(measure);
        return SortOn.fromDimension(fallbackDimension);
    };
    SortOn.fromJS = function (parameters) {
        var value = {};
        if (parameters.dimension) {
            value.dimension = dimension_1.Dimension.fromJS(parameters.dimension);
        }
        else {
            value.measure = measure_1.Measure.fromJS(parameters.measure);
        }
        return new SortOn(value);
    };
    SortOn.prototype.valueOf = function () {
        return {
            dimension: this.dimension,
            measure: this.measure
        };
    };
    SortOn.prototype.toJS = function () {
        var js = {};
        if (this.dimension) {
            js.dimension = this.dimension.toJS();
        }
        else {
            js.measure = this.measure.toJS();
        }
        return js;
    };
    SortOn.prototype.toJSON = function () {
        return this.toJS();
    };
    SortOn.prototype.toString = function () {
        return "[SortOn: " + this.toName() + "]";
    };
    SortOn.prototype.equals = function (other) {
        return SortOn.isSortOn(other) &&
            (this.dimension ? this.dimension.equals(other.dimension) : this.measure.equals(other.measure));
    };
    SortOn.prototype.toName = function () {
        var measure = this.measure;
        return measure ? measure.name : this.dimension.name;
    };
    SortOn.prototype.getTitle = function () {
        var measure = this.measure;
        return measure ? measure.title : this.dimension.title;
    };
    SortOn.prototype.getExpression = function () {
        return plywood_1.$(this.toName());
    };
    return SortOn;
}());
exports.SortOn = SortOn;
check = SortOn;
