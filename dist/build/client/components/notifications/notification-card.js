"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./notification-card.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var notifications_1 = require('./notifications');
var NotificationCard = (function (_super) {
    __extends(NotificationCard, _super);
    function NotificationCard() {
        _super.call(this);
        this.state = { appearing: false, disappearing: false };
    }
    NotificationCard.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ appearing: true }, function () {
            _this.timeoutID = window.setTimeout(_this.appear.bind(_this), 10);
        });
    };
    NotificationCard.prototype.appear = function () {
        var _this = this;
        var _a = this.props.model, title = _a.title, message = _a.message, sticky = _a.sticky;
        if (sticky) {
            this.setState({ appearing: false });
            return;
        }
        this.setState({ appearing: false }, function () {
            _this.timeoutID = window.setTimeout(_this.disappear.bind(_this), title && message ? 2000 : 1000);
        });
    };
    NotificationCard.prototype.disappear = function () {
        var _this = this;
        this.setState({ disappearing: true }, function () {
            _this.timeoutID = window.setTimeout(_this.removeMe.bind(_this, _this.props.model), 200);
        });
    };
    NotificationCard.prototype.removeMe = function (notification) {
        if (this.timeoutID !== undefined)
            window.clearTimeout(this.timeoutID);
        notifications_1.Notifier.removeNotification(notification);
    };
    NotificationCard.prototype.componentWillUnmount = function () {
        if (this.timeoutID !== undefined)
            window.clearTimeout(this.timeoutID);
    };
    NotificationCard.prototype.render = function () {
        var _a = this.state, appearing = _a.appearing, disappearing = _a.disappearing;
        var _b = this.props, model = _b.model, top = _b.top;
        if (!model)
            return null;
        if (appearing || disappearing)
            top = -100;
        var height = model.title && model.message ? 60 : 30;
        return React.createElement("div", {style: { top: top, height: height }, onClick: this.disappear.bind(this), className: dom_1.classNames("notification-card " + model.priority, { appearing: appearing, disappearing: disappearing })}, React.createElement("div", {className: "title"}, model.title), React.createElement("div", {className: "message"}, model.message));
    };
    return NotificationCard;
}(React.Component));
exports.NotificationCard = NotificationCard;
