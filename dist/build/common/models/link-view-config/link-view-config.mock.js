"use strict";
var link_item_mock_1 = require("../link-item/link-item.mock");
var link_view_config_1 = require('./link-view-config');
var LinkViewConfigMock = (function () {
    function LinkViewConfigMock() {
    }
    LinkViewConfigMock.testOneOnlyJS = function () {
        return {
            title: 'The Links Will Rise Again!',
            linkItems: [
                link_item_mock_1.LinkItemMock.testOneJS()
            ]
        };
    };
    LinkViewConfigMock.testOneTwoJS = function () {
        return {
            title: 'The Links Will Be Reloaded!',
            linkItems: [
                link_item_mock_1.LinkItemMock.testOneJS(),
                link_item_mock_1.LinkItemMock.testTwoJS()
            ]
        };
    };
    LinkViewConfigMock.getContext = function () {
        return link_item_mock_1.LinkItemMock.getContext();
    };
    LinkViewConfigMock.testOneOnly = function () {
        return link_view_config_1.LinkViewConfig.fromJS(LinkViewConfigMock.testOneOnlyJS(), LinkViewConfigMock.getContext());
    };
    LinkViewConfigMock.testOneTwo = function () {
        return link_view_config_1.LinkViewConfig.fromJS(LinkViewConfigMock.testOneTwoJS(), LinkViewConfigMock.getContext());
    };
    return LinkViewConfigMock;
}());
exports.LinkViewConfigMock = LinkViewConfigMock;
