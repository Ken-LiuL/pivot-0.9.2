"use strict";
var manifest_1 = require('../../models/manifest/manifest');
function handleCircumstance(dataSource, splits, colors, current) {
    return manifest_1.Resolve.manual(0, 'The Geo visualization is not ready, please select another visualization.', []);
}
exports.GEO_MANIFEST = new manifest_1.Manifest('geo', 'Geo', handleCircumstance);
