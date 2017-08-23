"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./notifications.css');
var React = require('react');
var body_portal_1 = require('../body-portal/body-portal');
var notification_card_1 = require('./notification-card');
var Notifier = (function () {
    function Notifier() {
    }
    Notifier.create = function (notification) {
        notification.id = Notifier.counter++;
        Notifier.notifications.push(notification);
        Notifier.listeners.forEach(function (cb) { return cb(Notifier.notifications); });
    };
    Notifier.info = function (title, message) {
        Notifier.create({ title: title, message: message, priority: 'info' });
    };
    Notifier.failure = function (title, message) {
        Notifier.create({ title: title, message: message, priority: 'failure' });
    };
    Notifier.success = function (title, message) {
        Notifier.create({ title: title, message: message, priority: 'success' });
    };
    Notifier.subscribe = function (callback) {
        Notifier.listeners.push(callback);
    };
    Notifier.removeNotification = function (notification) {
        var index = Notifier.notifications.indexOf(notification);
        if (index === -1) {
            throw new Error('Trying to remove an unknown notification');
        }
        Notifier.notifications.splice(index, 1);
        Notifier.listeners.forEach(function (cb) { return cb(Notifier.notifications); });
    };
    Notifier.unsubscribe = function (callback) {
        var index = Notifier.listeners.indexOf(callback);
        if (index === -1) {
            throw new Error('Trying to unsubscribe something that never subscribed');
        }
        Notifier.listeners.splice(index, 1);
    };
    Notifier.counter = 0;
    Notifier.notifications = [];
    Notifier.listeners = [];
    return Notifier;
}());
exports.Notifier = Notifier;
var Notifications = (function (_super) {
    __extends(Notifications, _super);
    function Notifications() {
        _super.call(this);
        this.state = { notifications: [] };
        this.onChange = this.onChange.bind(this);
    }
    Notifications.prototype.componentDidMount = function () {
        Notifier.subscribe(this.onChange);
    };
    Notifications.prototype.componentWillUnmount = function () {
        Notifier.unsubscribe(this.onChange);
    };
    Notifications.prototype.onChange = function (notifications) {
        this.setState({ notifications: notifications });
    };
    Notifications.prototype.renderCards = function () {
        var cumuledHeight = 0;
        return this.state.notifications.map(function (n, i) {
            var top = cumuledHeight;
            if (n.title && n.message) {
                cumuledHeight += 60 + 5;
            }
            else {
                cumuledHeight += 30 + 5;
            }
            return React.createElement(notification_card_1.NotificationCard, {model: n, key: n.id, top: top});
        });
    };
    Notifications.prototype.render = function () {
        return React.createElement(body_portal_1.BodyPortal, {left: '50%', top: '10px'}, React.createElement("div", {className: "notifications"}, this.renderCards()));
    };
    return Notifications;
}(React.Component));
exports.Notifications = Notifications;
