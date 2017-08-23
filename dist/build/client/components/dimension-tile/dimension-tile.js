"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./dimension-tile.css');
var React = require('react');
var plywood_1 = require('plywood');
var index_1 = require('../../../common/utils/index');
var index_2 = require('../../../common/models/index');
var dom_1 = require('../../utils/dom/dom');
var drag_manager_1 = require('../../utils/drag-manager/drag-manager');
var constants_1 = require('../../config/constants');
var constants_2 = require('../../config/constants');
var svg_icon_1 = require('../svg-icon/svg-icon');
var checkbox_1 = require('../checkbox/checkbox');
var loader_1 = require('../loader/loader');
var query_error_1 = require('../query-error/query-error');
var highlight_string_1 = require('../highlight-string/highlight-string');
var searchable_tile_1 = require('../searchable-tile/searchable-tile');
var TOP_N = 100;
var FOLDER_BOX_HEIGHT = 30;
var DimensionTile = (function (_super) {
    __extends(DimensionTile, _super);
    function DimensionTile() {
        var _this = this;
        _super.call(this);
        this.state = {
            loading: false,
            dataset: null,
            error: null,
            fetchQueued: false,
            unfolded: true,
            foldable: false,
            showSearch: false,
            selectedGranularity: null,
            searchText: ''
        };
        this.collectTriggerSearch = index_1.collect(constants_2.SEARCH_WAIT, function () {
            if (!_this.mounted)
                return;
            var _a = _this.props, essence = _a.essence, dimension = _a.dimension, sortOn = _a.sortOn;
            var unfolded = _this.state.unfolded;
            _this.fetchData(essence, dimension, sortOn, unfolded);
        });
    }
    DimensionTile.prototype.fetchData = function (essence, dimension, sortOn, unfolded, selectedGranularity) {
        var _this = this;
        var searchText = this.state.searchText;
        var dataSource = essence.dataSource, colors = essence.colors;
        var filter = essence.getEffectiveFilter();
        // don't remove filter if time
        if (unfolded && dimension !== essence.getTimeDimension()) {
            filter = filter.remove(dimension.expression);
        }
        filter = filter.setExclusionforDimension(false, dimension);
        var filterExpression = filter.toExpression();
        if (!unfolded && colors && colors.dimension === dimension.name && colors.values) {
            filterExpression = filterExpression.and(dimension.expression.in(colors.toSet()));
        }
        if (searchText) {
            filterExpression = filterExpression.and(dimension.expression.contains(plywood_1.r(searchText), 'ignoreCase'));
        }
        var query = plywood_1.$('main')
            .filter(filterExpression);
        var sortExpression = null;
        if (dimension.isContinuous()) {
            var dimensionExpression = dimension.expression;
            var attributeName = dimensionExpression.name;
            var filterSelection = essence.filter.getSelection(dimensionExpression);
            if (!selectedGranularity) {
                if (filterSelection) {
                    var range = dimension.kind === 'time' ? essence.evaluateSelection(filterSelection) : filterSelection.getLiteralValue().extent();
                    selectedGranularity = index_2.getBestGranularityForRange(range, true, dimension.bucketedBy, dimension.granularities);
                }
                else {
                    selectedGranularity = index_2.getDefaultGranularityForKind(dimension.kind, dimension.bucketedBy, dimension.granularities);
                }
            }
            this.setState({ selectedGranularity: selectedGranularity });
            query = query.split(plywood_1.$(attributeName).performAction(selectedGranularity), dimension.name);
            sortExpression = plywood_1.$(dimension.name);
        }
        else {
            query = query.split(dimension.expression, dimension.name);
            sortExpression = sortOn.getExpression();
        }
        if (sortOn.measure) {
            query = query.performAction(sortOn.measure.toApplyAction());
        }
        query = query.sort(sortExpression, plywood_1.SortAction.DESCENDING).limit(TOP_N + 1);
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
    DimensionTile.prototype.updateFoldability = function (essence, dimension, colors) {
        var unfolded = this.state.unfolded;
        var foldable = true;
        if (essence.filter.filteredOn(dimension.expression)) {
            if (colors) {
                foldable = false;
                unfolded = false;
            }
            else if (dimension.kind === "time") {
                foldable = false;
                unfolded = true;
            }
        }
        else {
            if (!colors) {
                foldable = false;
                unfolded = true;
            }
        }
        this.setState({ foldable: foldable, unfolded: unfolded });
        return unfolded;
    };
    DimensionTile.prototype.componentWillMount = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension, colors = _a.colors, sortOn = _a.sortOn;
        var unfolded = this.updateFoldability(essence, dimension, colors);
        this.fetchData(essence, dimension, sortOn, unfolded);
    };
    DimensionTile.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension, sortOn = _a.sortOn;
        var selectedGranularity = this.state.selectedGranularity;
        var nextEssence = nextProps.essence;
        var nextDimension = nextProps.dimension;
        var nextColors = nextProps.colors;
        var nextSortOn = nextProps.sortOn;
        var unfolded = this.updateFoldability(nextEssence, nextDimension, nextColors);
        // keep granularity selection if measures change or if autoupdate
        var currentSelection = essence.getTimeSelection();
        var nextSelection = nextEssence.getTimeSelection();
        var differentTimeFilterSelection = currentSelection ? !currentSelection.equals(nextSelection) : Boolean(nextSelection);
        if (differentTimeFilterSelection) {
            // otherwise render will try to format exiting dataset based off of new granularity (before fetchData returns)
            this.setState({ dataset: null });
        }
        var persistedGranularity = differentTimeFilterSelection ? null : selectedGranularity;
        if (essence.differentDataSource(nextEssence) ||
            essence.differentEffectiveFilter(nextEssence, null, unfolded ? dimension : null) ||
            essence.differentColors(nextEssence) || !dimension.equals(nextDimension) || !sortOn.equals(nextSortOn) ||
            essence.differentTimezoneMatters(nextEssence) ||
            (!essence.timezone.equals(nextEssence.timezone)) && dimension.kind === 'time' ||
            differentTimeFilterSelection) {
            this.fetchData(nextEssence, nextDimension, nextSortOn, unfolded, persistedGranularity);
        }
        this.setFilterModeFromProps(nextProps);
    };
    DimensionTile.prototype.setFilterModeFromProps = function (props) {
        if (props.colors) {
            this.setState({ filterMode: index_2.Filter.INCLUDED });
        }
        else {
            var filterMode = props.essence.filter.getModeForDimension(props.dimension);
            if (filterMode)
                this.setState({ filterMode: filterMode });
        }
    };
    DimensionTile.prototype.componentDidMount = function () {
        this.mounted = true;
        this.setFilterModeFromProps(this.props);
    };
    DimensionTile.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    DimensionTile.prototype.onRowClick = function (value, e) {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, colors = _a.colors;
        var _b = this.state, dataset = _b.dataset, filterMode = _b.filterMode;
        var filter = essence.filter;
        if (colors && colors.dimension === dimension.name) {
            if (colors.limit) {
                if (!dataset)
                    return;
                var values = dataset.data.slice(0, colors.limit).map(function (d) { return d[dimension.name]; });
                colors = index_2.Colors.fromValues(colors.dimension, values);
            }
            colors = colors.toggle(value);
            if (filter.filteredOn(dimension.expression)) {
                filter = filter.toggleValue(dimension.expression, value);
                clicker.changeFilter(filter, colors);
            }
            else {
                clicker.changeColors(colors);
            }
        }
        else {
            if (e.altKey || e.ctrlKey || e.metaKey) {
                var filteredOnMe = filter.filteredOnValue(dimension.expression, value);
                var singleFilter = filter.getLiteralSet(dimension.expression).size() === 1;
                if (filteredOnMe && singleFilter) {
                    filter = filter.remove(dimension.expression);
                }
                else {
                    filter = filter.remove(dimension.expression).addValue(dimension.expression, value);
                }
            }
            else {
                filter = filter.toggleValue(dimension.expression, value);
            }
            // If no longer filtered switch unfolded to true for later
            var unfolded = this.state.unfolded;
            if (!unfolded && !filter.filteredOn(dimension.expression)) {
                this.setState({ unfolded: true });
            }
            clicker.changeFilter(filter.setExclusionforDimension(filterMode === index_2.Filter.EXCLUDED, dimension));
        }
    };
    DimensionTile.prototype.changeFilterMode = function (value) {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension;
        this.setState({ filterMode: value }, function () {
            clicker.changeFilter(essence.filter.setExclusionforDimension(value === index_2.Filter.EXCLUDED, dimension));
        });
    };
    DimensionTile.prototype.getFilterActions = function () {
        var _this = this;
        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
        var filterMode = this.state.filterMode;
        if (!essence || !dimension)
            return null;
        var filter = essence.filter;
        var options = [index_2.Filter.INCLUDED, index_2.Filter.EXCLUDED];
        return options.map(function (value) {
            return {
                selected: filterMode === value,
                onSelect: _this.changeFilterMode.bind(_this, value),
                displayValue: constants_1.STRINGS[value],
                keyString: value
            };
        });
    };
    DimensionTile.prototype.toggleFold = function () {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension, sortOn = _a.sortOn;
        var unfolded = this.state.unfolded;
        unfolded = !unfolded;
        this.setState({ unfolded: unfolded });
        this.fetchData(essence, dimension, sortOn, unfolded);
    };
    DimensionTile.prototype.onDragStart = function (e) {
        var _a = this.props, essence = _a.essence, dimension = _a.dimension, getUrlPrefix = _a.getUrlPrefix;
        var newUrl = essence.changeSplit(index_2.SplitCombine.fromExpression(dimension.expression), index_2.VisStrategy.FairGame).getURL(getUrlPrefix());
        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = 'all';
        dataTransfer.setData("text/url-list", newUrl);
        dataTransfer.setData("text/plain", newUrl);
        drag_manager_1.DragManager.setDragDimension(dimension, 'dimension-tile');
        dom_1.setDragGhost(dataTransfer, dimension.title);
    };
    DimensionTile.prototype.toggleSearch = function () {
        var showSearch = this.state.showSearch;
        this.setState({ showSearch: !showSearch });
        this.onSearchChange('');
    };
    DimensionTile.prototype.onSearchChange = function (text) {
        var _a = this.state, searchText = _a.searchText, dataset = _a.dataset, fetchQueued = _a.fetchQueued, loading = _a.loading;
        var newSearchText = text.substr(0, constants_2.MAX_SEARCH_LENGTH);
        if (searchText === newSearchText)
            return; // nothing to do;
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
    DimensionTile.prototype.getTitleHeader = function () {
        var dimension = this.props.dimension;
        var selectedGranularity = this.state.selectedGranularity;
        if (selectedGranularity && dimension.kind === 'time') {
            var duration = selectedGranularity.duration;
            return dimension.title + " (" + duration.getDescription() + ")";
        }
        return dimension.title;
    };
    DimensionTile.prototype.onSelectGranularity = function (selectedGranularity) {
        if (selectedGranularity === this.state.selectedGranularity)
            return;
        var _a = this.props, essence = _a.essence, dimension = _a.dimension, colors = _a.colors, sortOn = _a.sortOn;
        var unfolded = this.updateFoldability(essence, dimension, colors);
        this.setState({ dataset: null });
        this.fetchData(essence, dimension, sortOn, unfolded, selectedGranularity);
    };
    DimensionTile.prototype.getGranularityActions = function () {
        var _this = this;
        var dimension = this.props.dimension;
        var selectedGranularity = this.state.selectedGranularity;
        var granularities = dimension.granularities || index_2.getGranularities(dimension.kind, dimension.bucketedBy, true);
        return granularities.map(function (g) {
            var granularityStr = index_2.granularityToString(g);
            return {
                selected: index_2.granularityEquals(selectedGranularity, g),
                onSelect: _this.onSelectGranularity.bind(_this, g),
                displayValue: index_1.formatGranularity(granularityStr),
                keyString: granularityStr
            };
        });
    };
    DimensionTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, sortOn = _a.sortOn, colors = _a.colors, onClose = _a.onClose;
        var _b = this.state, loading = _b.loading, dataset = _b.dataset, error = _b.error, showSearch = _b.showSearch, unfolded = _b.unfolded, foldable = _b.foldable, fetchQueued = _b.fetchQueued, searchText = _b.searchText, selectedGranularity = _b.selectedGranularity, filterMode = _b.filterMode;
        var measure = sortOn.measure;
        var measureName = measure ? measure.name : null;
        var filterSet = essence.filter.getLiteralSet(dimension.expression);
        var continuous = dimension.isContinuous();
        var excluded = filterMode === index_2.Filter.EXCLUDED;
        var maxHeight = constants_2.PIN_TITLE_HEIGHT;
        var rows = [];
        var folder = null;
        var highlightControls = null;
        var hasMore = false;
        if (dataset) {
            hasMore = dataset.data.length > TOP_N;
            var rowData = dataset.data.slice(0, TOP_N);
            if (!unfolded) {
                if (filterSet) {
                    rowData = rowData.filter(function (d) { return filterSet.contains(d[dimension.name]); });
                }
                if (colors) {
                    if (colors.values) {
                        var colorsSet = colors.toSet();
                        rowData = rowData.filter(function (d) { return colorsSet.contains(d[dimension.name]); });
                    }
                    else {
                        rowData = rowData.slice(0, colors.limit);
                    }
                }
            }
            if (searchText) {
                var searchTextLower = searchText.toLowerCase();
                rowData = rowData.filter(function (d) {
                    return String(d[dimension.name]).toLowerCase().indexOf(searchTextLower) !== -1;
                });
            }
            var colorValues = null;
            if (colors)
                colorValues = colors.getColors(rowData.map(function (d) { return d[dimension.name]; }));
            var formatter = measure ? index_1.formatterFromData(rowData.map(function (d) { return d[measureName]; }), measure.format) : null;
            rows = rowData.map(function (d, i) {
                var segmentValue = d[dimension.name];
                var segmentValueStr = String(segmentValue);
                var className = 'row';
                var checkbox = null;
                if ((filterSet || colors) && !continuous) {
                    var selected;
                    if (colors) {
                        selected = false;
                        className += ' color';
                    }
                    else {
                        selected = essence.filter.filteredOnValue(dimension.expression, segmentValue);
                        className += ' ' + (selected ? 'selected' : 'not-selected');
                    }
                    checkbox = React.createElement(checkbox_1.Checkbox, {selected: selected, type: excluded ? 'cross' : 'check', color: colorValues ? colorValues[i] : null});
                }
                if (segmentValue instanceof plywood_1.TimeRange) {
                    segmentValueStr = index_1.formatTimeBasedOnGranularity(segmentValue, selectedGranularity.duration, essence.timezone, constants_1.getLocale());
                }
                var measureValueElement = null;
                if (measure) {
                    measureValueElement = React.createElement("div", {className: "measure-value"}, formatter(d[measureName]));
                }
                var row = React.createElement("div", {className: className, key: segmentValueStr, onClick: _this.onRowClick.bind(_this, segmentValue)}, React.createElement("div", {className: "segment-value", title: segmentValueStr}, checkbox, React.createElement(highlight_string_1.HighlightString, {className: "label", text: segmentValueStr, highlightText: searchText})), measureValueElement, selected ? highlightControls : null);
                if (selected && highlightControls)
                    highlightControls = null; // place only once
                return row;
            });
            maxHeight += Math.max(2, rows.length) * constants_2.PIN_ITEM_HEIGHT;
            if (foldable) {
                folder = React.createElement("div", {className: dom_1.classNames('folder', unfolded ? 'folded' : 'unfolded'), onClick: this.toggleFold.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/caret.svg')}), unfolded ? 'Show selection' : 'Show all');
                maxHeight += FOLDER_BOX_HEIGHT;
            }
        }
        maxHeight += constants_2.PIN_PADDING_BOTTOM;
        var message = null;
        if (!loading && dataset && !fetchQueued && searchText && !rows.length) {
            message = React.createElement("div", {className: "message"}, "No results for \"" + searchText + "\"");
        }
        var className = dom_1.classNames('dimension-tile', filterMode, (folder ? 'has-folder' : 'no-folder'), (colors ? 'has-colors' : 'no-colors'), { continuous: continuous });
        var style = {
            maxHeight: maxHeight
        };
        var icons = [{
                name: 'search',
                ref: 'search',
                onClick: this.toggleSearch.bind(this),
                svg: require('../../icons/full-search.svg'),
                active: showSearch
            },
            {
                name: 'close',
                onClick: onClose,
                svg: require('../../icons/full-remove.svg')
            }];
        var actions = null;
        if (continuous) {
            actions = this.getGranularityActions();
        }
        else if (!essence.colors) {
            actions = this.getFilterActions();
        }
        return React.createElement(searchable_tile_1.SearchableTile, {style: style, title: this.getTitleHeader(), toggleChangeFn: this.toggleSearch.bind(this), onDragStart: this.onDragStart.bind(this), onSearchChange: this.onSearchChange.bind(this), searchText: searchText, showSearch: showSearch, icons: icons, className: className, actions: actions}, React.createElement("div", {className: "rows"}, rows, message), folder, error ? React.createElement(query_error_1.QueryError, {error: error}) : null, loading ? React.createElement(loader_1.Loader, null) : null);
    };
    return DimensionTile;
}(React.Component));
exports.DimensionTile = DimensionTile;
