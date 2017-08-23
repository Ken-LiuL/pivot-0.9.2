"use strict";
var index_1 = require('../../models/index');
var manifest_1 = require('../../models/manifest/manifest');
var CircumstancesHandler = (function () {
    function CircumstancesHandler() {
        this.configurations = [];
        this.actions = [];
    }
    CircumstancesHandler.noSplits = function () {
        return function (splits) { return splits.length() === 0; };
    };
    CircumstancesHandler.testKind = function (kind, selector) {
        if (selector === '*') {
            return true;
        }
        var bareSelector = selector.replace(/^!/, '');
        // This can be enriched later, right now it's just a 1-1 match
        var result = kind === bareSelector;
        if (selector.charAt(0) === '!') {
            return !result;
        }
        return result;
    };
    CircumstancesHandler.strictCompare = function (selectors, kinds) {
        if (selectors.length !== kinds.length)
            return false;
        return selectors.every(function (selector, i) { return CircumstancesHandler.testKind(kinds[i], selector); });
    };
    CircumstancesHandler.EMPTY = function () {
        return new CircumstancesHandler();
    };
    CircumstancesHandler.prototype.when = function (configuration) {
        var _this = this;
        var temp = [configuration];
        var ret = {
            or: function (conf) {
                temp.push(conf);
                return ret;
            },
            then: function (action) {
                _this.configurations.push(temp);
                _this.actions.push(action);
                return _this;
            }
        };
        return ret;
    };
    CircumstancesHandler.prototype.otherwise = function (action) {
        this.otherwiseAction = action;
        return this;
    };
    CircumstancesHandler.prototype.needsAtLeastOneSplit = function (message) {
        return this
            .when(CircumstancesHandler.noSplits())
            .then(function (splits, dataSource) {
            var someDimensions = dataSource.dimensions.toArray().filter(function (d) { return d.kind === 'string'; }).slice(0, 2);
            return manifest_1.Resolve.manual(4, message, someDimensions.map(function (someDimension) {
                return {
                    description: "Add a split on " + someDimension.title,
                    adjustment: {
                        splits: index_1.Splits.fromSplitCombine(index_1.SplitCombine.fromExpression(someDimension.expression))
                    }
                };
            }));
        });
    };
    CircumstancesHandler.prototype.evaluate = function (dataSource, splits, colors, current) {
        for (var i = 0; i < this.configurations.length; i++) {
            var confs = this.configurations[i];
            if (confs.some(function (c) { return c(splits, dataSource); })) {
                return this.actions[i](splits, dataSource, colors, current);
            }
        }
        return this.otherwiseAction(splits, dataSource, colors, current);
    };
    CircumstancesHandler.areExactSplitKinds = function () {
        var selectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selectors[_i - 0] = arguments[_i];
        }
        return function (splits, dataSource) {
            var kinds = splits.toArray().map(function (split) { return split.getDimension(dataSource.dimensions).kind; });
            return CircumstancesHandler.strictCompare(selectors, kinds);
        };
    };
    CircumstancesHandler.haveAtLeastSplitKinds = function () {
        var kinds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            kinds[_i - 0] = arguments[_i];
        }
        return function (splits, dataSource) {
            var getKind = function (split) { return split.getDimension(dataSource.dimensions).kind; };
            var actualKinds = splits.toArray().map(getKind);
            return kinds.every(function (kind) { return actualKinds.indexOf(kind) > -1; });
        };
    };
    return CircumstancesHandler;
}());
exports.CircumstancesHandler = CircumstancesHandler;
