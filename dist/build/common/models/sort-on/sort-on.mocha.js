"use strict";
var tester_1 = require('immutable-class/build/tester');
var plywood_1 = require('plywood');
var sort_on_1 = require('./sort-on');
describe('SortOn', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(sort_on_1.SortOn, [
            {
                measure: {
                    name: 'price',
                    title: 'Price',
                    expression: plywood_1.$('main').min('$price').toJS()
                }
            },
            {
                measure: {
                    expression: {
                        action: {
                            action: 'sum',
                            expression: {
                                name: 'price',
                                op: 'ref'
                            }
                        },
                        expression: {
                            name: 'main',
                            op: 'ref'
                        },
                        op: 'chain'
                    },
                    name: 'price',
                    title: 'Price'
                }
            },
            {
                dimension: {
                    name: 'country',
                    title: 'important countries',
                    'expression': {
                        'op': 'literal',
                        'value': { 'setType': 'STRING', 'elements': ['en'] },
                        'type': 'SET'
                    },
                    kind: 'string'
                }
            }
        ]);
    });
});
