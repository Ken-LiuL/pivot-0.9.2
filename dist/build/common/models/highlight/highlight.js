"use strict";
var immutable_class_1 = require('immutable-class');
var filter_1 = require('../filter/filter');
var check;
var Highlight = (function () {
    function Highlight(parameters) {
        var owner = parameters.owner;
        if (typeof owner !== 'string')
            throw new TypeError('owner must be a string');
        this.owner = owner;
        this.delta = parameters.delta;
        this.measure = parameters.measure || null;
    }
    Highlight.isHighlight = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Highlight);
    };
    Highlight.fromJS = function (parameters) {
        return new Highlight({
            owner: parameters.owner,
            delta: filter_1.Filter.fromJS(parameters.delta),
            measure: parameters.measure
        });
    };
    Highlight.prototype.valueOf = function () {
        return {
            owner: this.owner,
            delta: this.delta,
            measure: this.measure
        };
    };
    Highlight.prototype.toJS = function () {
        var js = {
            owner: this.owner,
            delta: this.delta.toJS()
        };
        if (this.measure)
            js.measure = this.measure;
        return js;
    };
    Highlight.prototype.toJSON = function () {
        return this.toJS();
    };
    Highlight.prototype.toString = function () {
        return "[Highlight " + this.owner + "]";
    };
    Highlight.prototype.equals = function (other) {
        return Highlight.isHighlight(other) &&
            this.owner === other.owner &&
            this.delta.equals(other.delta) &&
            this.measure === other.measure;
    };
    Highlight.prototype.applyToFilter = function (filter) {
        return filter.applyDelta(this.delta);
    };
    Highlight.prototype.constrainToDimensions = function (dimensions, timeAttribute) {
        var delta = this.delta;
        var newDelta = delta.constrainToDimensions(dimensions, timeAttribute);
        if (newDelta === delta)
            return this;
        if (newDelta.length() === 0)
            return null;
        var value = this.valueOf();
        value.delta = newDelta;
        return new Highlight(value);
    };
    return Highlight;
}());
exports.Highlight = Highlight;
check = Highlight;
