"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var chronoshift_1 = require('chronoshift');
var filter_clause_1 = require('./filter-clause');
describe('FilterClause', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(filter_clause_1.FilterClause, [
            {
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'literal',
                    value: {
                        "setType": "STRING",
                        "elements": ["en"]
                    },
                    "type": "SET"
                }
            },
            {
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'literal',
                    value: {
                        "setType": "STRING",
                        "elements": ["en", null]
                    },
                    "type": "SET"
                }
            },
            {
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'literal',
                    value: {
                        "setType": "STRING",
                        "elements": ["en"]
                    },
                    "type": "SET"
                },
                exclude: true
            },
            {
                expression: { op: 'ref', name: 'time' },
                selection: {
                    op: 'literal',
                    value: {
                        "setType": "TIME_RANGE",
                        "elements": [{ start: new Date('2015-11-11'), end: new Date('2015-11-12') }]
                    },
                    "type": "SET"
                },
                exclude: true
            },
            // Dynamic!
            {
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'chain',
                    expression: { op: 'ref', name: 'n' },
                    action: { action: 'timeRange', duration: 'P1D', step: -1 }
                }
            },
            {
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'chain',
                    expression: { op: 'ref', name: 'm' },
                    actions: [
                        { action: 'timeShift', duration: 'P5D', step: -1 },
                        { action: 'timeRange', duration: 'P1D', step: -1 }
                    ]
                }
            }
        ]);
    });
    describe("evaluate", function () {
        it("works with now", function () {
            var clause = filter_clause_1.FilterClause.fromJS({
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'chain',
                    expression: { op: 'ref', name: 'n' },
                    action: { action: 'timeRange', duration: 'P1D', step: -1 }
                }
            });
            var now = new Date('2016-01-15T11:22:33Z');
            var maxTime = new Date('2016-01-15T08:22:00Z');
            chai_1.expect(clause.evaluate(now, maxTime, chronoshift_1.Timezone.UTC).toJS()).to.deep.equal({
                "selection": {
                    "op": "literal",
                    "type": "TIME_RANGE",
                    "value": {
                        "end": new Date('2016-01-15T11:22:33.000Z'),
                        "start": new Date('2016-01-14T11:22:33.000Z')
                    }
                },
                "expression": {
                    "name": "language",
                    "op": "ref"
                }
            });
        });
        it("works with maxTime", function () {
            var clause = filter_clause_1.FilterClause.fromJS({
                expression: { op: 'ref', name: 'language' },
                selection: {
                    op: 'chain',
                    expression: { op: 'ref', name: 'm' },
                    action: { action: 'timeRange', duration: 'P1D', step: -1 }
                }
            });
            var now = new Date('2016-01-15T11:22:33Z');
            var maxTime = new Date('2016-01-15T08:22:00Z');
            chai_1.expect(clause.evaluate(now, maxTime, chronoshift_1.Timezone.UTC).toJS()).to.deep.equal({
                "selection": {
                    "op": "literal",
                    "type": "TIME_RANGE",
                    "value": {
                        "end": new Date('2016-01-15T08:23:00Z'),
                        "start": new Date('2016-01-14T08:23:00Z')
                    }
                },
                "expression": {
                    "name": "language",
                    "op": "ref"
                }
            });
        });
    });
});
