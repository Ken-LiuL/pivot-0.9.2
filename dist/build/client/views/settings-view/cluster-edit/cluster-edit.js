"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./cluster-edit.css');
var React = require('react');
var dom_1 = require('../../../utils/dom/dom');
var form_label_1 = require('../../../components/form-label/form-label');
var button_1 = require('../../../components/button/button');
var immutable_input_1 = require('../../../components/immutable-input/immutable-input');
var index_1 = require('../../../../common/models/index');
var labels_1 = require('../utils/labels');
// Shamelessly stolen from http://stackoverflow.com/a/10006499
// (well, traded for an upvote)
var IP_REGEX = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
var ClusterEdit = (function (_super) {
    __extends(ClusterEdit, _super);
    function ClusterEdit() {
        _super.call(this);
        this.state = { hasChanged: false, canSave: true, errors: {} };
    }
    ClusterEdit.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.settings) {
            this.initFromProps(nextProps);
        }
    };
    ClusterEdit.prototype.initFromProps = function (props) {
        var cluster = props.settings.clusters.filter(function (d) { return d.name === props.clusterId; })[0];
        this.setState({
            tempCluster: new index_1.Cluster(cluster.valueOf()),
            hasChanged: false,
            canSave: true,
            cluster: cluster,
            errors: {}
        });
    };
    ClusterEdit.prototype.cancel = function () {
        this.initFromProps(this.props);
    };
    ClusterEdit.prototype.save = function () {
        var settings = this.props.settings;
        var _a = this.state, tempCluster = _a.tempCluster, cluster = _a.cluster;
        var newClusters = settings.clusters;
        newClusters[newClusters.indexOf(cluster)] = tempCluster;
        var newSettings = settings.changeClusters(newClusters);
        if (this.props.onSave) {
            this.props.onSave(newSettings);
        }
    };
    ClusterEdit.prototype.goBack = function () {
        var clusterId = this.props.clusterId;
        var hash = window.location.hash;
        window.location.hash = hash.replace("/" + clusterId, '');
    };
    ClusterEdit.prototype.onSimpleChange = function (newCluster, isValid, path) {
        var _a = this.state, cluster = _a.cluster, errors = _a.errors;
        errors[path] = !isValid;
        var hasChanged = !isValid || !cluster.equals(newCluster);
        if (isValid) {
            this.setState({
                tempCluster: newCluster,
                canSave: true,
                errors: errors,
                hasChanged: hasChanged
            });
        }
        else {
            this.setState({
                canSave: false,
                errors: errors,
                hasChanged: hasChanged
            });
        }
    };
    ClusterEdit.prototype.renderGeneral = function () {
        var _a = this.state, tempCluster = _a.tempCluster, errors = _a.errors;
        return React.createElement("form", {className: "general vertical"}, React.createElement(form_label_1.FormLabel, {label: "Host", helpText: labels_1.CLUSTER_EDIT.host.help, errorText: errors.host ? labels_1.CLUSTER_EDIT.host.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: tempCluster, path: 'host', onChange: this.onSimpleChange.bind(this), focusOnStartUp: true, validator: IP_REGEX}), React.createElement(form_label_1.FormLabel, {label: "Timeout", helpText: labels_1.CLUSTER_EDIT.timeout.help, errorText: errors.timeout ? labels_1.CLUSTER_EDIT.timeout.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: tempCluster, path: 'timeout', onChange: this.onSimpleChange.bind(this), validator: /^\d+$/}), React.createElement(form_label_1.FormLabel, {label: "Refresh interval", helpText: labels_1.CLUSTER_EDIT.sourceListRefreshInterval.help, errorText: errors.sourceListRefreshInterval ? labels_1.CLUSTER_EDIT.sourceListRefreshInterval.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: tempCluster, path: 'sourceListRefreshInterval', onChange: this.onSimpleChange.bind(this), validator: /^\d+$/}));
    };
    ClusterEdit.prototype.render = function () {
        var _a = this.state, tempCluster = _a.tempCluster, hasChanged = _a.hasChanged, canSave = _a.canSave;
        if (!tempCluster)
            return null;
        return React.createElement("div", {className: "cluster-edit"}, React.createElement("div", {className: "title-bar"}, React.createElement(button_1.Button, {className: "button back", type: "secondary", svg: require('../../../icons/full-back.svg'), onClick: this.goBack.bind(this)}), React.createElement("div", {className: "title"}, tempCluster.name), hasChanged ? React.createElement("div", {className: "button-group"}, React.createElement(button_1.Button, {className: "cancel", title: "Cancel", type: "secondary", onClick: this.cancel.bind(this)}), React.createElement(button_1.Button, {className: dom_1.classNames("save", { disabled: !canSave }), title: "Save", type: "primary", onClick: this.save.bind(this)})) : null), React.createElement("div", {className: "content"}, this.renderGeneral()));
    };
    return ClusterEdit;
}(React.Component));
exports.ClusterEdit = ClusterEdit;
