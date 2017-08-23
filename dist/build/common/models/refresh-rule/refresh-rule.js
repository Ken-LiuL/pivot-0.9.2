"use strict";
var immutable_class_1 = require('immutable-class');
var chronoshift_1 = require('chronoshift');
var check;
var RefreshRule = (function () {
    function RefreshRule(parameters) {
        var rule = parameters.rule;
        if (rule !== RefreshRule.FIXED && rule !== RefreshRule.QUERY && rule !== RefreshRule.REALTIME) {
            throw new Error("rule must be on of: " + RefreshRule.FIXED + ", " + RefreshRule.QUERY + ", or " + RefreshRule.REALTIME);
        }
        this.rule = rule;
        this.refresh = parameters.refresh;
        if (this.rule !== RefreshRule.FIXED && !this.refresh) {
            this.refresh = RefreshRule.DEFAULT_QUERY_REFRESH;
        }
        this.time = parameters.time;
    }
    RefreshRule.isRefreshRule = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, RefreshRule);
    };
    RefreshRule.query = function (refresh) {
        return new RefreshRule({
            rule: RefreshRule.QUERY,
            refresh: refresh
        });
    };
    RefreshRule.fromJS = function (parameters) {
        var value = {
            rule: parameters.rule
        };
        if (parameters.refresh) {
            value.refresh = chronoshift_1.Duration.fromJS(parameters.refresh);
        }
        if (parameters.time) {
            value.time = new Date(parameters.time);
        }
        return new RefreshRule(value);
    };
    RefreshRule.prototype.valueOf = function () {
        var value = {
            rule: this.rule
        };
        if (this.refresh) {
            value.refresh = this.refresh;
        }
        if (this.time) {
            value.time = this.time;
        }
        return value;
    };
    RefreshRule.prototype.toJS = function () {
        var js = {
            rule: this.rule
        };
        if (this.refresh) {
            js.refresh = this.refresh.toJS();
        }
        if (this.time) {
            js.time = this.time;
        }
        return js;
    };
    RefreshRule.prototype.toJSON = function () {
        return this.toJS();
    };
    RefreshRule.prototype.toString = function () {
        return "[RefreshRule: " + this.rule + "]";
    };
    RefreshRule.prototype.equals = function (other) {
        return RefreshRule.isRefreshRule(other) &&
            this.rule === other.rule &&
            Boolean(this.refresh) === Boolean(other.refresh) &&
            (!this.refresh || this.refresh.equals(other.refresh)) &&
            (!this.time || this.time.valueOf() === other.time.valueOf());
    };
    RefreshRule.prototype.isFixed = function () {
        return this.rule === RefreshRule.FIXED;
    };
    RefreshRule.prototype.isQuery = function () {
        return this.rule === RefreshRule.QUERY;
    };
    RefreshRule.prototype.isRealtime = function () {
        return this.rule === RefreshRule.REALTIME;
    };
    RefreshRule.prototype.shouldUpdate = function (maxTime) {
        if (this.isFixed())
            return false;
        if (!maxTime)
            return true;
        var refresh = this.refresh;
        if (!refresh)
            return false;
        return Date.now() - maxTime.updated.valueOf() > refresh.getCanonicalLength();
    };
    RefreshRule.FIXED = 'fixed';
    RefreshRule.QUERY = 'query';
    RefreshRule.REALTIME = 'realtime';
    RefreshRule.DEFAULT_QUERY_REFRESH = chronoshift_1.Duration.fromJS('PT1M');
    return RefreshRule;
}());
exports.RefreshRule = RefreshRule;
check = RefreshRule;
