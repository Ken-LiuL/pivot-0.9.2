"use strict";
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var link_item_1 = require('../link-item/link-item');
var check;
var LinkViewConfig = (function () {
    function LinkViewConfig(parameters) {
        this.title = parameters.title;
        this.linkItems = parameters.linkItems;
    }
    LinkViewConfig.isLinkViewConfig = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, LinkViewConfig);
    };
    LinkViewConfig.fromJS = function (parameters, context) {
        if (!context)
            throw new Error('LinkViewConfig must have context');
        return new LinkViewConfig({
            title: parameters.title,
            linkItems: parameters.linkItems.map(function (linkItem) { return link_item_1.LinkItem.fromJS(linkItem, context); })
        });
    };
    LinkViewConfig.prototype.valueOf = function () {
        return {
            title: this.title,
            linkItems: this.linkItems
        };
    };
    LinkViewConfig.prototype.toJS = function () {
        return {
            title: this.title,
            linkItems: this.linkItems.map(function (linkItem) { return linkItem.toJS(); })
        };
    };
    LinkViewConfig.prototype.toJSON = function () {
        return this.toJS();
    };
    LinkViewConfig.prototype.toString = function () {
        return "[LinkViewConfig: " + this.title + "]";
    };
    LinkViewConfig.prototype.equals = function (other) {
        return LinkViewConfig.isLinkViewConfig(other) &&
            this.title === other.title &&
            immutable_class_1.immutableArraysEqual(this.linkItems, other.linkItems);
    };
    LinkViewConfig.prototype.defaultLinkItem = function () {
        return this.linkItems[0];
    };
    LinkViewConfig.prototype.findByName = function (name) {
        return plywood_1.helper.findByName(this.linkItems, name);
    };
    return LinkViewConfig;
}());
exports.LinkViewConfig = LinkViewConfig;
check = LinkViewConfig;
