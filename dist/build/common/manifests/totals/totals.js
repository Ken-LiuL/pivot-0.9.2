"use strict";
var index_1 = require('../../models/index');
var manifest_1 = require('../../models/manifest/manifest');
function handleCircumstance(dataSource, splits, colors, current) {
    if (!splits.length())
        return manifest_1.Resolve.ready(10);
    return manifest_1.Resolve.automatic(3, { splits: index_1.Splits.EMPTY });
}
exports.TOTALS_MANIFEST = new manifest_1.Manifest('totals', 'Totals', handleCircumstance, 'multi');
