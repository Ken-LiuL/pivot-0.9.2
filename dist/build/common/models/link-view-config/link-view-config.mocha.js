"use strict";
var tester_1 = require('immutable-class/build/tester');
var link_view_config_mock_1 = require('./link-view-config.mock');
var link_view_config_1 = require('./link-view-config');
describe('LinkViewConfig', function () {
    var context = link_view_config_mock_1.LinkViewConfigMock.getContext();
    it('is an immutable class', function () {
        tester_1.testImmutableClass(link_view_config_1.LinkViewConfig, [
            link_view_config_mock_1.LinkViewConfigMock.testOneOnlyJS(),
            link_view_config_mock_1.LinkViewConfigMock.testOneTwoJS()
        ], { context: context });
    });
});
