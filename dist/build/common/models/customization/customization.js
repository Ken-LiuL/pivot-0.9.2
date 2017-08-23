"use strict";
var immutable_class_1 = require('immutable-class');
var chronoshift_1 = require('chronoshift');
var external_view_1 = require('../external-view/external-view');
var WallTime = require('chronoshift').WallTime;
if (!WallTime.rules) {
    var tzData = require("chronoshift/lib/walltime/walltime-data.js");
    WallTime.init(tzData.rules, tzData.zones);
}
var check;
var Customization = (function () {
    function Customization(parameters) {
        this.title = parameters.title || null;
        this.headerBackground = parameters.headerBackground || null;
        this.customLogoSvg = parameters.customLogoSvg || null;
        if (parameters.externalViews)
            this.externalViews = parameters.externalViews;
        if (parameters.timezones)
            this.timezones = parameters.timezones;
    }
    Customization.isCustomization = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Customization);
    };
    Customization.fromJS = function (parameters) {
        var value = {
            title: parameters.title,
            headerBackground: parameters.headerBackground,
            customLogoSvg: parameters.customLogoSvg
        };
        var paramViewsJS = parameters.externalViews;
        var externalViews = null;
        if (Array.isArray(paramViewsJS)) {
            externalViews = paramViewsJS.map(function (view, i) { return external_view_1.ExternalView.fromJS(view); });
            value.externalViews = externalViews;
        }
        var timezonesJS = parameters.timezones;
        var timezones = null;
        if (Array.isArray(timezonesJS)) {
            timezones = timezonesJS.map(chronoshift_1.Timezone.fromJS);
            value.timezones = timezones;
        }
        return new Customization(value);
    };
    Customization.prototype.valueOf = function () {
        return {
            title: this.title,
            headerBackground: this.headerBackground,
            customLogoSvg: this.customLogoSvg,
            externalViews: this.externalViews,
            timezones: this.timezones
        };
    };
    Customization.prototype.toJS = function () {
        var js = {};
        if (this.title)
            js.title = this.title;
        if (this.headerBackground)
            js.headerBackground = this.headerBackground;
        if (this.customLogoSvg)
            js.customLogoSvg = this.customLogoSvg;
        if (this.externalViews) {
            js.externalViews = this.externalViews.map(function (view) { return view.toJS(); });
        }
        if (this.timezones) {
            js.timezones = this.timezones.map(function (tz) { return tz.toJS(); });
        }
        return js;
    };
    Customization.prototype.toJSON = function () {
        return this.toJS();
    };
    Customization.prototype.toString = function () {
        return "[custom: (" + this.headerBackground + ") logo: " + Boolean(this.customLogoSvg) + ", externalViews: " + Boolean(this.externalViews) + ", timezones: " + Boolean(this.timezones) + "]";
    };
    Customization.prototype.equals = function (other) {
        return Customization.isCustomization(other) &&
            this.title === other.title &&
            this.headerBackground === other.headerBackground &&
            this.customLogoSvg === other.customLogoSvg &&
            immutable_class_1.immutableArraysEqual(this.externalViews, other.externalViews) &&
            immutable_class_1.immutableArraysEqual(this.timezones, other.timezones);
    };
    Customization.prototype.getTitle = function (version) {
        var title = this.title || Customization.DEFAULT_TITLE;
        return title.replace(/%v/g, version);
    };
    Customization.prototype.changeTitle = function (title) {
        var value = this.valueOf();
        value.title = title;
        return new Customization(value);
    };
    Customization.prototype.getTimezones = function () {
        return this.timezones || Customization.DEFAULT_TIMEZONES;
    };
    Customization.DEFAULT_TITLE = 'Pivot (%v)';
    Customization.DEFAULT_TIMEZONES = [
        new chronoshift_1.Timezone("America/Juneau"),
        new chronoshift_1.Timezone("America/Los_Angeles"),
        new chronoshift_1.Timezone("America/Yellowknife"),
        new chronoshift_1.Timezone("America/Phoenix"),
        new chronoshift_1.Timezone("America/Denver"),
        new chronoshift_1.Timezone("America/Mexico_City"),
        new chronoshift_1.Timezone("America/Chicago"),
        new chronoshift_1.Timezone("America/New_York"),
        new chronoshift_1.Timezone("America/Argentina/Buenos_Aires"),
        chronoshift_1.Timezone.UTC,
        new chronoshift_1.Timezone("Asia/Jerusalem"),
        new chronoshift_1.Timezone("Europe/Paris"),
        new chronoshift_1.Timezone("Asia/Kathmandu"),
        new chronoshift_1.Timezone("Asia/Hong_Kong"),
        new chronoshift_1.Timezone("Asia/Seoul"),
        new chronoshift_1.Timezone("Pacific/Guam") // +10.0
    ];
    return Customization;
}());
exports.Customization = Customization;
check = Customization;
