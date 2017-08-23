"use strict";
var chai_1 = require('chai');
var sizing_1 = require('./sizing');
describe('Sizing', function () {
    describe('getVisibleSegments', function () {
        it('works with basic stuff', function () {
            chai_1.expect(sizing_1.getVisibleSegments([100, 100, 100, 100, 100], 0, 250)).to.deep.equal({
                startIndex: 0,
                shownColumns: 3
            });
        });
        it('works with slight offset', function () {
            chai_1.expect(sizing_1.getVisibleSegments([100, 100, 100, 100, 100], 90, 200)).to.deep.equal({
                startIndex: 0,
                shownColumns: 3
            });
        });
        it('works with more offset', function () {
            chai_1.expect(sizing_1.getVisibleSegments([100, 100, 100, 100, 100], 150, 200)).to.deep.equal({
                startIndex: 1,
                shownColumns: 3
            });
        });
    });
});
