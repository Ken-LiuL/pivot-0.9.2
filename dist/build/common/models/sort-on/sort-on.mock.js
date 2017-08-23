"use strict";
var sort_on_1 = require('./sort-on');
var plywood_1 = require('plywood');
var SortOnMock = (function () {
    function SortOnMock() {
    }
    Object.defineProperty(SortOnMock, "DEFAULT_A_JS", {
        get: function () {
            return {
                measure: {
                    name: 'price',
                    title: 'Price',
                    expression: plywood_1.$('main').min('$price').toJS()
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortOnMock, "DEFAULT_B_JS", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortOnMock, "DEFAULT_C_JS", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    SortOnMock.defaultA = function () {
        return sort_on_1.SortOn.fromJS(SortOnMock.DEFAULT_A_JS);
    };
    SortOnMock.defaultB = function () {
        return sort_on_1.SortOn.fromJS(SortOnMock.DEFAULT_B_JS);
    };
    SortOnMock.defaultC = function () {
        return sort_on_1.SortOn.fromJS(SortOnMock.DEFAULT_C_JS);
    };
    return SortOnMock;
}());
exports.SortOnMock = SortOnMock;
