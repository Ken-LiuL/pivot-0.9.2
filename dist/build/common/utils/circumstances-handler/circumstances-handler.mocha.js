"use strict";
var chai_1 = require('chai');
var circumstances_handler_1 = require('./circumstances-handler');
describe('dimension kind matcher', function () {
    var strictCompare = circumstances_handler_1.CircumstancesHandler.strictCompare;
    it('should work in various cases', function () {
        var cases = [
            [[], [], true],
            [['time'], ['time'], true],
            [['time', '*'], ['pouet', 'time'], false],
            [['time', '*'], ['time', 'tut'], true],
            [['!time'], ['pouet'], true],
            [['!time'], ['time'], false],
            [['*'], ['time'], true]
        ];
        cases.forEach(function (c, i) {
            chai_1.expect(strictCompare(c[0], c[1])).to.equal(c[2], "test case #" + i);
        });
    });
});
