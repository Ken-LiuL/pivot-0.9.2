webpackJsonp([5],{

/***/ 497:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(498);
	var React = __webpack_require__(5);
	var ReactDOM = __webpack_require__(42);
	var plywood_1 = __webpack_require__(189);
	var index_1 = __webpack_require__(193);
	var general_1 = __webpack_require__(198);
	var download_1 = __webpack_require__(393);
	var formatter_1 = __webpack_require__(281);
	var dom_1 = __webpack_require__(254);
	var sizing_1 = __webpack_require__(500);
	var constants_1 = __webpack_require__(236);
	var modal_1 = __webpack_require__(501);
	var button_1 = __webpack_require__(341);
	var scroller_1 = __webpack_require__(345);
	var loader_1 = __webpack_require__(173);
	var query_error_1 = __webpack_require__(289);
	var HEADER_HEIGHT = 30;
	var ROW_HEIGHT = 30;
	var LIMIT = 100;
	var TIME_COL_WIDTH = 180;
	var BOOLEAN_COL_WIDTH = 100;
	var NUMBER_COL_WIDTH = 100;
	var DEFAULT_COL_WIDTH = 200;
	function getColumnWidth(attribute) {
	    switch (attribute.type) {
	        case 'BOOLEAN':
	            return BOOLEAN_COL_WIDTH;
	        case 'NUMBER':
	            return NUMBER_COL_WIDTH;
	        case 'TIME':
	            return TIME_COL_WIDTH;
	        default:
	            return DEFAULT_COL_WIDTH;
	    }
	}
	function classFromAttribute(attribute) {
	    return dom_1.classNames(String(attribute.type).toLowerCase().replace(/\//g, '-'), { unsplitable: attribute.unsplitable });
	}
	var RawDataModal = (function (_super) {
	    __extends(RawDataModal, _super);
	    function RawDataModal() {
	        _super.call(this);
	        this.state = {
	            loading: false,
	            dataset: null,
	            scrollLeft: 0,
	            scrollTop: 0,
	            error: null,
	            stage: null
	        };
	        this.globalResizeListener = this.globalResizeListener.bind(this);
	    }
	    RawDataModal.prototype.componentDidMount = function () {
	        this.mounted = true;
	        var essence = this.props.essence;
	        this.fetchData(essence);
	        this.globalResizeListener();
	    };
	    RawDataModal.prototype.componentWillUnmount = function () {
	        this.mounted = false;
	    };
	    RawDataModal.prototype.fetchData = function (essence) {
	        var _this = this;
	        var dataSource = essence.dataSource;
	        var $main = plywood_1.$('main');
	        var query = $main.filter(essence.getEffectiveFilter().toExpression()).limit(LIMIT);
	        this.setState({ loading: true });
	        dataSource.executor(query, { timezone: essence.timezone })
	            .then(function (dataset) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                dataset: dataset,
	                loading: false
	            });
	        }, function (error) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                error: error,
	                loading: false
	            });
	        });
	    };
	    RawDataModal.prototype.globalResizeListener = function () {
	        var table = this.refs.table;
	        var tableDOM = ReactDOM.findDOMNode(table);
	        if (!tableDOM)
	            return;
	        this.setState({
	            stage: index_1.Stage.fromClientRect(tableDOM.getBoundingClientRect())
	        });
	    };
	    RawDataModal.prototype.onScroll = function (scrollTop, scrollLeft) {
	        this.setState({ scrollLeft: scrollLeft, scrollTop: scrollTop });
	    };
	    RawDataModal.prototype.getStringifiedFilters = function () {
	        var essence = this.props.essence;
	        var dataSource = essence.dataSource;
	        return essence.getEffectiveFilter().clauses.map(function (clause, i) {
	            var dimension = dataSource.getDimensionByExpression(clause.expression);
	            if (!dimension)
	                return null;
	            var evaluatedClause = dimension.kind === 'time' ? essence.evaluateClause(clause) : clause;
	            return formatter_1.formatFilterClause(dimension, evaluatedClause, essence.timezone);
	        }).toList();
	    };
	    RawDataModal.prototype.getSortedAttributes = function (dataSource) {
	        var timeAttributeName = dataSource.timeAttribute ? dataSource.timeAttribute.name : null;
	        var attributeRank = function (attribute) {
	            var name = attribute.name;
	            if (name === timeAttributeName) {
	                return 1;
	            }
	            else if (attribute.unsplitable) {
	                return 3;
	            }
	            else {
	                return 2;
	            }
	        };
	        return dataSource.attributes.sort(function (a1, a2) {
	            var score1 = attributeRank(a1);
	            var score2 = attributeRank(a2);
	            if (score1 === score2) {
	                return a1.name.toLowerCase().localeCompare(a2.name.toLowerCase());
	            }
	            return score1 - score2;
	        });
	    };
	    RawDataModal.prototype.renderFilters = function () {
	        var filters = this.getStringifiedFilters().map(function (filter, i) {
	            return React.createElement("li", {className: "filter", key: i}, filter);
	        }).toList();
	        var limit = React.createElement("li", {className: "limit", key: "limit"}, "First ", LIMIT, " events matching ");
	        return filters.unshift(limit);
	    };
	    RawDataModal.prototype.renderHeader = function () {
	        var essence = this.props.essence;
	        var dataset = this.state.dataset;
	        if (!dataset)
	            return null;
	        var dataSource = essence.dataSource;
	        var attributes = this.getSortedAttributes(dataSource);
	        return attributes.map(function (attribute, i) {
	            var name = attribute.name;
	            var width = getColumnWidth(attribute);
	            var style = { width: width };
	            var key = name;
	            return (React.createElement("div", {className: dom_1.classNames("header-cell", classFromAttribute(attribute)), style: style, key: i}, React.createElement("div", {className: "title-wrap"}, general_1.makeTitle(key))));
	        });
	    };
	    RawDataModal.prototype.getVisibleIndices = function (rowCount, height) {
	        var scrollTop = this.state.scrollTop;
	        return [
	            Math.max(0, Math.floor(scrollTop / ROW_HEIGHT)),
	            Math.min(rowCount, Math.ceil((scrollTop + height) / ROW_HEIGHT))
	        ];
	    };
	    RawDataModal.prototype.renderRows = function () {
	        var essence = this.props.essence;
	        var _a = this.state, dataset = _a.dataset, scrollLeft = _a.scrollLeft, stage = _a.stage;
	        if (!dataset)
	            return null;
	        var dataSource = essence.dataSource;
	        var rawData = dataset.data;
	        var _b = this.getVisibleIndices(rawData.length, stage.height), firstRowToShow = _b[0], lastRowToShow = _b[1];
	        var rows = rawData.slice(firstRowToShow, lastRowToShow);
	        var attributes = this.getSortedAttributes(dataSource);
	        var attributeWidths = attributes.map(getColumnWidth);
	        var _c = sizing_1.getVisibleSegments(attributeWidths, scrollLeft, stage.width), startIndex = _c.startIndex, shownColumns = _c.shownColumns;
	        var leftOffset = general_1.arraySum(attributeWidths.slice(0, startIndex));
	        attributes = attributes.slice(startIndex, startIndex + shownColumns);
	        var rowY = firstRowToShow * ROW_HEIGHT;
	        return rows.map(function (datum, i) {
	            var cols = [];
	            attributes.forEach(function (attribute) {
	                var name = attribute.name;
	                var value = datum[name];
	                var colStyle = {
	                    width: getColumnWidth(attribute)
	                };
	                var displayValue = value;
	                if (plywood_1.isDate(datum[name])) {
	                    displayValue = datum[name].toISOString();
	                }
	                cols.push(React.createElement("div", {className: dom_1.classNames('cell', classFromAttribute(attribute)), key: name, style: colStyle}, React.createElement("span", {className: "cell-value"}, String(displayValue))));
	            });
	            var rowStyle = { top: rowY, left: leftOffset };
	            rowY += ROW_HEIGHT;
	            return React.createElement("div", {className: "row", style: rowStyle, key: i}, cols);
	        });
	    };
	    RawDataModal.prototype.render = function () {
	        var _a = this.props, essence = _a.essence, onClose = _a.onClose;
	        var _b = this.state, dataset = _b.dataset, loading = _b.loading, error = _b.error;
	        var dataSource = essence.dataSource;
	        var title = general_1.makeTitle(constants_1.STRINGS.segment) + " " + constants_1.STRINGS.rawData;
	        var filtersString = essence.getEffectiveFilter().getFileString(dataSource.timeAttribute);
	        var scrollerLayout = {
	            // Inner dimensions
	            bodyWidth: general_1.arraySum(dataSource.attributes.map(getColumnWidth)),
	            bodyHeight: (dataset ? dataset.data.length : 0) * ROW_HEIGHT,
	            // Gutters
	            top: HEADER_HEIGHT,
	            right: 0,
	            bottom: 0,
	            left: 0
	        };
	        return React.createElement(modal_1.Modal, {className: "raw-data-modal", title: title, onClose: onClose}, React.createElement("div", {className: "content"}, React.createElement("ul", {className: "filters"}, this.renderFilters()), React.createElement(scroller_1.Scroller, {ref: "table", layout: scrollerLayout, topGutter: this.renderHeader(), body: this.renderRows(), onScroll: this.onScroll.bind(this)}), error ? React.createElement(query_error_1.QueryError, {error: error}) : null, loading ? React.createElement(loader_1.Loader, null) : null, React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", className: "close", onClick: onClose, title: constants_1.STRINGS.close}), React.createElement(button_1.Button, {type: "secondary", className: "download", onClick: download_1.download.bind(this, dataset, download_1.makeFileName(dataSource.name, filtersString, 'raw'), 'csv'), title: constants_1.STRINGS.download, disabled: Boolean(loading || error)}))));
	    };
	    return RawDataModal;
	}(React.Component));
	exports.RawDataModal = RawDataModal;


