"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./query-error.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var QueryError = (function (_super) {
    __extends(QueryError, _super);
    function QueryError() {
        _super.call(this);
    }
    QueryError.prototype.render = function () {
        var error = this.props.error;
        return React.createElement("div", {className: "query-error"}, React.createElement("div", {className: "whiteout"}), React.createElement("div", {className: "error-container"}, React.createElement("div", {className: "error"}, constants_1.STRINGS.queryError), React.createElement("div", {className: "message"}, error.message)));
    };
    return QueryError;
}(React.Component));
exports.QueryError = QueryError;
