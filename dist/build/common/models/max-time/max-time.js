"use strict";
var immutable_class_1 = require('immutable-class');
var check;
var MaxTime = (function () {
    function MaxTime(parameters) {
        this.time = parameters.time;
        this.updated = parameters.updated;
    }
    MaxTime.isMaxTime = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, MaxTime);
    };
    MaxTime.fromNow = function () {
        var now = new Date();
        return new MaxTime({
            time: now,
            updated: now
        });
    };
    MaxTime.fromDate = function (time) {
        return new MaxTime({
            time: time,
            updated: new Date()
        });
    };
    MaxTime.fromJS = function (parameters) {
        var time = new Date(parameters.time);
        if (isNaN(time)) {
            throw new Error('maxTime must have a valid `time`');
        }
        return new MaxTime({
            time: time,
            updated: new Date((parameters.updated || parameters.time))
        });
    };
    MaxTime.prototype.valueOf = function () {
        return {
            time: this.time,
            updated: this.updated
        };
    };
    MaxTime.prototype.toJS = function () {
        return {
            time: this.time,
            updated: this.updated
        };
    };
    MaxTime.prototype.toJSON = function () {
        return this.toJS();
    };
    MaxTime.prototype.toString = function () {
        return "[MaxTime: " + this.time.toISOString() + "]";
    };
    MaxTime.prototype.equals = function (other) {
        return MaxTime.isMaxTime(other) &&
            this.time.valueOf() === other.time.valueOf();
    };
    return MaxTime;
}());
exports.MaxTime = MaxTime;
check = MaxTime;
