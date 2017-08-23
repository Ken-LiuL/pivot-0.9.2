"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./string-filter-menu.css');
var React = require('react');
var plywood_1 = require('plywood');
var constants_1 = require('../../config/constants');
var index_1 = require('../../../common/models/index');
var general_1 = require('../../../common/utils/general/general');
var dom_1 = require('../../utils/dom/dom');
var clearable_input_1 = require('../clearable-input/clearable-input');
var checkbox_1 = require('../checkbox/checkbox');
var loader_1 = require('../loader/loader');
var query_error_1 = require('../query-error/query-error');
var highlight_string_1 = require('../highlight-string/highlight-string');
var button_1 = require('../button/button');
var filter_options_dropdown_1 = require('../filter-options-dropdown/filter-options-dropdown');
var TOP_N = 100;
var StringFilterMenu = (function (_super) {
    __extends(StringFilterMenu, _super);
    function StringFilterMenu() {
        var _this = this;
        _super.call(this);
        this.state = {
            loading: false,
            dataset: null,
            error: null,
            fetchQueued: false,
            searchText: '',
            selectedValues: null,
            colors: null
        };
        this.collectTriggerSearch = general_1.collect(constants_1.SEARCH_WAIT, function () {
            if (!_this.mounted)
                return;
            var _a = _this.props, essence = _a.essence, dimension = _a.dimension;
            _this.fetchData(essence, dimension);
        });
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    StringFilterMenu.prototype.fetchData = function (essence, dimension) {
        var _this = this;
        var searchText = this.state.searchText;
        var dataSource = essence.dataSource;
        var nativeCount = dataSource.getMeasure('count');
        var measureExpression = nativeCount ? nativeCount.expression : plywood_1.$('main').count();
        var filterExpression = essence.getEffectiveFilter(null, dimension).toExpression();
        if (searchText) {
            filterExpression = filterExpression.and(dimension.expression.contains(plywood_1.r(searchText), 'ignoreCase'));
        }
        var query = plywood_1.$('main')
            .filter(filterExpression)
            .split(dimension.expression, dimension.name)
            .apply('MEASURE', measureExpression)
            .sort(plywood_1.$('MEASURE'), plywood_1.SortAction.DESCENDING)
            .limit(TOP_N + 1);
        this.setState({
            loading: true,
            fetchQueued: false
        });
        dataSource.executor(query, { timezone: essence.timezone })
            .then(function (dataset) {
            if (!_this.mounted)
                return;
            _this.setState({
                loading: false,
                dataset: dataset,
                error: null
            });
        }, function (error) {
            if (!_this.mounted)
                return;
            _this.setState({
                loading: false,
                dataset: null,
                error: error
            });
        });
    };
    StringFilterMenu.prototype.componentWillMount = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var filter = essence.filter, colors = essence.colors;
        var myColors = (colors && colors.dimension === dimension.name ? colors : null);
        var valueSet = filter.getLiteralSet(dimension.expression);
        this.setState({
            selectedValues: valueSet || (myColors ? myColors.toSet() : null) || plywood_1.Set.EMPTY,
            colors: myColors
        });
        this.fetchData(essence, dimension);
        if (colors) {
            this.setState({ filterMode: index_1.Filter.INCLUDED });
        }
        else {
            var filterMode = essence.filter.getModeForDimension(dimension);
            if (filterMode)
                this.setState({ filterMode: filterMode });
        }
    };
    // This is never called : either the component is open and nothing else can update its props,
    // or it's closed and doesn't exist.
    StringFilterMenu.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var nextEssence = nextProps.essence;
        var nextDimension = nextProps.dimension;
        if (essence.differentDataSource(nextEssence) ||
            essence.differentEffectiveFilter(nextEssence, null, nextDimension) || !dimension.equals(nextDimension)) {
            this.fetchData(nextEssence, nextDimension);
        }
    };
    StringFilterMenu.prototype.componentDidMount = function () {
        this.mounted = true;
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    StringFilterMenu.prototype.componentWillUnmount = function () {
        this.mounted = false;
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    StringFilterMenu.prototype.globalKeyDownListener = function (e) {
        if (dom_1.enterKey(e)) {
            this.onOkClick();
        }
    };
    StringFilterMenu.prototype.constructFilter = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension, changePosition = _a.changePosition;
        var _b = this.state, selectedValues = _b.selectedValues, filterMode = _b.filterMode;
        var filter = essence.filter;
        if (selectedValues.size()) {
            var clause = new index_1.FilterClause({
                expression: dimension.expression,
                selection: plywood_1.r(selectedValues),
                exclude: filterMode === index_1.Filter.EXCLUDED
            });
            if (changePosition) {
                if (changePosition.isInsert()) {
                    return filter.insertByIndex(changePosition.insert, clause);
                }
                else {
                    return filter.replaceByIndex(changePosition.replace, clause);
                }
            }
            else {
                return filter.setClause(clause);
            }
        }
        else {
            return filter.remove(dimension.expression);
        }
    };
    StringFilterMenu.prototype.onSearchChange = function (text) {
        var _a = this.state, searchText = _a.searchText, dataset = _a.dataset, fetchQueued = _a.fetchQueued, loading = _a.loading;
        var newSearchText = text.substr(0, constants_1.MAX_SEARCH_LENGTH);
        // If the user is just typing in more and there are already < TOP_N results then there is nothing to do
        if (newSearchText.indexOf(searchText) !== -1 && !fetchQueued && !loading && dataset && dataset.data.length < TOP_N) {
            this.setState({
                searchText: newSearchText
            });
            return;
        }
        this.setState({
            searchText: newSearchText,
            fetchQueued: true
        });
        this.collectTriggerSearch();
    };
    StringFilterMenu.prototype.onValueClick = function (value, e) {
        var _a = this.state, selectedValues = _a.selectedValues, colors = _a.colors;
        if (colors) {
            colors = colors.toggle(value);
            selectedValues = selectedValues.toggle(value);
        }
        else {
            if (e.altKey || e.ctrlKey || e.metaKey) {
                if (selectedValues.contains(value) && selectedValues.size() === 1) {
                    selectedValues = plywood_1.Set.EMPTY;
                }
                else {
                    selectedValues = plywood_1.Set.EMPTY.add(value);
                }
            }
            else {
                selectedValues = selectedValues.toggle(value);
            }
        }
        this.setState({
            selectedValues: selectedValues,
            colors: colors
        });
    };
    StringFilterMenu.prototype.onOkClick = function () {
        if (!this.actionEnabled())
            return;
        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
        var colors = this.state.colors;
        clicker.changeFilter(this.constructFilter(), colors);
        onClose();
    };
    StringFilterMenu.prototype.onCancelClick = function () {
        var onClose = this.props.onClose;
        onClose();
    };
    StringFilterMenu.prototype.actionEnabled = function () {
        var essence = this.props.essence;
        return !essence.filter.equals(this.constructFilter());
    };
    StringFilterMenu.prototype.onSelectFilterOption = function (filterMode) {
        this.setState({ filterMode: filterMode });
    };
    StringFilterMenu.prototype.renderTable = function () {
        var _this = this;
        var _a = this.state, loading = _a.loading, dataset = _a.dataset, error = _a.error, fetchQueued = _a.fetchQueued, searchText = _a.searchText, selectedValues = _a.selectedValues, filterMode = _a.filterMode;
        var dimension = this.props.dimension;
        var rows = [];
        var hasMore = false;
        if (dataset) {
            hasMore = dataset.data.length > TOP_N;
            var rowData = dataset.data.slice(0, TOP_N);
            if (searchText) {
                var searchTextLower = searchText.toLowerCase();
                rowData = rowData.filter(function (d) {
                    return String(d[dimension.name]).toLowerCase().indexOf(searchTextLower) !== -1;
                });
            }
            var checkboxType = filterMode === index_1.Filter.EXCLUDED ? 'cross' : 'check';
            rows = rowData.map(function (d) {
                var segmentValue = d[dimension.name];
                var segmentValueStr = String(segmentValue);
                var selected = selectedValues && selectedValues.contains(segmentValue);
                return React.createElement("div", {className: 'row' + (selected ? ' selected' : ''), key: segmentValueStr, title: segmentValueStr, onClick: _this.onValueClick.bind(_this, segmentValue)}, React.createElement("div", {className: "row-wrapper"}, React.createElement(checkbox_1.Checkbox, {type: checkboxType, selected: selected}), React.createElement(highlight_string_1.HighlightString, {className: "label", text: segmentValueStr, highlightText: searchText})));
            });
        }
        var message = null;
        if (!loading && dataset && !fetchQueued && searchText && !rows.length) {
            message = React.createElement("div", {className: "message"}, 'No results for "' + searchText + '"');
        }
        var className = [
            'menu-table',
            (hasMore ? 'has-more' : 'no-more')
        ].join(' ');
        return React.createElement("div", {className: className}, React.createElement("div", {className: "side-by-side"}, React.createElement(filter_options_dropdown_1.FilterOptionsDropdown, {selectedOption: filterMode, onSelectOption: this.onSelectFilterOption.bind(this)}), React.createElement("div", {className: "search-box"}, React.createElement(clearable_input_1.ClearableInput, {placeholder: "Search", focusOnMount: true, value: searchText, onChange: this.onSearchChange.bind(this)}))), React.createElement("div", {className: "rows"}, rows, message), error ? React.createElement(query_error_1.QueryError, {error: error}) : null, loading ? React.createElement(loader_1.Loader, null) : null);
    };
    StringFilterMenu.prototype.render = function () {
        var dimension = this.props.dimension;
        if (!dimension)
            return null;
        return React.createElement("div", {className: "string-filter-menu"}, this.renderTable(), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", title: constants_1.STRINGS.ok, onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled()}), React.createElement(button_1.Button, {type: "secondary", title: constants_1.STRINGS.cancel, onClick: this.onCancelClick.bind(this)})));
    };
    return StringFilterMenu;
}(React.Component));
exports.StringFilterMenu = StringFilterMenu;
