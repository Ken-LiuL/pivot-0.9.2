"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var customization_1 = require('./customization');
var WallTime = require('chronoshift').WallTime;
if (!WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    WallTime.init(tzData.rules, tzData.zones);
}
describe('Customization', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(customization_1.Customization, [
            {
                title: "Hello World",
                headerBackground: "brown",
                customLogoSvg: "ansvgstring"
            },
            {
                headerBackground: "green",
                externalViews: []
            },
            {
                externalViews: [
                    {
                        title: "corporate dashboard",
                        linkGenerator: "{ return 'https://dashboard.corporate.com/'+filter.toString() }",
                        sameWindow: true
                    }, {
                        title: "google docs",
                        linkGenerator: "{ return 'http://182.343.32.2273:8080/'+dataSource.name }"
                    }, {
                        title: "google docs",
                        linkGenerator: "{ return 'http://182.343.32.2273:8080/'+timezone.timezone }"
                    }
                ]
            },
            {
                headerBackground: "green",
                externalViews: [],
                timezones: ["Pacific/Niue", "America/Los_Angeles"]
            }
        ]);
    });
    it("throws for invalid timezone", function () {
        chai_1.expect(function () {
            customization_1.Customization.fromJS({
                headerBackground: "green",
                externalViews: [],
                timezones: ["Pacific/Niue", "Not a timezone"]
            });
        }).to.throw("Unable to find time zone named Not a timezone");
    });
});
