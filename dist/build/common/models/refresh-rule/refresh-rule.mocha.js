"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var refresh_rule_1 = require('./refresh-rule');
describe('RefreshRule', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(refresh_rule_1.RefreshRule, [
            {
                rule: 'fixed',
                time: new Date("2015-10-15T19:21:00Z")
            },
            {
                rule: 'query',
                refresh: 'P1D'
            },
            {
                rule: 'query',
                refresh: 'PT1M'
            },
            {
                rule: 'realtime',
                refresh: 'PT1M'
            }
        ]);
    });
    describe('Auto refresh rate', function () {
        it("works for query", function () {
            chai_1.expect(refresh_rule_1.RefreshRule.fromJS({ rule: 'query' }).toJS()).to.deep.equal({
                rule: 'query',
                refresh: 'PT1M'
            });
        });
        it("works for realtime", function () {
            chai_1.expect(refresh_rule_1.RefreshRule.fromJS({ rule: 'realtime' }).toJS()).to.deep.equal({
                rule: 'realtime',
                refresh: 'PT1M'
            });
        });
    });
});
