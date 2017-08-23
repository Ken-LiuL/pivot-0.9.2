"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./data-cube-edit.css');
var React = require('react');
var dom_1 = require('../../../utils/dom/dom');
var form_label_1 = require('../../../components/form-label/form-label');
var button_1 = require('../../../components/button/button');
var immutable_input_1 = require('../../../components/immutable-input/immutable-input');
var immutable_list_1 = require('../../../components/immutable-list/immutable-list');
var dimension_modal_1 = require('../dimension-modal/dimension-modal');
var measure_modal_1 = require('../measure-modal/measure-modal');
var index_1 = require('../../../../common/models/index');
var labels_1 = require('../utils/labels');
var DataCubeEdit = (function (_super) {
    __extends(DataCubeEdit, _super);
    function DataCubeEdit() {
        _super.call(this);
        this.tabs = [
            { label: 'General', value: 'general', render: this.renderGeneral },
            { label: 'Dimensions', value: 'dimensions', render: this.renderDimensions },
            { label: 'Measures', value: 'measures', render: this.renderMeasures }
        ];
        this.state = { hasChanged: false, errors: {} };
    }
    DataCubeEdit.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.settings) {
            this.initFromProps(nextProps);
        }
    };
    DataCubeEdit.prototype.initFromProps = function (props) {
        var cube = props.settings.dataSources.filter(function (d) { return d.name === props.cubeId; })[0];
        this.setState({
            tempCube: cube,
            hasChanged: false,
            canSave: true,
            cube: cube,
            tab: this.tabs.filter(function (tab) { return tab.value === props.tab; })[0]
        });
    };
    DataCubeEdit.prototype.selectTab = function (tab) {
        var hash = window.location.hash.split('/');
        hash.splice(-1);
        window.location.hash = hash.join('/') + '/' + tab;
    };
    DataCubeEdit.prototype.renderTabs = function (activeTab) {
        var _this = this;
        return this.tabs.map(function (_a) {
            var label = _a.label, value = _a.value;
            return React.createElement("button", {className: dom_1.classNames({ active: activeTab.value === value }), key: value, onClick: _this.selectTab.bind(_this, value)}, label);
        });
    };
    DataCubeEdit.prototype.cancel = function () {
        this.initFromProps(this.props);
    };
    DataCubeEdit.prototype.save = function () {
        var settings = this.props.settings;
        var _a = this.state, tempCube = _a.tempCube, cube = _a.cube;
        var newCubes = settings.dataSources;
        newCubes[newCubes.indexOf(cube)] = tempCube;
        var newSettings = settings.changeDataSources(newCubes);
        if (this.props.onSave) {
            this.props.onSave(newSettings);
        }
    };
    DataCubeEdit.prototype.goBack = function () {
        var _a = this.props, cubeId = _a.cubeId, tab = _a.tab;
        var hash = window.location.hash;
        window.location.hash = hash.replace("/" + cubeId + "/" + tab, '');
    };
    DataCubeEdit.prototype.onSimpleChange = function (newCube, isValid, path) {
        var _a = this.state, cube = _a.cube, errors = _a.errors;
        errors[path] = !isValid;
        var hasChanged = !isValid || !cube.equals(newCube);
        if (isValid) {
            this.setState({
                tempCube: newCube,
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
    DataCubeEdit.prototype.renderGeneral = function () {
        var helpTexts = {};
        var _a = this.state, tempCube = _a.tempCube, errors = _a.errors;
        return React.createElement("form", {className: "general vertical"}, React.createElement(form_label_1.FormLabel, {label: "Title", helpText: labels_1.CUBE_EDIT.title.help, errorText: errors.title ? labels_1.CUBE_EDIT.title.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: tempCube, path: 'title', onChange: this.onSimpleChange.bind(this), validator: /^.+$/}), React.createElement(form_label_1.FormLabel, {label: "Engine", helpText: labels_1.CUBE_EDIT.engine.help, errorText: errors.engine ? labels_1.CUBE_EDIT.engine.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: tempCube, path: 'engine', onChange: this.onSimpleChange.bind(this), validator: /^.+$/}), React.createElement(form_label_1.FormLabel, {label: "Source", helpText: labels_1.CUBE_EDIT.source.help, errorText: errors.source ? labels_1.CUBE_EDIT.source.error : undefined}), React.createElement(immutable_input_1.ImmutableInput, {instance: tempCube, path: 'source', onChange: this.onSimpleChange.bind(this), validator: /^.+$/}));
    };
    DataCubeEdit.prototype.renderDimensions = function () {
        var _this = this;
        var tempCube = this.state.tempCube;
        var onChange = function (newDimensions) {
            var newCube = tempCube.changeDimensions(newDimensions);
            _this.setState({
                tempCube: newCube,
                hasChanged: !_this.state.cube.equals(newCube)
            });
        };
        var getModal = function (item) { return React.createElement(dimension_modal_1.DimensionModal, {dimension: item}); };
        var getNewItem = function (name) { return index_1.Dimension.fromJS({ name: name }); };
        var getRows = function (items) { return items.toArray().map(function (dimension) {
            return {
                title: dimension.title,
                description: dimension.expression.toString(),
                icon: "dim-" + dimension.kind
            };
        }); };
        var DimensionsList = immutable_list_1.ImmutableList.specialize();
        return React.createElement(DimensionsList, {items: tempCube.dimensions, onChange: onChange.bind(this), getModal: getModal, getNewItem: getNewItem, getRows: getRows});
    };
    DataCubeEdit.prototype.renderMeasures = function () {
        var _this = this;
        var tempCube = this.state.tempCube;
        var onChange = function (newMeasures) {
            var newCube = tempCube.changeMeasures(newMeasures);
            _this.setState({
                tempCube: newCube,
                hasChanged: !_this.state.cube.equals(newCube)
            });
        };
        var getModal = function (item) { return React.createElement(measure_modal_1.MeasureModal, {measure: item}); };
        var getNewItem = function (name) { return index_1.Measure.fromJS({ name: name }); };
        var getRows = function (items) { return items.toArray().map(function (measure) {
            return {
                title: measure.title,
                description: measure.expression.toString()
            };
        }); };
        var MeasuresList = immutable_list_1.ImmutableList.specialize();
        return React.createElement(MeasuresList, {items: tempCube.measures, onChange: onChange.bind(this), getModal: getModal, getNewItem: getNewItem, getRows: getRows});
    };
    DataCubeEdit.prototype.render = function () {
        var _a = this.state, tempCube = _a.tempCube, tab = _a.tab, hasChanged = _a.hasChanged, cube = _a.cube, canSave = _a.canSave;
        if (!tempCube || !tab || !cube)
            return null;
        return React.createElement("div", {className: "data-cube-edit"}, React.createElement("div", {className: "title-bar"}, React.createElement(button_1.Button, {className: "button back", type: "secondary", svg: require('../../../icons/full-back.svg'), onClick: this.goBack.bind(this)}), React.createElement("div", {className: "title"}, cube.title), hasChanged ? React.createElement("div", {className: "button-group"}, React.createElement(button_1.Button, {className: "cancel", title: "Cancel", type: "secondary", onClick: this.cancel.bind(this)}), React.createElement(button_1.Button, {className: dom_1.classNames("save", { disabled: !canSave }), title: "Save", type: "primary", onClick: this.save.bind(this)})) : null), React.createElement("div", {className: "content"}, React.createElement("div", {className: "tabs"}, this.renderTabs(tab)), React.createElement("div", {className: "tab-content"}, tab.render.bind(this)())));
    };
    return DataCubeEdit;
}(React.Component));
exports.DataCubeEdit = DataCubeEdit;
