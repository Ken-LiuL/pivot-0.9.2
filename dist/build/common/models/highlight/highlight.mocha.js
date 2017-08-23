"use strict";
var tester_1 = require('immutable-class/build/tester');
var highlight_1 = require('./highlight');
describe('Highlight', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(highlight_1.Highlight, [
            {
                owner: 'Sunkist',
                delta: {
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
                }
            },
            {
                owner: 'Dole',
                delta: { op: 'literal', value: true }
            }
        ]);
    });
});
