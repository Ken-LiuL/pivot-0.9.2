"use strict";
var tester_1 = require('immutable-class/build/tester');
var split_combine_1 = require('./split-combine');
describe('SplitCombine', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(split_combine_1.SplitCombine, [
            {
                expression: { op: 'ref', name: 'language' }
            },
            {
                expression: { op: 'ref', name: 'lookup' }
            },
            {
                expression: { op: 'ref', name: 'time' },
                bucketAction: {
                    action: 'in',
                    expression: {
                        'op': 'literal',
                        'value': { 'setType': 'STRING', 'elements': ['he'] },
                        'type': 'SET'
                    }
                },
                sortAction: {
                    action: 'sort',
                    direction: 'ascending',
                    expression: {
                        op: 'ref',
                        name: 'time'
                    }
                },
                limitAction: {
                    action: 'limit',
                    limit: 2
                }
            }
        ]);
    });
});
