"use strict";
var tester_1 = require('immutable-class/build/tester');
var max_time_1 = require('./max-time');
describe('MaxTime', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(max_time_1.MaxTime, [
            {
                time: new Date("2015-10-15T19:20:00Z"),
                updated: new Date("2015-10-15T19:20:13Z")
            },
            {
                time: new Date("2015-10-15T19:21:00Z"),
                updated: new Date("2015-10-15T19:21:13Z")
            }
        ]);
    });
});
