"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./user-menu.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var constants_1 = require('../../config/constants');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var UserMenu = (function (_super) {
    __extends(UserMenu, _super);
    function UserMenu() {
        _super.call(this);
    }
    UserMenu.prototype.render = function () {
        var _a = this.props, openOn = _a.openOn, onClose = _a.onClose, user = _a.user;
        var stage = index_1.Stage.fromSize(200, 200);
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "user-menu", direction: "down", stage: stage, openOn: openOn, onClose: onClose}, React.createElement("ul", {className: "bubble-list"}, React.createElement("li", {className: "user-name"}, user.name), React.createElement("li", {className: "copy-static-url clipboard", onClick: onClose}, constants_1.STRINGS.logout)));
    };
    return UserMenu;
}(React.Component));
exports.UserMenu = UserMenu;
