"use strict";
var plywood_1 = require('plywood');
var index_1 = require("../../manifests/index");
var data_source_mock_1 = require("../data-source/data-source.mock");
var link_item_1 = require('./link-item');
var LinkItemMock = (function () {
    function LinkItemMock() {
    }
    LinkItemMock.testOneJS = function () {
        return {
            name: 'test1',
            title: 'Test One',
            description: 'I like testing',
            group: 'Tests',
            dataSource: 'wiki',
            essence: {
                visualization: 'totals',
                timezone: 'Etc/UTC',
                filter: {
                    op: "literal",
                    value: true
                },
                pinnedDimensions: ['articleName'],
                singleMeasure: "count",
                selectedMeasures: ['count'],
                splits: []
            }
        };
    };
    LinkItemMock.testTwoJS = function () {
        return {
            name: 'test2',
            title: 'Test Two',
            description: 'I like testing',
            group: 'Tests',
            dataSource: 'wiki',
            essence: {
                visualization: 'totals',
                timezone: 'Etc/UTC',
                filter: plywood_1.$('time').in(new Date('2015-01-01Z'), new Date('2016-01-01Z')).toJS(),
                pinnedDimensions: [],
                singleMeasure: "count",
                selectedMeasures: ['count'],
                splits: []
            }
        };
    };
    LinkItemMock.getContext = function () {
        return {
            dataSources: [data_source_mock_1.DataSourceMock.wiki()],
            visualizations: index_1.MANIFESTS
        };
    };
    LinkItemMock.testOne = function () {
        return link_item_1.LinkItem.fromJS(LinkItemMock.testOneJS(), LinkItemMock.getContext());
    };
    LinkItemMock.testTwo = function () {
        return link_item_1.LinkItem.fromJS(LinkItemMock.testTwoJS(), LinkItemMock.getContext());
    };
    return LinkItemMock;
}());
exports.LinkItemMock = LinkItemMock;
