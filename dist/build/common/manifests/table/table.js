"use strict";
var circumstances_handler_1 = require('../../utils/circumstances-handler/circumstances-handler');
var manifest_1 = require('../../models/manifest/manifest');
var handler = circumstances_handler_1.CircumstancesHandler.EMPTY()
    .needsAtLeastOneSplit('The Table requires at least one split')
    .otherwise(function (splits, dataSource, colors, current) {
    var autoChanged = false;
    splits = splits.map(function (split, i) {
        if (!split.sortAction) {
            split = split.changeSortAction(dataSource.getDefaultSortAction());
            autoChanged = true;
        }
        var splitDimension = splits.get(0).getDimension(dataSource.dimensions);
        // ToDo: review this
        if (!split.limitAction && (autoChanged || splitDimension.kind !== 'time')) {
            split = split.changeLimit(i ? 5 : 50);
            autoChanged = true;
        }
        return split;
    });
    if (colors) {
        colors = null;
        autoChanged = true;
    }
    return autoChanged ? manifest_1.Resolve.automatic(6, { splits: splits }) : manifest_1.Resolve.ready(current ? 10 : 8);
});
exports.TABLE_MANIFEST = new manifest_1.Manifest('table', 'Table', handler.evaluate.bind(handler));
