"use strict";
var dimension_1 = require('./dimension');
var DimensionMock = (function () {
    function DimensionMock() {
    }
    Object.defineProperty(DimensionMock, "COUNTRY_STRING_JS", {
        get: function () {
            return {
                name: 'country',
                title: 'important countries',
                'expression': {
                    'op': 'literal',
                    'value': { 'setType': 'STRING', 'elements': ['en'] },
                    'type': 'SET'
                },
                kind: 'string'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionMock, "COUNTRY_URL_JS", {
        get: function () {
            return {
                name: 'country',
                title: 'important countries',
                'expression': {
                    'op': 'literal',
                    'value': { 'setType': 'STRING', 'elements': ['en'] },
                    'type': 'SET'
                },
                kind: 'string',
                url: 'https://www.country.com/%s' // country.com redirects to a CMT.com. Could've been worse.
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionMock, "TIME_JS", {
        get: function () {
            return {
                name: 'time',
                title: 'time',
                'expression': {
                    'op': 'literal',
                    'value': { 'start': new Date('2013-02-26T19:00:00.000Z'), 'end': new Date('2013-02-26T22:00:00.000Z') },
                    'type': 'TIME_RANGE'
                },
                kind: 'time',
                url: 'http://www.time.com/%s'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionMock, "NUMBER_JS", {
        get: function () {
            return {
                name: 'numeric',
                title: 'Numeric',
                'expression': {
                    'op': 'literal',
                    'value': { 'setType': 'NUMBER', 'elements': [1] },
                    'type': 'SET'
                },
                kind: 'number'
            };
        },
        enumerable: true,
        configurable: true
    });
    DimensionMock.countryString = function () {
        return dimension_1.Dimension.fromJS(DimensionMock.COUNTRY_STRING_JS);
    };
    DimensionMock.countryURL = function () {
        return dimension_1.Dimension.fromJS(DimensionMock.COUNTRY_URL_JS);
    };
    DimensionMock.time = function () {
        return dimension_1.Dimension.fromJS(DimensionMock.TIME_JS);
    };
    DimensionMock.number = function () {
        return dimension_1.Dimension.fromJS(DimensionMock.NUMBER_JS);
    };
    return DimensionMock;
}());
exports.DimensionMock = DimensionMock;
