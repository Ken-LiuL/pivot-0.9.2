"use strict";
var chai_1 = require('chai');
var chronoshift_1 = require('chronoshift');
var plywood_1 = require('plywood');
var time_1 = require('./time');
var WallTime = require('chronoshift').WallTime;
if (!WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    WallTime.init(tzData.rules, tzData.zones);
}
describe('Time', function () {
    it('calculates date equality properly', function () {
        chai_1.expect(time_1.datesEqual(null, new Date()), 'null and not null').to.equal(false);
        chai_1.expect(time_1.datesEqual(null, null), 'null and null').to.equal(true);
        chai_1.expect(time_1.datesEqual(new Date('1995-02-24T00:00:00.000Z'), new Date('1995-02-24T00:00:00.000Z')), 'equal dates').to.equal(true);
        chai_1.expect(time_1.datesEqual(new Date('1995-02-24T00:00:00.000Z'), new Date('1995-02-24T00:02:00.000Z')), 'not equal dates').to.equal(false);
    });
    it('prepends days', function () {
        var testFirstWeek = [];
        for (var i = 1; i < 5; i++) {
            testFirstWeek.push(new Date(Date.UTC(1995, 2, i)));
        }
        var prepended = time_1.prependDays(chronoshift_1.Timezone.UTC, testFirstWeek, 5);
        chai_1.expect(prepended).to.deep.equal([
            new Date('1995-02-24T00:00:00.000Z'),
            new Date('1995-02-25T00:00:00.000Z'),
            new Date('1995-02-26T00:00:00.000Z'),
            new Date('1995-02-27T00:00:00.000Z'),
            new Date('1995-02-28T00:00:00.000Z'),
            new Date('1995-03-01T00:00:00.000Z'),
            new Date('1995-03-02T00:00:00.000Z'),
            new Date('1995-03-03T00:00:00.000Z'),
            new Date('1995-03-04T00:00:00.000Z')
        ]);
    });
    it('appends days', function () {
        var testWeek = [];
        for (var i = 1; i < 5; i++) {
            testWeek.push(new Date(Date.UTC(1995, 2, i)));
        }
        var append = time_1.appendDays(chronoshift_1.Timezone.UTC, testWeek, 5);
        chai_1.expect(append).to.deep.equal([
            new Date('1995-03-01T00:00:00.000Z'),
            new Date('1995-03-02T00:00:00.000Z'),
            new Date('1995-03-03T00:00:00.000Z'),
            new Date('1995-03-04T00:00:00.000Z'),
            new Date('1995-03-05T00:00:00.000Z'),
            new Date('1995-03-06T00:00:00.000Z'),
            new Date('1995-03-07T00:00:00.000Z'),
            new Date('1995-03-08T00:00:00.000Z'),
            new Date('1995-03-09T00:00:00.000Z')
        ]);
    });
    var TZ_KATHMANDU = new chronoshift_1.Timezone("Asia/Kathmandu"); // +5.8;
    var TZ_TIJUANA = new chronoshift_1.Timezone("America/Tijuana"); // -8.0
    var TZ_Kiritimati = new chronoshift_1.Timezone("Pacific/Kiritimati"); // +14.0
    it('gets human friendly end time which is -1 ms from actual end time', function () {
        var endExclusive = new Date("1995-03-09T00:00:00.000Z");
        var timezone = new chronoshift_1.Timezone("America/Tijuana");
        var endWallTimeInclusive = time_1.getEndWallTimeInclusive(endExclusive, timezone)['wallTime'].toISOString();
        chai_1.expect(endWallTimeInclusive, 'tijuana').to.equal(new Date("1995-03-08T15:59:59.999Z").toISOString());
        endExclusive = new Date("1995-03-09T00:00:00.000Z");
        endWallTimeInclusive = time_1.getEndWallTimeInclusive(endExclusive, TZ_KATHMANDU)['wallTime'].toISOString();
        chai_1.expect(endWallTimeInclusive, 'kathmandu').to.equal(new Date("1995-03-09T05:44:59.999Z").toISOString());
        endExclusive = new Date("1999-03-09T00:00:00.000Z");
        endWallTimeInclusive = time_1.getEndWallTimeInclusive(endExclusive, TZ_TIJUANA)['wallTime'].toISOString();
        chai_1.expect(endWallTimeInclusive, 'tijuana2').to.equal(new Date("1999-03-08T15:59:59.999Z").toISOString());
        endExclusive = new Date("2016-02-28T00:00:00.000Z");
        endWallTimeInclusive = time_1.getEndWallTimeInclusive(endExclusive, TZ_Kiritimati)['wallTime'].toISOString();
        chai_1.expect(endWallTimeInclusive, 'kiritimati').to.equal(new Date("2016-02-28T13:59:59.999Z").toISOString());
    });
    it('get walltime day returns day according to walltime', function () {
        var date = new Date("1995-03-09T00:00:00.000Z");
        chai_1.expect(time_1.getWallTimeDay(date, TZ_TIJUANA), 'tijuana walltime').to.equal(8);
        chai_1.expect(time_1.getWallTimeDay(date, TZ_KATHMANDU), 'kathmandu walltime').to.equal(9);
        chai_1.expect(time_1.getWallTimeDay(date, TZ_Kiritimati), 'kiritimati walltime').to.equal(9);
    });
    it('get walltime month returns full month and year according to walltime', function () {
        var date = new Date("1965-02-02T13:00:00.000Z");
        chai_1.expect(time_1.getWallTimeMonthWithYear(date, TZ_TIJUANA), 'basic tijuana').to.equal("February 1965");
        chai_1.expect(time_1.getWallTimeMonthWithYear(date, TZ_KATHMANDU), 'basic kathmandu').to.equal("February 1965");
        chai_1.expect(time_1.getWallTimeMonthWithYear(date, TZ_Kiritimati), 'basic kiritimati').to.equal("February 1965");
        date = new Date("1999-12-31T20:15:00.000Z");
        chai_1.expect(time_1.getWallTimeMonthWithYear(date, TZ_TIJUANA), 'y2k tijuana').to.equal("December 1999");
        chai_1.expect(time_1.getWallTimeMonthWithYear(date, TZ_KATHMANDU), 'y2k kathmandu').to.equal("January 2000");
        chai_1.expect(time_1.getWallTimeMonthWithYear(date, TZ_Kiritimati), 'y2k kiritimati').to.equal("January 2000");
    });
    it('formats time range based off of start walltime', function () {
        var locale = {
            shortDays: ["2"],
            weekStart: 0,
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        };
        var start = new Date("1965-02-02T13:00:00.000Z");
        var end = chronoshift_1.day.shift(start, TZ_TIJUANA, 1);
        var gran = chronoshift_1.Duration.fromJS('PT1H');
        var range = new plywood_1.TimeRange({ start: start, end: end });
        chai_1.expect(time_1.formatTimeBasedOnGranularity(range, gran, TZ_TIJUANA, locale), 'hour tijuana').to.equal("Feb 2, 1965, 5am");
        start = new Date("1999-05-02T13:00:00.000Z");
        end = chronoshift_1.month.shift(start, TZ_TIJUANA, 1);
        gran = chronoshift_1.Duration.fromJS('PT1S');
        range = new plywood_1.TimeRange({ start: start, end: end });
        chai_1.expect(time_1.formatTimeBasedOnGranularity(range, gran, TZ_TIJUANA, locale), 'second tijuana').to.equal("May 2, 06:00:00");
        start = new Date("1999-05-02T13:00:00.000Z");
        end = chronoshift_1.month.shift(start, TZ_TIJUANA, 1);
        gran = chronoshift_1.Duration.fromJS('P1W');
        range = new plywood_1.TimeRange({ start: start, end: end });
        chai_1.expect(time_1.formatTimeBasedOnGranularity(range, gran, TZ_TIJUANA, locale), 'week tijuana').to.equal("May 2 - Jun 2, 1999 6am");
        start = new Date("1999-05-02T13:00:00.000Z");
        end = chronoshift_1.month.shift(start, TZ_KATHMANDU, 1);
        gran = chronoshift_1.Duration.fromJS('P1M');
        range = new plywood_1.TimeRange({ start: start, end: end });
        var monthFmt = time_1.formatTimeBasedOnGranularity(range, gran, TZ_KATHMANDU, locale);
        chai_1.expect(monthFmt, 'month granularity format').to.equal("May, 1999");
        var minFmt = time_1.formatTimeBasedOnGranularity(range, chronoshift_1.Duration.fromJS("PT1M"), TZ_KATHMANDU, locale);
        chai_1.expect(minFmt, 'minute granularity format').to.equal("May 2, 6:45pm");
        chai_1.expect(monthFmt).to.not.equal(minFmt, 'distinguishes between month and minute fmt');
    });
});
