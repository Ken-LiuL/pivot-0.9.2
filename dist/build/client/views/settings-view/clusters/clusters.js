"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./clusters.css');
var React = require('react');
var button_1 = require('../../../components/button/button');
var simple_table_1 = require('../../../components/simple-table/simple-table');
var Clusters = (function (_super) {
    __extends(Clusters, _super);
    function Clusters() {
        _super.call(this);
        this.state = { hasChanged: false };
    }
    Clusters.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.settings)
            this.setState({
                newSettings: nextProps.settings,
                hasChanged: false
            });
    };
    Clusters.prototype.save = function () {
        if (this.props.onSave) {
            this.props.onSave(this.state.newSettings);
        }
    };
    Clusters.prototype.editCluster = function (cluster) {
        window.location.hash += "/" + cluster.name;
    };
    Clusters.prototype.render = function () {
        var _a = this.state, hasChanged = _a.hasChanged, newSettings = _a.newSettings;
        if (!newSettings)
            return null;
        var columns = [
            { label: 'Name', field: 'name', width: 200, cellIcon: 'full-cluster' },
            { label: 'Host', field: 'host', width: 200 },
            { label: 'Strategy', field: 'introspectionStrategy', width: 300 }
        ];
        var actions = [
            { icon: 'full-edit', callback: this.editCluster.bind(this) }
        ];
        return React.createElement("div", {className: "clusters"}, React.createElement("div", {className: "title-bar"}, React.createElement("div", {className: "title"}, "Clusters"), hasChanged ? React.createElement(button_1.Button, {className: "save", title: "Save", type: "primary", onClick: this.save.bind(this)}) : null), React.createElement("div", {className: "content"}, React.createElement(simple_table_1.SimpleTable, {columns: columns, rows: newSettings.clusters, actions: actions, onRowClick: this.editCluster.bind(this)})));
    };
    return Clusters;
}(React.Component));
exports.Clusters = Clusters;
