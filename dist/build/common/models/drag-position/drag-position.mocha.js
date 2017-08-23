"use strict";
var tester_1 = require('immutable-class/build/tester');
var drag_position_1 = require('./drag-position');
describe('DragPosition', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(drag_position_1.DragPosition, [
            {
                insert: 0
            },
            {
                insert: 2
            },
            {
                replace: 0
            },
            {
                replace: 1
            }
        ]);
    });
});
