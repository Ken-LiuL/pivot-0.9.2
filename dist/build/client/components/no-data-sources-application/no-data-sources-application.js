"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./no-data-sources-application.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var svg_icon_1 = require('../svg-icon/svg-icon');
var NoDataSourcesApplication = (function (_super) {
    __extends(NoDataSourcesApplication, _super);
    function NoDataSourcesApplication() {
        _super.call(this);
    }
    NoDataSourcesApplication.prototype.componentDidMount = function () {
        this.refreshTimer = setInterval(function () {
            window.location.reload(true);
        }, 10000);
    };
    NoDataSourcesApplication.prototype.componentWillUnmount = function () {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    };
    NoDataSourcesApplication.prototype.render = function () {
        return React.createElement("div", {className: "no-data-sources-application"}, React.createElement("div", {className: "icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/datasources.svg')})), React.createElement("p", null, constants_1.STRINGS.noQueryableDataSources));
    };
    return NoDataSourcesApplication;
}(React.Component));
exports.NoDataSourcesApplication = NoDataSourcesApplication;
