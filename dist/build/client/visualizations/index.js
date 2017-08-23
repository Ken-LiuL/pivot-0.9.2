"use strict";
var plywood_1 = require('plywood');
var totals_1 = require('./totals/totals');
var table_1 = require('./table/table');
var line_chart_1 = require('./line-chart/line-chart');
var bar_chart_1 = require('./bar-chart/bar-chart');
var geo_1 = require('./geo/geo');
var VIS_COMPONENTS = [
    totals_1.Totals,
    table_1.Table,
    line_chart_1.LineChart,
    bar_chart_1.BarChart,
    geo_1.Geo
];
function getVisualizationComponent(manifest) {
    var manifestName = manifest.name;
    return plywood_1.helper.find(VIS_COMPONENTS, function (v) { return v.id === manifestName; });
}
exports.getVisualizationComponent = getVisualizationComponent;
