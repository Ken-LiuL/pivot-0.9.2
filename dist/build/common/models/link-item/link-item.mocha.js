"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var link_item_mock_1 = require('./link-item.mock');
var link_item_1 = require('./link-item');
describe('LinkItem', function () {
    var context = link_item_mock_1.LinkItemMock.getContext();
    it('is an immutable class', function () {
        tester_1.testImmutableClass(link_item_1.LinkItem, [
            link_item_mock_1.LinkItemMock.testOneJS(),
            link_item_mock_1.LinkItemMock.testTwoJS()
        ], { context: context });
    });
    describe('errors', function () {
        it('must have context', function () {
            chai_1.expect(function () {
                link_item_1.LinkItem.fromJS({});
            }).to.throw('must have context');
        });
    });
    describe('upgrades', function () {
        it('must add filter and timezone', function () {
            var linkItem = link_item_1.LinkItem.fromJS({
                name: 'test1',
                title: 'Test One',
                description: 'I like testing',
                group: 'Tests',
                dataSource: 'wiki',
                essence: {
                    visualization: 'line-chart',
                    pinnedDimensions: ['articleName'],
                    singleMeasure: "count",
                    selectedMeasures: ['count'],
                    splits: 'time'
                }
            }, context);
            chai_1.expect(linkItem.toJS()).to.deep.equal({
                "dataSource": "wiki",
                "description": "I like testing",
                "essence": {
                    "filter": {
                        "action": {
                            "action": "in",
                            "expression": {
                                "action": {
                                    "action": "timeRange",
                                    "duration": "P3D",
                                    "step": -1
                                },
                                "expression": {
                                    "name": "m",
                                    "op": "ref"
                                },
                                "op": "chain"
                            }
                        },
                        "expression": {
                            "name": "time",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "pinnedDimensions": [
                        "articleName"
                    ],
                    "singleMeasure": "count",
                    "selectedMeasures": [
                        "count"
                    ],
                    "splits": [
                        {
                            "bucketAction": {
                                "action": "timeBucket",
                                "duration": "PT1H"
                            },
                            "expression": {
                                "name": "time",
                                "op": "ref"
                            },
                            "sortAction": {
                                "action": "sort",
                                "direction": "ascending",
                                "expression": {
                                    "name": "time",
                                    "op": "ref"
                                }
                            }
                        }
                    ],
                    "timezone": "Etc/UTC",
                    "visualization": "line-chart"
                },
                "group": "Tests",
                "name": "test1",
                "title": "Test One"
            });
        });
    });
});
