"use strict";
var index_1 = require("../../manifests/index");
var essence_1 = require('./essence');
var data_source_mock_1 = require("../data-source/data-source.mock");
var split_combine_mock_1 = require("../split-combine/split-combine.mock");
var EssenceMock = (function () {
    function EssenceMock() {
    }
    EssenceMock.wikiTotalsJS = function () {
        return {
            visualization: 'totals',
            timezone: 'Etc/UTC',
            pinnedDimensions: [],
            selectedMeasures: [],
            splits: []
        };
    };
    EssenceMock.wikiLineChartJS = function () {
        return {
            visualization: 'line-chart',
            timezone: 'Etc/UTC',
            pinnedDimensions: [],
            selectedMeasures: [],
            splits: [split_combine_mock_1.SplitCombineMock.TIME_JS]
        };
    };
    EssenceMock.wikiLineChartNoSplitJS = function () {
        return {
            visualization: 'line-chart',
            timezone: 'Etc/UTC',
            pinnedDimensions: [],
            selectedMeasures: [],
            splits: []
        };
    };
    EssenceMock.getContext = function () {
        return {
            dataSource: data_source_mock_1.DataSourceMock.wiki(),
            visualizations: index_1.MANIFESTS
        };
    };
    EssenceMock.wikiTotals = function () {
        return essence_1.Essence.fromJS(EssenceMock.wikiTotalsJS(), EssenceMock.getContext());
    };
    EssenceMock.wikiLineChart = function () {
        return essence_1.Essence.fromJS(EssenceMock.wikiLineChartJS(), EssenceMock.getContext());
    };
    EssenceMock.wikiLineChartNoSplit = function () {
        return essence_1.Essence.fromJS(EssenceMock.wikiLineChartNoSplitJS(), EssenceMock.getContext());
    };
    return EssenceMock;
}());
exports.EssenceMock = EssenceMock;
