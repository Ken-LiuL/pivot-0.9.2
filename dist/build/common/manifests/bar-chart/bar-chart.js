"use strict";
var plywood_1 = require('plywood');
var index_1 = require('../../models/index');
var manifest_1 = require('../../models/manifest/manifest');
var circumstances_handler_1 = require('../../utils/circumstances-handler/circumstances-handler');
var handler = circumstances_handler_1.CircumstancesHandler.EMPTY()
    .needsAtLeastOneSplit('The Bar Chart requires at least one split')
    .when(circumstances_handler_1.CircumstancesHandler.areExactSplitKinds('*'))
    .or(circumstances_handler_1.CircumstancesHandler.areExactSplitKinds('*', '*'))
    .then(function (splits, dataSource, colors, current) {
    var continuousBoost = 0;
    // Auto adjustment
    var autoChanged = false;
    splits = splits.map(function (split) {
        var splitDimension = dataSource.getDimensionByExpression(split.expression);
        if (!split.sortAction) {
            // Must sort boolean in deciding order!
            if (splitDimension.kind === 'boolean') {
                split = split.changeSortAction(new plywood_1.SortAction({
                    expression: plywood_1.$(splitDimension.name),
                    direction: plywood_1.SortAction.DESCENDING
                }));
            }
            else {
                if (splitDimension.isContinuous()) {
                    split = split.changeSortAction(new plywood_1.SortAction({
                        expression: plywood_1.$(splitDimension.name),
                        direction: plywood_1.SortAction.ASCENDING
                    }));
                }
                else {
                    split = split.changeSortAction(dataSource.getDefaultSortAction());
                }
            }
            autoChanged = true;
        }
        else if (splitDimension.isContinuous() && split.sortAction.refName() !== splitDimension.name) {
            split = split.changeSortAction(new plywood_1.SortAction({
                expression: plywood_1.$(splitDimension.name),
                direction: split.sortAction.direction
            }));
            autoChanged = true;
        }
        if (splitDimension.kind === 'number') {
            continuousBoost = 4;
        }
        // ToDo: review this
        if (!split.limitAction && (autoChanged || splitDimension.kind !== 'time')) {
            split = split.changeLimit(25);
            autoChanged = true;
        }
        if (colors) {
            colors = null;
            autoChanged = true;
        }
        return split;
    });
    if (autoChanged) {
        return manifest_1.Resolve.automatic(5 + continuousBoost, { splits: splits });
    }
    return manifest_1.Resolve.ready(current ? 10 : (7 + continuousBoost));
})
    .otherwise(function (splits, dataSource) {
    var categoricalDimensions = dataSource.dimensions.filter(function (d) { return d.kind !== 'time'; });
    return manifest_1.Resolve.manual(3, 'The Bar Chart needs one or two splits', categoricalDimensions.toArray().slice(0, 2).map(function (dimension) {
        return {
            description: "Split on " + dimension.title + " instead",
            adjustment: {
                splits: index_1.Splits.fromSplitCombine(index_1.SplitCombine.fromExpression(dimension.expression))
            }
        };
    }));
});
exports.BAR_CHART_MANIFEST = new manifest_1.Manifest('bar-chart', 'Bar Chart', handler.evaluate.bind(handler));
