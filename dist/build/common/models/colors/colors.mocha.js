"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var colors_1 = require('./colors');
describe('Colors', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(colors_1.Colors, [
            {
                dimension: 'country',
                limit: 5
            },
            {
                dimension: 'country',
                values: { '1': 'USA', '3': 'UK', '7': 'India' }
            },
            {
                dimension: 'country',
                values: { '3': 'UK', '7': 'India' },
                hasNull: true
            },
            {
                dimension: 'country',
                values: { '3': 100, '7': 200 },
                hasNull: true
            },
            {
                dimension: 'country',
                values: { '1': 'USA', '3': 'UK', '8': 'India' }
            },
            {
                dimension: 'country',
                values: { '0': 'USA', '1': 'UK', '2': 'India' }
            },
            {
                dimension: 'country',
                values: { '0': 'USA', '1': 'UK', '3': 'India' }
            }
        ]);
    });
    describe('methods', function () {
        describe('#fromLimit', function () {
            it('works in basic case', function () {
                var colors = colors_1.Colors.fromLimit('country', 5);
                chai_1.expect(colors.toJS()).to.deep.equal({
                    dimension: 'country',
                    limit: 5
                });
            });
        });
        describe('#fromValues', function () {
            it('works in basic case', function () {
                var colors = colors_1.Colors.fromValues('country', [null, 'Madagascar', 'UK', 'India', 'Russia']);
                chai_1.expect(colors.toJS()).to.deep.equal({
                    "dimension": "country",
                    "values": {
                        "0": 'Madagascar',
                        "1": "UK",
                        "2": "India",
                        "3": "Russia"
                    },
                    "hasNull": true
                });
                chai_1.expect(colors.has(null), 'has null').to.equal(true);
                chai_1.expect(colors.has('South Africa'), 'no SA').to.equal(false);
                colors = colors.add('South Africa');
                chai_1.expect(colors.has('South Africa')).to.equal(true);
                chai_1.expect(colors.toJS()).to.deep.equal({
                    "dimension": "country",
                    "values": {
                        "0": "Madagascar",
                        "1": "UK",
                        "2": "India",
                        "3": "Russia",
                        "4": "South Africa"
                    },
                    "hasNull": true
                });
                colors = colors.remove('UK');
                chai_1.expect(colors.toJS()).to.deep.equal({
                    "dimension": "country",
                    "values": {
                        "0": "Madagascar",
                        "2": "India",
                        "3": "Russia",
                        "4": "South Africa"
                    },
                    "hasNull": true
                });
                colors = colors.add('Australia');
                chai_1.expect(colors.toJS()).to.deep.equal({
                    "dimension": "country",
                    "values": {
                        "0": "Madagascar",
                        "1": "Australia",
                        "2": "India",
                        "3": "Russia",
                        "4": "South Africa"
                    },
                    "hasNull": true
                });
                var colorsWithGap = colors.remove("Australia");
                chai_1.expect(colors.equals(colorsWithGap)).to.equal(false);
                chai_1.expect(colorsWithGap.equals(colors)).to.equal(false);
            });
        });
    });
    describe('#getColors', function () {
        it('works in basic case (with null)', function () {
            var colors = colors_1.Colors.fromValues('country', [null, 'UK', 'India', 'Russia', 'Madagascar']);
            chai_1.expect(colors.getColors(['UK', null, 'lol'])).to.deep.equal(['#2D95CA', '#666666', null]);
        });
        it('works in basic case (no null)', function () {
            var colors = colors_1.Colors.fromValues('country', ['Null Island', 'UK', 'India', 'Russia', 'Madagascar']);
            chai_1.expect(colors.getColors(['UK', null, 'lol'])).to.deep.equal(['#EFB925', null, null]);
        });
    });
});
