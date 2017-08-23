"use strict";
var Resolve = (function () {
    function Resolve(score, state, adjustment, message, resolutions) {
        this.score = Math.max(1, Math.min(10, score));
        this.state = state;
        this.adjustment = adjustment;
        this.message = message;
        this.resolutions = resolutions;
    }
    // static READY: Resolve;
    Resolve.compare = function (r1, r2) {
        return r2.score - r1.score;
    };
    Resolve.automatic = function (score, adjustment) {
        return new Resolve(score, 'automatic', adjustment, null, null);
    };
    Resolve.manual = function (score, message, resolutions) {
        return new Resolve(score, 'manual', null, message, resolutions);
    };
    Resolve.ready = function (score) {
        return new Resolve(score, 'ready', null, null, null);
    };
    Resolve.prototype.toString = function () {
        return this.state;
    };
    Resolve.prototype.valueOf = function () {
        return this.state;
    };
    Resolve.prototype.isReady = function () {
        return this.state === 'ready';
    };
    Resolve.prototype.isAutomatic = function () {
        return this.state === 'automatic';
    };
    Resolve.prototype.isManual = function () {
        return this.state === 'manual';
    };
    Resolve.NEVER = new Resolve(-1, 'never', null, null, null);
    return Resolve;
}());
exports.Resolve = Resolve;
var Manifest = (function () {
    function Manifest(name, title, handleCircumstance, measureModeNeed) {
        if (measureModeNeed === void 0) { measureModeNeed = 'any'; }
        this.name = name;
        this.title = title;
        this.handleCircumstance = handleCircumstance;
        this.measureModeNeed = measureModeNeed;
    }
    return Manifest;
}());
exports.Manifest = Manifest;
