"use strict";
var chai_1 = require('chai');
var tester_1 = require('../../../../node_modules/immutable-class/build/tester');
var server_settings_1 = require('./server-settings');
describe('ServerSettings', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(server_settings_1.ServerSettings, [
            {
                port: 9090,
                serverRoot: '/pivots',
                pageMustLoadTimeout: 900,
                iframe: 'deny'
            },
            {
                port: 9091,
                serverRoot: '/pivots',
                pageMustLoadTimeout: 901
            },
            {
                port: 9091,
                serverHost: '10.20.30.40',
                serverRoot: '/pivots',
                pageMustLoadTimeout: 901
            }
        ]);
    });
    describe("upgrades", function () {
        it("port", function () {
            chai_1.expect(server_settings_1.ServerSettings.fromJS({
                port: '9090',
                serverRoot: '/pivots',
                pageMustLoadTimeout: 900,
                iframe: 'deny'
            }).toJS()).to.deep.equal({
                port: 9090,
                serverRoot: '/pivots',
                pageMustLoadTimeout: 900,
                iframe: 'deny'
            });
        });
    });
});
