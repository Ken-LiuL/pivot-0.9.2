"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var plywood_1 = require('plywood');
var filter_1 = require('./filter');
describe('Filter', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(filter_1.Filter, [
            { op: 'literal', value: true },
            {
                "op": "chain", "expression": { "op": "ref", "name": "language" },
                "action": {
                    "action": "overlap",
                    "expression": {
                        "op": "literal",
                        "value": { "setType": "STRING", "elements": ["en"] },
                        "type": "SET"
                    }
                }
            },
            {
                "op": "chain", "expression": { "op": "ref", "name": "time" },
                "action": {
                    "action": "in",
                    "expression": {
                        "op": "literal",
                        "value": { "start": new Date("2013-02-26T19:00:00.000Z"), "end": new Date("2013-02-26T22:00:00.000Z") },
                        "type": "TIME_RANGE"
                    }
                }
            },
            {
                "op": "chain", "expression": { "op": "ref", "name": "language" },
                "action": {
                    "action": "overlap",
                    "expression": {
                        "op": "literal",
                        "value": { "setType": "STRING", "elements": ["he"] },
                        "type": "SET"
                    }
                }
            },
            {
                "op": "chain",
                "expression": { "op": "ref", "name": "language" },
                "actions": [
                    {
                        "action": "overlap",
                        "expression": {
                            "op": "literal",
                            "value": { "setType": "STRING", "elements": ["he"] },
                            "type": "SET"
                        }
                    },
                    {
                        "action": "and",
                        "expression": {
                            "op": "chain", "expression": { "op": "ref", "name": "namespace" },
                            "action": {
                                "action": "overlap",
                                "expression": {
                                    "op": "literal",
                                    "value": { "setType": "STRING", "elements": ["wikipedia"] },
                                    "type": "SET"
                                }
                            }
                        }
                    }
                ]
            },
            // Dynamic
            {
                "op": "chain", "expression": { "op": "ref", "name": "time" },
                "action": {
                    "action": "in",
                    "expression": {
                        op: 'chain',
                        expression: { op: 'ref', name: 'n' },
                        action: { action: 'timeRange', duration: 'P1D', step: -1 }
                    }
                }
            }
        ]);
    });
    it('works in empty case', function () {
        var filter = filter_1.Filter.EMPTY;
        chai_1.expect(filter.toExpression().toJS()).to.deep.equal({
            "op": "literal",
            "value": true
        });
    });
    it('add works', function () {
        var filter = filter_1.Filter.EMPTY;
        var $language = plywood_1.$('language');
        filter = filter.addValue($language, 'en');
        var ex = $language.overlap(['en']);
        chai_1.expect(filter.toExpression().toJS()).to.deep.equal(ex.toJS());
        filter = filter.addValue($language, null);
        var ex = $language.overlap(['en', null]);
        chai_1.expect(filter.toExpression().toJS()).to.deep.equal(ex.toJS());
    });
    it('upgrades', function () {
        var filter = filter_1.Filter.fromJS({
            "op": "chain",
            "expression": { "op": "ref", "name": "language" },
            "actions": [
                {
                    "action": "in",
                    "expression": {
                        "op": "literal",
                        "value": { "setType": "STRING", "elements": ["he"] },
                        "type": "SET"
                    }
                },
                {
                    "action": "and",
                    "expression": {
                        "op": "chain", "expression": { "op": "ref", "name": "namespace" },
                        "action": {
                            "action": "in",
                            "expression": {
                                "op": "literal",
                                "value": { "setType": "STRING", "elements": ["wikipedia"] },
                                "type": "SET"
                            }
                        }
                    }
                }
            ]
        });
        chai_1.expect(filter.toJS()).to.deep.equal({
            "op": "chain",
            "expression": { "op": "ref", "name": "language" },
            "actions": [
                {
                    "action": "overlap",
                    "expression": {
                        "op": "literal",
                        "value": { "setType": "STRING", "elements": ["he"] },
                        "type": "SET"
                    }
                },
                {
                    "action": "and",
                    "expression": {
                        "op": "chain", "expression": { "op": "ref", "name": "namespace" },
                        "action": {
                            "action": "overlap",
                            "expression": {
                                "op": "literal",
                                "value": { "setType": "STRING", "elements": ["wikipedia"] },
                                "type": "SET"
                            }
                        }
                    }
                }
            ]
        });
    });
});
