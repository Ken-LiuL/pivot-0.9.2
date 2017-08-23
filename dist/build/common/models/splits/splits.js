"use strict";
var immutable_1 = require('immutable');
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var general_1 = require('../../utils/general/general');
var split_combine_1 = require('../split-combine/split-combine');
var plywood_2 = require("plywood");
var granularity_1 = require("../granularity/granularity");
function withholdSplit(splits, split, allowIndex) {
    return splits.filter(function (s, i) {
        return i === allowIndex || !s.equalsByExpression(split);
    });
}
function swapSplit(splits, split, other, allowIndex) {
    return splits.map(function (s, i) {
        return (i === allowIndex || !s.equalsByExpression(split)) ? s : other;
    });
}
var check;
var Splits = (function () {
    function Splits(parameters) {
        this.splitCombines = parameters;
    }
    Splits.isSplits = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Splits);
    };
    Splits.fromSplitCombine = function (splitCombine) {
        return new Splits(immutable_1.List([splitCombine]));
    };
    Splits.fromJS = function (parameters, context) {
        if (!Array.isArray(parameters))
            parameters = [parameters];
        return new Splits(immutable_1.List(parameters.map(function (splitCombine) { return split_combine_1.SplitCombine.fromJS(splitCombine, context); })));
    };
    Splits.prototype.valueOf = function () {
        return this.splitCombines;
    };
    Splits.prototype.toJS = function () {
        return this.splitCombines.toArray().map(function (splitCombine) { return splitCombine.toJS(); });
    };
    Splits.prototype.toJSON = function () {
        return this.toJS();
    };
    Splits.prototype.toString = function () {
        return this.splitCombines.map(function (splitCombine) { return splitCombine.toString(); }).join(',');
    };
    Splits.prototype.equals = function (other) {
        return Splits.isSplits(other) &&
            general_1.immutableListsEqual(this.splitCombines, other.splitCombines);
    };
    Splits.prototype.replaceByIndex = function (index, replace) {
        var splitCombines = this.splitCombines;
        if (splitCombines.size === index)
            return this.insertByIndex(index, replace);
        var replacedSplit = splitCombines.get(index);
        splitCombines = splitCombines.map(function (s, i) { return i === index ? replace : s; });
        splitCombines = swapSplit(splitCombines, replace, replacedSplit, index);
        return new Splits(splitCombines);
    };
    Splits.prototype.insertByIndex = function (index, insert) {
        var splitCombines = this.splitCombines;
        splitCombines = splitCombines.splice(index, 0, insert);
        splitCombines = withholdSplit(splitCombines, insert, index);
        return new Splits(splitCombines);
    };
    Splits.prototype.addSplit = function (split) {
        var splitCombines = this.splitCombines;
        return this.insertByIndex(splitCombines.size, split);
    };
    Splits.prototype.removeSplit = function (split) {
        return new Splits(this.splitCombines.filter(function (s) { return s !== split; }));
    };
    Splits.prototype.changeSortAction = function (sort) {
        return new Splits(this.splitCombines.map(function (s) { return s.changeSortAction(sort); }));
    };
    Splits.prototype.getTitle = function (dimensions) {
        return this.splitCombines.map(function (s) { return s.getDimension(dimensions).title; }).join(', ');
    };
    Splits.prototype.length = function () {
        return this.splitCombines.size;
    };
    Splits.prototype.forEach = function (sideEffect, context) {
        return this.splitCombines.forEach(sideEffect, context);
    };
    Splits.prototype.get = function (index) {
        return this.splitCombines.get(index);
    };
    Splits.prototype.first = function () {
        return this.splitCombines.first();
    };
    Splits.prototype.last = function () {
        return this.splitCombines.last();
    };
    Splits.prototype.findSplitForDimension = function (dimension) {
        var dimensionExpression = dimension.expression;
        return this.splitCombines.find(function (s) { return s.expression.equals(dimensionExpression); });
    };
    Splits.prototype.hasSplitOn = function (dimension) {
        return Boolean(this.findSplitForDimension(dimension));
    };
    Splits.prototype.replace = function (search, replace) {
        return new Splits(this.splitCombines.map(function (s) { return s.equals(search) ? replace : s; }));
    };
    Splits.prototype.map = function (mapper, context) {
        return new Splits(this.splitCombines.map(mapper, context));
    };
    Splits.prototype.toArray = function () {
        return this.splitCombines.toArray();
    };
    Splits.prototype.removeBucketingFrom = function (expressions) {
        var changed = false;
        var newSplitCombines = this.splitCombines.map(function (splitCombine) {
            if (!splitCombine.bucketAction)
                return splitCombine;
            var splitCombineExpression = splitCombine.expression;
            if (expressions.every(function (ex) { return !ex.equals(splitCombineExpression); }))
                return splitCombine;
            changed = true;
            return splitCombine.changeBucketAction(null);
        });
        return changed ? new Splits(newSplitCombines) : this;
    };
    Splits.prototype.updateWithFilter = function (filter, dimensions) {
        if (filter.isRelative())
            throw new Error('can not be a relative filter');
        var changed = false;
        var newSplitCombines = this.splitCombines.map(function (splitCombine) {
            if (splitCombine.bucketAction)
                return splitCombine;
            var splitExpression = splitCombine.expression;
            var splitDimension = dimensions.find(function (d) { return splitExpression.equals(d.expression); });
            var splitKind = splitDimension.kind;
            if (!splitDimension || !(splitKind === 'time' || splitKind === 'number'))
                return splitCombine;
            changed = true;
            var selectionSet = filter.getLiteralSet(splitExpression);
            var extent = selectionSet ? selectionSet.extent() : null;
            if (splitKind === 'time') {
                return splitCombine.changeBucketAction(new plywood_1.TimeBucketAction({
                    duration: plywood_1.TimeRange.isTimeRange(extent) ? granularity_1.getBestBucketUnitForRange(extent, false, splitDimension.bucketedBy, splitDimension.granularities) :
                        granularity_1.getDefaultGranularityForKind('time', splitDimension.bucketedBy, splitDimension.granularities).duration
                }));
            }
            else if (splitKind === 'number') {
                return splitCombine.changeBucketAction(new plywood_2.NumberBucketAction({
                    size: extent ? granularity_1.getBestBucketUnitForRange(extent, false, splitDimension.bucketedBy, splitDimension.granularities) :
                        granularity_1.getDefaultGranularityForKind('number', splitDimension.bucketedBy, splitDimension.granularities).size
                }));
            }
            throw new Error('unknown extent type');
        });
        return changed ? new Splits(newSplitCombines) : this;
    };
    Splits.prototype.constrainToDimensions = function (dimensions) {
        var changed = false;
        var splitCombines = [];
        this.splitCombines.forEach(function (split) {
            if (split.getDimension(dimensions)) {
                splitCombines.push(split);
            }
            else {
                changed = true;
            }
        });
        return changed ? new Splits(immutable_1.List(splitCombines)) : this;
    };
    Splits.prototype.timezoneDependant = function () {
        return this.splitCombines.some(function (splitCombine) { return splitCombine.timezoneDependant(); });
    };
    Splits.prototype.changeSortIfOnMeasure = function (fromMeasure, toMeasure) {
        var changed = false;
        var newSplitCombines = this.splitCombines.map(function (splitCombine) {
            var sortAction = splitCombine.sortAction;
            if (!sortAction || sortAction.refName() !== fromMeasure)
                return splitCombine;
            changed = true;
            return splitCombine.changeSortAction(new plywood_1.SortAction({
                expression: plywood_1.$(toMeasure),
                direction: sortAction.direction
            }));
        });
        return changed ? new Splits(newSplitCombines) : this;
    };
    return Splits;
}());
exports.Splits = Splits;
check = Splits;
Splits.EMPTY = new Splits(immutable_1.List());
