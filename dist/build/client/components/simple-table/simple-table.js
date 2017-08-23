"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./simple-table.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var scroller_1 = require('../scroller/scroller');
var ROW_HEIGHT = 42;
var HEADER_HEIGHT = 26;
var ACTION_WIDTH = 30;
var SimpleTable = (function (_super) {
    __extends(SimpleTable, _super);
    function SimpleTable() {
        _super.call(this);
        this.state = {};
    }
    SimpleTable.prototype.renderHeaders = function (columns, sortColumn, sortAscending) {
        var items = [];
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            var icon = null;
            if (sortColumn && sortColumn === column) {
                icon = React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/sort-arrow.svg'), className: "sort-arrow " + (sortAscending ? 'ascending' : 'descending')});
            }
            items.push(React.createElement("div", {className: "header", style: { width: column.width }, key: "column-" + i}, column.label, icon));
        }
        return React.createElement("div", {className: "column-headers"}, items);
    };
    SimpleTable.prototype.getIcons = function (row, actions) {
        if (!actions || !actions.length)
            return null;
        var items = [];
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            items.push(React.createElement("div", {className: 'cell action', key: "action-" + i, onClick: action.callback.bind(this, row)}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: require("../../icons/" + action.icon + ".svg")})));
        }
        return items;
    };
    SimpleTable.prototype.labelizer = function (column) {
        if (typeof column.field === 'string') {
            return function (row) { return row[column.field]; };
        }
        return column.field;
    };
    SimpleTable.prototype.renderRow = function (row, columns, index) {
        var items = [];
        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            var icon = col.cellIcon ? React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: require("../../icons/" + col.cellIcon + ".svg")}) : null;
            items.push(React.createElement("div", {className: dom_1.classNames('cell', { 'has-icon': !!col.cellIcon }), style: { width: col.width }, key: "cell-" + i}, icon, this.labelizer(col)(row)));
        }
        return React.createElement("div", {className: "row", key: "row-" + index, style: { height: ROW_HEIGHT }}, items);
    };
    SimpleTable.prototype.sortRows = function (rows, sortColumn, sortAscending) {
        if (!sortColumn)
            return rows;
        var labelize = this.labelizer(sortColumn);
        if (sortAscending) {
            return rows.sort(function (a, b) {
                if (labelize(a) < labelize(b)) {
                    return -1;
                }
                else if (labelize(a) > labelize(b)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        return rows.sort(function (a, b) {
            if (labelize(a) < labelize(b)) {
                return 1;
            }
            else if (labelize(a) > labelize(b)) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    SimpleTable.prototype.renderRows = function (rows, columns, sortColumn, sortAscending) {
        if (!rows || !rows.length)
            return null;
        rows = this.sortRows(rows, sortColumn, sortAscending);
        var items = [];
        for (var i = 0; i < rows.length; i++) {
            items.push(this.renderRow(rows[i], columns, i));
        }
        return items;
    };
    SimpleTable.prototype.getLayout = function (columns, rows, actions) {
        var width = columns.reduce(function (a, b) { return a + b.width; }, 0);
        var directActionsCount = actions.filter(function (a) { return !a.inEllipsis; }).length;
        var indirectActionsCount = directActionsCount !== actions.length ? 1 : 0;
        return {
            // Inner dimensions
            bodyWidth: width,
            bodyHeight: rows.length * ROW_HEIGHT,
            // Gutters
            top: HEADER_HEIGHT,
            right: directActionsCount * 30 + indirectActionsCount * 30,
            bottom: 0,
            left: 0
        };
    };
    SimpleTable.prototype.getDirectActions = function (actions) {
        return actions.filter(function (action) { return !action.inEllipsis; });
    };
    SimpleTable.prototype.renderActions = function (rows, actions) {
        var directActions = this.getDirectActions(actions);
        var generator = function (row, i) {
            var icons = directActions.map(function (action, i) {
                return React.createElement("div", {className: "icon", key: "icon-" + i, style: { width: ACTION_WIDTH }}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: require("../../icons/" + action.icon + ".svg")}));
            });
            return React.createElement("div", {className: "row action", key: "action-" + i, style: { height: ROW_HEIGHT }}, icons);
        };
        return rows.map(generator);
    };
    SimpleTable.prototype.onClick = function (x, y) {
        var _a = this.props, columns = _a.columns, rows = _a.rows, actions = _a.actions;
        var headerWidth = columns.reduce(function (a, b) { return a + b.width; }, 0);
        var columnIndex = -1; // -1 means right gutter
        var rowIndex = -1; // -1 means header
        // Not in the right gutter
        if (x < headerWidth) {
            columnIndex = 0;
            while ((x -= columns[columnIndex].width) > 0)
                columnIndex++;
        }
        // Not in the header
        if (y > HEADER_HEIGHT) {
            rowIndex = Math.floor((y - HEADER_HEIGHT) / ROW_HEIGHT);
        }
        // Corner
        if (rowIndex === -1 && columnIndex === -1)
            return;
        // Right gutter
        if (columnIndex === -1) {
            var action = actions[Math.floor((x - headerWidth) / ACTION_WIDTH)];
            if (action)
                this.onActionClick(action, rows[rowIndex]);
            return;
        }
        // Header
        if (rowIndex === -1) {
            this.onHeaderClick(columns[columnIndex]);
            return;
        }
        this.onCellClick(rows[rowIndex], columns[columnIndex]);
    };
    SimpleTable.prototype.onCellClick = function (row, column) {
        if (this.props.onRowClick && row) {
            this.props.onRowClick(row);
        }
    };
    SimpleTable.prototype.onHeaderClick = function (column) {
        this.setState({
            sortColumn: column,
            sortAscending: this.state.sortColumn === column ? !this.state.sortAscending : true
        });
    };
    SimpleTable.prototype.onActionClick = function (action, row) {
        action.callback(row);
    };
    SimpleTable.prototype.render = function () {
        var _a = this.props, columns = _a.columns, rows = _a.rows, actions = _a.actions;
        var _b = this.state, sortColumn = _b.sortColumn, sortAscending = _b.sortAscending;
        if (!columns)
            return null;
        return React.createElement("div", {className: "simple-table"}, React.createElement(scroller_1.Scroller, {ref: "scroller", layout: this.getLayout(columns, rows, actions), topRightCorner: React.createElement("div", null), topGutter: this.renderHeaders(columns, sortColumn, sortAscending), rightGutter: this.renderActions(rows, actions), body: this.renderRows(rows, columns, sortColumn, sortAscending), onClick: this.onClick.bind(this)}));
    };
    return SimpleTable;
}(React.Component));
exports.SimpleTable = SimpleTable;
