"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./data-cubes.css');
var React = require('react');
var button_1 = require('../../../components/button/button');
var index_1 = require('../../../../common/models/index');
var simple_table_1 = require('../../../components/simple-table/simple-table');
var DataCubes = (function (_super) {
    __extends(DataCubes, _super);
    function DataCubes() {
        _super.call(this);
        this.state = {};
    }
    DataCubes.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.settings)
            this.setState({
                newSettings: nextProps.settings
            });
    };
    DataCubes.prototype.editCube = function (cube) {
        window.location.hash += "/" + cube.name;
    };
    DataCubes.prototype.removeCube = function (cube) {
        // var index = this.state.newSettings.dataSources.indexOf(cube);
        // if (index < 0) return;
        // var newCubes = this.state.newSettings.dataSources.splice(index, 1);
        // this.setState({
        //   newSettings: this.state.newSettings.changedDataSources(newCubes)
        // })
    };
    DataCubes.prototype.createCube = function () {
        var dataSources = this.state.newSettings.dataSources;
        dataSources.push(index_1.DataSource.fromJS({
            name: 'new-datacube',
            engine: 'druid',
            source: 'new-source'
        }));
        this.props.onSave(this.state.newSettings.changeDataSources(dataSources), 'Cube added');
    };
    DataCubes.prototype.render = function () {
        var newSettings = this.state.newSettings;
        if (!newSettings)
            return null;
        var columns = [
            { label: 'Name', field: 'title', width: 170, cellIcon: 'full-cube' },
            { label: 'Source', field: 'source', width: 400 },
            { label: 'Dimensions', field: function (cube) { return cube.dimensions.size; }, width: 120 },
            { label: 'Measures', field: function (cube) { return cube.measures.size; }, width: 80 }
        ];
        var actions = [
            { icon: 'full-edit', callback: this.editCube.bind(this) },
            { icon: 'full-remove', callback: this.removeCube.bind(this) }
        ];
        return React.createElement("div", {className: "data-cubes"}, React.createElement("div", {className: "title-bar"}, React.createElement("div", {className: "title"}, "Data Cubes"), React.createElement(button_1.Button, {className: "save", title: "Add a cube", type: "primary", onClick: this.createCube.bind(this)})), React.createElement("div", {className: "content"}, React.createElement(simple_table_1.SimpleTable, {columns: columns, rows: newSettings.dataSources, actions: actions, onRowClick: this.editCube.bind(this)})));
    };
    return DataCubes;
}(React.Component));
exports.DataCubes = DataCubes;
