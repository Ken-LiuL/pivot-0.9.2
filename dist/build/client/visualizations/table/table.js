"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./table.css');
var immutable_1 = require('immutable');
var React = require('react');
var plywood_1 = require('plywood');
var formatter_1 = require('../../../common/utils/formatter/formatter');
var index_1 = require('../../../common/models/index');
var table_1 = require('../../../common/manifests/table/table');
var dom_1 = require('../../utils/dom/dom');
var svg_icon_1 = require('../../components/svg-icon/svg-icon');
var segment_bubble_1 = require('../../components/segment-bubble/segment-bubble');
var scroller_1 = require('../../components/scroller/scroller');
var base_visualization_1 = require('../base-visualization/base-visualization');
var HEADER_HEIGHT = 38;
var SEGMENT_WIDTH = 300;
var INDENT_WIDTH = 25;
var MEASURE_WIDTH = 130;
var ROW_HEIGHT = 30;
var SPACE_LEFT = 10;
var SPACE_RIGHT = 10;
var BODY_PADDING_BOTTOM = 90;
var HIGHLIGHT_BUBBLE_V_OFFSET = -4;
function formatSegment(value) {
    if (plywood_1.TimeRange.isTimeRange(value)) {
        return value.start.toISOString();
    }
    return String(value);
}
function getFilterFromDatum(splits, flatDatum, dataSource) {
    if (flatDatum['__nest'] === 0)
        return null;
    var segments = [];
    while (flatDatum['__nest'] > 0) {
        segments.unshift(flatDatum[splits.get(flatDatum['__nest'] - 1).getDimension(dataSource.dimensions).name]);
        flatDatum = flatDatum['__parent'];
    }
    return new index_1.Filter(immutable_1.List(segments.map(function (segment, i) {
        return new index_1.FilterClause({
            expression: splits.get(i).expression,
            selection: plywood_1.r(plywood_1.TimeRange.isTimeRange(segment) ? segment : plywood_1.Set.fromJS([segment]))
        });
    })));
}
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.call(this);
    }
    Table.prototype.getDefaultState = function () {
        var s = _super.prototype.getDefaultState.call(this);
        s.flatData = null;
        s.hoverRow = null;
        return s;
    };
    Table.prototype.calculateMousePosition = function (x, y) {
        var essence = this.props.essence;
        var flatData = this.state.flatData;
        if (x <= SPACE_LEFT)
            return { what: 'space-left' };
        x -= SPACE_LEFT;
        if (y <= HEADER_HEIGHT) {
            if (x <= SEGMENT_WIDTH)
                return { what: 'corner' };
            x = x - SEGMENT_WIDTH;
            var measureWidth = this.getIdealMeasureWidth(this.props.essence);
            var measureIndex = Math.floor(x / measureWidth);
            var measure = essence.getEffectiveMeasures().get(measureIndex);
            if (!measure)
                return { what: 'whitespace' };
            return { what: 'header', measure: measure };
        }
        y = y - HEADER_HEIGHT;
        var rowIndex = Math.floor(y / ROW_HEIGHT);
        var datum = flatData ? flatData[rowIndex] : null;
        if (!datum)
            return { what: 'whitespace' };
        return { what: 'row', row: datum };
    };
    Table.prototype.onClick = function (x, y) {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        var splits = essence.splits, dataSource = essence.dataSource;
        var pos = this.calculateMousePosition(x, y);
        var splitDimension = splits.get(0).getDimension(dataSource.dimensions);
        if (pos.what === 'corner' || pos.what === 'header') {
            var sortExpression = plywood_1.$(pos.what === 'corner' ? splitDimension.name : pos.measure.name);
            var commonSort = essence.getCommonSort();
            var myDescending = (commonSort && commonSort.expression.equals(sortExpression) && commonSort.direction === plywood_1.SortAction.DESCENDING);
            clicker.changeSplits(essence.splits.changeSortAction(new plywood_1.SortAction({
                expression: sortExpression,
                direction: myDescending ? plywood_1.SortAction.ASCENDING : plywood_1.SortAction.DESCENDING
            })), index_1.VisStrategy.KeepAlways);
        }
        else if (pos.what === 'row') {
            var rowHighlight = getFilterFromDatum(essence.splits, pos.row, dataSource);
            if (!rowHighlight)
                return;
            if (essence.highlightOn(Table.id)) {
                if (rowHighlight.equals(essence.highlight.delta)) {
                    clicker.dropHighlight();
                    return;
                }
            }
            clicker.changeHighlight(Table.id, null, rowHighlight);
        }
    };
    Table.prototype.onMouseMove = function (x, y) {
        var _a = this.state, hoverMeasure = _a.hoverMeasure, hoverRow = _a.hoverRow;
        var pos = this.calculateMousePosition(x, y);
        if (hoverMeasure !== pos.measure || hoverRow !== pos.row) {
            this.setState({
                hoverMeasure: pos.measure,
                hoverRow: pos.row
            });
        }
    };
    Table.prototype.onMouseLeave = function () {
        var _a = this.state, hoverMeasure = _a.hoverMeasure, hoverRow = _a.hoverRow;
        if (hoverMeasure || hoverRow) {
            this.setState({
                hoverMeasure: null,
                hoverRow: null
            });
        }
    };
    Table.prototype.precalculate = function (props, datasetLoad) {
        if (datasetLoad === void 0) { datasetLoad = null; }
        var registerDownloadableDataset = props.registerDownloadableDataset, essence = props.essence;
        var splits = essence.splits;
        var existingDatasetLoad = this.state.datasetLoad;
        var newState = {};
        if (datasetLoad) {
            // Always keep the old dataset while loading (for now)
            if (datasetLoad.loading)
                datasetLoad.dataset = existingDatasetLoad.dataset;
            newState.datasetLoad = datasetLoad;
        }
        else {
            datasetLoad = this.state.datasetLoad;
        }
        var dataset = datasetLoad.dataset;
        if (dataset && splits.length()) {
            if (registerDownloadableDataset)
                registerDownloadableDataset(dataset);
            newState.flatData = dataset.flatten({
                order: 'preorder',
                nestingName: '__nest',
                parentName: '__parent'
            });
        }
        this.setState(newState);
    };
    Table.prototype.getScalesForColumns = function (essence, flatData) {
        var measuresArray = essence.getEffectiveMeasures().toArray();
        var splitLength = essence.splits.length();
        return measuresArray.map(function (measure) {
            var measureValues = flatData
                .filter(function (d) { return d['__nest'] === splitLength; })
                .map(function (d) { return d[measure.name]; });
            // Ensure that 0 is in there
            measureValues.push(0);
            return d3.scale.linear()
                .domain(d3.extent(measureValues))
                .range([0, 100]); // really those are percents
        });
    };
    Table.prototype.getFormattersFromMeasures = function (essence, flatData) {
        var measuresArray = essence.getEffectiveMeasures().toArray();
        return measuresArray.map(function (measure) {
            var measureName = measure.name;
            var measureValues = flatData.map(function (d) { return d[measureName]; });
            return formatter_1.formatterFromData(measureValues, measure.format);
        });
    };
    Table.prototype.getIdealMeasureWidth = function (essence) {
        var availableWidth = this.props.stage.width - SPACE_LEFT - SEGMENT_WIDTH;
        var columnsCount = essence.getEffectiveMeasures().size;
        return columnsCount * MEASURE_WIDTH >= availableWidth ? MEASURE_WIDTH : availableWidth / columnsCount;
    };
    Table.prototype.makeMeasuresRenderer = function (essence, formatters, hScales) {
        var measuresArray = essence.getEffectiveMeasures().toArray();
        var idealWidth = this.getIdealMeasureWidth(essence);
        var splitLength = essence.splits.length();
        var isSingleMeasure = measuresArray.length === 1;
        var className = dom_1.classNames('measure', { 'all-alone': !!isSingleMeasure });
        return function (datum) {
            return measuresArray.map(function (measure, i) {
                var measureValue = datum[measure.name];
                var measureValueStr = formatters[i](measureValue);
                var background = null;
                if (datum['__nest'] === splitLength) {
                    var backgroundWidth = hScales[i](measureValue);
                    background = React.createElement("div", {className: "background-container"}, React.createElement("div", {className: "background", style: { width: backgroundWidth + '%' }}));
                }
                return React.createElement("div", {className: className, key: measure.name, style: { width: idealWidth }}, background, React.createElement("div", {className: "label"}, measureValueStr));
            });
        };
    };
    Table.prototype.renderRow = function (index, rowMeasures, style, rowClass) {
        return React.createElement("div", {className: 'row ' + rowClass, key: '_' + index, style: style}, rowMeasures);
    };
    Table.prototype.renderHeaderColumns = function (essence, hoverMeasure, measureWidth) {
        var commonSort = essence.getCommonSort();
        var commonSortName = commonSort ? commonSort.expression.name : null;
        var sortArrowIcon = commonSort ? React.createElement(svg_icon_1.SvgIcon, {
            svg: require('../../icons/sort-arrow.svg'),
            className: 'sort-arrow ' + commonSort.direction
        }) : null;
        return essence.getEffectiveMeasures().toArray().map(function (measure, i) {
            var amISorted = commonSortName === measure.name;
            return React.createElement("div", {className: dom_1.classNames('measure-name', { hover: measure === hoverMeasure, sorted: amISorted }), key: measure.name, style: { width: measureWidth }}, React.createElement("div", {className: "title-wrap"}, measure.title), amISorted ? sortArrowIcon : null);
        });
    };
    Table.prototype.renderCornerSortArrow = function (essence) {
        var commonSort = essence.getCommonSort();
        if (!commonSort) {
            return null;
        }
        var splits = essence.splits, dataSource = essence.dataSource;
        var splitDimension = splits.get(0).getDimension(dataSource.dimensions);
        if (commonSort.expression.name === splitDimension.name) {
            return React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/sort-arrow.svg'), className: 'sort-arrow ' + commonSort.direction});
        }
        return null;
    };
    Table.prototype.onSimpleScroll = function (scrollTop, scrollLeft) {
        this.setState({ scrollLeft: scrollLeft, scrollTop: scrollTop });
    };
    Table.prototype.getVisibleIndices = function (rowCount, height) {
        var scrollTop = this.state.scrollTop;
        return [
            Math.max(0, Math.floor(scrollTop / ROW_HEIGHT)),
            Math.min(rowCount, Math.ceil((scrollTop + height) / ROW_HEIGHT))
        ];
    };
    Table.prototype.renderInternals = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, stage = _a.stage, openRawDataModal = _a.openRawDataModal;
        var _b = this.state, flatData = _b.flatData, scrollTop = _b.scrollTop, hoverMeasure = _b.hoverMeasure, hoverRow = _b.hoverRow;
        var splits = essence.splits, dataSource = essence.dataSource;
        var segmentTitle = splits.getTitle(essence.dataSource.dimensions);
        var cornerSortArrow = this.renderCornerSortArrow(essence);
        var idealWidth = this.getIdealMeasureWidth(essence);
        var headerColumns = this.renderHeaderColumns(essence, hoverMeasure, idealWidth);
        var rowWidth = idealWidth * headerColumns.length;
        var segments = [];
        var rows = [];
        var highlighter = null;
        var highlighterStyle = null;
        var highlightBubble = null;
        if (flatData) {
            var formatters = this.getFormattersFromMeasures(essence, flatData);
            var hScales = this.getScalesForColumns(essence, flatData);
            var highlightDelta = null;
            if (essence.highlightOn(Table.id)) {
                highlightDelta = essence.highlight.delta;
            }
            var _c = this.getVisibleIndices(flatData.length, stage.height), skipNumber = _c[0], lastElementToShow = _c[1];
            var measuresRenderer = this.makeMeasuresRenderer(essence, formatters, hScales);
            var rowY = skipNumber * ROW_HEIGHT;
            for (var i = skipNumber; i < lastElementToShow; i++) {
                var d = flatData[i];
                var nest = d['__nest'];
                var split = nest > 0 ? splits.get(nest - 1) : null;
                var dimension = split ? split.getDimension(dataSource.dimensions) : null;
                var segmentValue = dimension ? d[dimension.name] : '';
                var segmentName = nest ? formatSegment(segmentValue) : 'Total';
                var left = Math.max(0, nest - 1) * INDENT_WIDTH;
                var segmentStyle = { left: left, width: SEGMENT_WIDTH - left, top: rowY };
                var hoverClass = d === hoverRow ? 'hover' : null;
                var selected = false;
                var selectedClass = '';
                if (highlightDelta) {
                    selected = highlightDelta.equals(getFilterFromDatum(splits, d, dataSource));
                    selectedClass = selected ? 'selected' : 'not-selected';
                }
                var nestClass = "nest" + nest;
                segments.push(React.createElement("div", {className: dom_1.classNames('segment', nestClass, selectedClass, hoverClass), key: '_' + i, style: segmentStyle}, segmentName));
                var rowMeasures = measuresRenderer(d);
                var rowClass = dom_1.classNames(nestClass, selectedClass, hoverClass);
                var rowStyle = { top: rowY, width: rowWidth };
                rows.push(this.renderRow(i, rowMeasures, rowStyle, rowClass));
                if (!highlighter && selected) {
                    highlighterStyle = {
                        top: rowY - scrollTop,
                        left: left
                    };
                    var dimension = essence.dataSource.getDimensionByExpression(splits.splitCombines.get(nest - 1).expression);
                    highlighter = React.createElement("div", {className: 'highlighter', key: 'highlight', style: highlighterStyle});
                    highlightBubble = React.createElement(segment_bubble_1.SegmentBubble, {left: stage.x + stage.width / 2, top: stage.y + HEADER_HEIGHT + rowY - scrollTop - HIGHLIGHT_BUBBLE_V_OFFSET, segmentLabel: segmentName, dimension: dimension, clicker: clicker, openRawDataModal: openRawDataModal});
                }
                rowY += ROW_HEIGHT;
            }
        }
        var measureWidth = this.getIdealMeasureWidth(essence);
        var segmentLabels = React.createElement("div", {className: "segment-labels"}, segments);
        // added extra wrapping div for pin full and single parent
        var overlay = React.createElement("div", {className: "highlight-cont"}, React.createElement("div", {className: "highlight"}, highlighter));
        var corner = React.createElement("div", {className: "corner"}, React.createElement("div", {className: "corner-wrap"}, segmentTitle), cornerSortArrow);
        var scrollerLayout = {
            // Inner dimensions
            bodyWidth: measureWidth * essence.getEffectiveMeasures().size + SPACE_RIGHT,
            bodyHeight: flatData ? flatData.length * ROW_HEIGHT : 0,
            // Gutters
            top: HEADER_HEIGHT,
            right: 0,
            bottom: 0,
            left: SEGMENT_WIDTH
        };
        return React.createElement("div", {className: "internals table-inner"}, React.createElement(scroller_1.Scroller, {ref: "scroller", layout: scrollerLayout, topGutter: headerColumns, leftGutter: segmentLabels, topLeftCorner: corner, body: rows, overlay: overlay, onClick: this.onClick.bind(this), onMouseMove: this.onMouseMove.bind(this), onMouseLeave: this.onMouseLeave.bind(this), onScroll: this.onSimpleScroll.bind(this)}), highlightBubble);
    };
    Table.id = table_1.TABLE_MANIFEST.name;
    return Table;
}(base_visualization_1.BaseVisualization));
exports.Table = Table;