/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(499);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./raw-data-modal.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./raw-data-modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 499:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".raw-data-modal .content{position:absolute;top:60px;bottom:0;left:0;right:0;left:18px;right:18px;overflow:hidden}.raw-data-modal .content .filters{position:absolute;top:0;bottom:0;left:0;right:0;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;height:30px;color:#999}.raw-data-modal .content .filters .limit,.raw-data-modal .content .filters .filter{font-size:13px;height:30px;display:inline}.raw-data-modal .content .filters .filter:not(:last-child)::after{content:'; '}.raw-data-modal .content .scroller{position:absolute;top:30px;bottom:66px;left:0;right:0;border:1px solid #dedede;cursor:auto}.raw-data-modal .content .scroller .row{height:30px;position:absolute;border-bottom:1px solid #dedede}.raw-data-modal .content .scroller .header-cell,.raw-data-modal .content .scroller .cell{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:inline-block;height:100%;border-right:1px solid #dedede;padding-left:6px;padding-right:6px;padding-top:8px}.raw-data-modal .content .scroller .header-cell.unsplitable,.raw-data-modal .content .scroller .cell.unsplitable{background:#f5f5f5}.raw-data-modal .content .scroller .header-cell{background:#f5f5f5;height:30px;border-bottom:1px solid #dedede}.raw-data-modal .content .scroller .header-cell .title-wrap{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:inline-block;width:100%;height:100%}.raw-data-modal .content .loader,.raw-data-modal .content .query-error{position:absolute;top:0;bottom:0;left:0;right:0}.raw-data-modal .content .button-bar{position:absolute;left:0;right:0;bottom:18px}.raw-data-modal .content .button-bar .close{margin-right:8px}\n", ""]);

	// exports


/***/ },

/***/ 500:
/***/ function(module, exports) {

	"use strict";
	function getVisibleSegments(segmentWidths, offset, visibleSize) {
	    var startIndex = 0;
	    var shownColumns = 0;
	    var curWidth = 0;
	    for (var i = 0; i < segmentWidths.length; i++) {
	        var segmentWidth = segmentWidths[i];
	        var afterWidth = curWidth + segmentWidth;
	        if (afterWidth < offset) {
	            startIndex++;
	        }
	        else if (curWidth < offset + visibleSize) {
	            shownColumns++;
	        }
	        curWidth = afterWidth;
	    }
	    return {
	        startIndex: startIndex,
	        shownColumns: shownColumns
	    };
	}
	exports.getVisibleSegments = getVisibleSegments;


/***/ }

});