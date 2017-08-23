webpackJsonp([3],{

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(441);
	var React = __webpack_require__(5);
	var index_1 = __webpack_require__(193);
	var bubble_menu_1 = __webpack_require__(304);
	var string_filter_menu_1 = __webpack_require__(443);
	var time_filter_menu_1 = __webpack_require__(451);
	var number_filter_menu_1 = __webpack_require__(462);
	var FilterMenu = (function (_super) {
	    __extends(FilterMenu, _super);
	    function FilterMenu() {
	        _super.call(this);
	    }
	    FilterMenu.prototype.render = function () {
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, changePosition = _a.changePosition, direction = _a.direction, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose, inside = _a.inside;
	        if (!dimension)
	            return null;
	        var menuSize = null;
	        var menuCont = null;
	        if (dimension.kind === 'time') {
	            menuSize = index_1.Stage.fromSize(250, 274);
	            menuCont = React.createElement(time_filter_menu_1.TimeFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, onClose: onClose});
	        }
	        else if (dimension.kind === 'number') {
	            menuSize = index_1.Stage.fromSize(250, 274);
	            menuCont = React.createElement(number_filter_menu_1.NumberFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, onClose: onClose});
	        }
	        else {
	            menuSize = index_1.Stage.fromSize(250, 410);
	            menuCont = React.createElement(string_filter_menu_1.StringFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, changePosition: changePosition, onClose: onClose});
	        }
	        return React.createElement(bubble_menu_1.BubbleMenu, {className: "filter-menu", direction: direction, containerStage: containerStage, stage: menuSize, openOn: openOn, onClose: onClose, inside: inside}, menuCont);
	    };
	    return FilterMenu;
	}(React.Component));
	exports.FilterMenu = FilterMenu;


/***/ },

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(442);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".filter-menu .button-bar{margin-top:12px}.filter-menu .button-bar button{min-width:70px}.filter-menu .button-bar button:not(:last-child){margin-right:6px}\n", ""]);

	// exports


/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(444);
	var React = __webpack_require__(5);
	var plywood_1 = __webpack_require__(189);
	var constants_1 = __webpack_require__(236);
	var index_1 = __webpack_require__(193);
	var general_1 = __webpack_require__(198);
	var dom_1 = __webpack_require__(254);
	var clearable_input_1 = __webpack_require__(301);
	var checkbox_1 = __webpack_require__(284);
	var loader_1 = __webpack_require__(173);
	var query_error_1 = __webpack_require__(289);
	var highlight_string_1 = __webpack_require__(292);
	var button_1 = __webpack_require__(341);
	var filter_options_dropdown_1 = __webpack_require__(446);
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


/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(445);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./string-filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./string-filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".string-filter-menu .menu-table .side-by-side{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.string-filter-menu .menu-table .side-by-side>*{margin-right:5px}.string-filter-menu .menu-table .side-by-side>*:last-child{margin-right:0}.string-filter-menu .menu-table .search-box .clearable-input{background:#fff;border:1px solid #d1d1d1;border-radius:2px;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,0.1)}.string-filter-menu .menu-table::after{position:absolute;top:0;bottom:0;left:0;right:0;content:'';pointer-events:none;box-shadow:inset 0 -20px 10px -10px #fff;border-radius:2px}.string-filter-menu .menu-table{background:#fff;color:#000}.string-filter-menu .menu-table .side-by-side :not(:last-child){margin-right:0}.string-filter-menu .menu-table::after{position:absolute;top:0;bottom:0;left:-14px;right:-14px}.string-filter-menu .menu-table .search-box{height:30px;margin-left:6px}.string-filter-menu .menu-table .search-box .clearable-input{width:100%;height:30px;padding-left:6px}.string-filter-menu .menu-table .rows{height:280px;margin-top:10px;margin-left:-14px;margin-right:-14px;overflow:auto}.string-filter-menu .menu-table .row{height:24px;cursor:pointer;padding:0 14px}.string-filter-menu .menu-table .row .row-wrapper{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;height:100%}.string-filter-menu .menu-table .row .row-wrapper .label{display:inline-block;vertical-align:top;padding-top:4px}.string-filter-menu .menu-table .row:hover{background:#e3f4fc}.string-filter-menu .menu-table .row:last-child{margin-bottom:12px}.string-filter-menu .menu-table .message{padding:4px 10px;color:#999;font-style:italic}.string-filter-menu .menu-table .loader,.string-filter-menu .menu-table .query-error{position:absolute;top:0;bottom:0;left:0;right:0}\n", ""]);

	// exports


/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(447);
	var React = __webpack_require__(5);
	var constants_1 = __webpack_require__(236);
	var index_1 = __webpack_require__(193);
	var dropdown_1 = __webpack_require__(273);
	var svg_icon_1 = __webpack_require__(176);
	var FILTER_OPTIONS = [
	    {
	        label: constants_1.STRINGS.include,
	        value: index_1.Filter.INCLUDED,
	        svg: __webpack_require__(449),
	        checkType: 'check'
	    },
	    {
	        label: constants_1.STRINGS.exclude,
	        value: index_1.Filter.EXCLUDED,
	        svg: __webpack_require__(450),
	        checkType: 'cross'
	    }
	];
	var FilterOptionsDropdown = (function (_super) {
	    __extends(FilterOptionsDropdown, _super);
	    function FilterOptionsDropdown() {
	        _super.call(this);
	    }
	    FilterOptionsDropdown.prototype.onSelectOption = function (option) {
	        this.props.onSelectOption(option.value);
	    };
	    FilterOptionsDropdown.prototype.renderFilterOption = function (option) {
	        return React.createElement("span", {className: "filter-option"}, React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: option.svg}), React.createElement("span", {className: "option-label"}, option.label));
	    };
	    FilterOptionsDropdown.prototype.render = function () {
	        var _a = this.props, selectedOption = _a.selectedOption, onSelectOption = _a.onSelectOption;
	        var selectedItem = FILTER_OPTIONS.filter(function (o) { return o.value === selectedOption; })[0] || FILTER_OPTIONS[0];
	        var dropdown = React.createElement(dropdown_1.Dropdown, {
	            className: 'filter-options',
	            items: FILTER_OPTIONS,
	            selectedItem: selectedItem,
	            equal: function (a, b) { return a.value === b.value; },
	            keyItem: function (d) { return d.value; },
	            renderItem: this.renderFilterOption.bind(this),
	            renderSelectedItem: function (d) { return React.createElement(svg_icon_1.SvgIcon, {className: "icon", svg: d.svg}); },
	            onSelect: this.onSelectOption.bind(this)
	        });
	        return React.createElement("div", {className: "filter-options-dropdown"}, dropdown);
	    };
	    return FilterOptionsDropdown;
	}(React.Component));
	exports.FilterOptionsDropdown = FilterOptionsDropdown;


/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(448);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./filter-options-dropdown.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./filter-options-dropdown.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".filter-options-dropdown .selected-item{padding:8px 16px 0 4px}.filter-options-dropdown .selected-item .icon{padding:0;bottom:4px}.filter-options-dropdown .selected-item .caret-icon{right:6px}.filter-options-dropdown .dropdown-menu{width:180px}.filter-options-dropdown .dropdown-menu .filter-option{display:block}.filter-options-dropdown .dropdown-menu .filter-option .option-label{display:inline-block;padding:2px 10px}.filter-options-dropdown svg.icon{display:inline-block;padding:5px 0;cursor:pointer;width:19px}.filter-options-dropdown svg.icon path{fill:#888}\n", ""]);

	// exports


/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(452);
	var React = __webpack_require__(5);
	var chronoshift_1 = __webpack_require__(180);
	var plywood_1 = __webpack_require__(189);
	var constants_1 = __webpack_require__(236);
	var index_1 = __webpack_require__(193);
	var time_1 = __webpack_require__(210);
	var dom_1 = __webpack_require__(254);
	var button_1 = __webpack_require__(341);
	var button_group_1 = __webpack_require__(318);
	var date_range_picker_1 = __webpack_require__(454);
	var $maxTime = plywood_1.$(index_1.FilterClause.MAX_TIME_REF_NAME);
	var latestPresets = [
	    { name: '1H', selection: $maxTime.timeRange('PT1H', -1) },
	    { name: '6H', selection: $maxTime.timeRange('PT6H', -1) },
	    { name: '1D', selection: $maxTime.timeRange('P1D', -1) },
	    { name: '7D', selection: $maxTime.timeRange('P1D', -7) },
	    { name: '30D', selection: $maxTime.timeRange('P1D', -30) }
	];
	var $now = plywood_1.$(index_1.FilterClause.NOW_REF_NAME);
	var currentPresets = [
	    { name: 'D', selection: $now.timeBucket('P1D') },
	    { name: 'W', selection: $now.timeBucket('P1W') },
	    { name: 'M', selection: $now.timeBucket('P1M') },
	    { name: 'Q', selection: $now.timeBucket('P3M') },
	    { name: 'Y', selection: $now.timeBucket('P1Y') }
	];
	var previousPresets = [
	    { name: 'D', selection: $now.timeFloor('P1D').timeRange('P1D', -1) },
	    { name: 'W', selection: $now.timeFloor('P1W').timeRange('P1W', -1) },
	    { name: 'M', selection: $now.timeFloor('P1M').timeRange('P1M', -1) },
	    { name: 'Q', selection: $now.timeFloor('P3M').timeRange('P3M', -1) },
	    { name: 'Y', selection: $now.timeFloor('P1Y').timeRange('P1Y', -1) }
	];
	var TimeFilterMenu = (function (_super) {
	    __extends(TimeFilterMenu, _super);
	    function TimeFilterMenu() {
	        _super.call(this);
	        this.state = {
	            tab: null,
	            timeSelection: null,
	            startTime: null,
	            endTime: null,
	            hoverPreset: null
	        };
	        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
	    }
	    TimeFilterMenu.prototype.componentWillMount = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var filter = essence.filter;
	        var timezone = essence.timezone;
	        var dimensionExpression = dimension.expression;
	        var timeSelection = filter.getSelection(dimensionExpression);
	        var selectedTimeRangeSet = essence.getEffectiveFilter().getLiteralSet(dimensionExpression);
	        var selectedTimeRange = (selectedTimeRangeSet && selectedTimeRangeSet.size() === 1) ? selectedTimeRangeSet.elements[0] : null;
	        var clause = filter.clauseForExpression(dimensionExpression);
	        this.setState({
	            timeSelection: timeSelection,
	            tab: (!clause || clause.relative) ? 'relative' : 'specific',
	            startTime: selectedTimeRange ? chronoshift_1.day.floor(selectedTimeRange.start, timezone) : null,
	            endTime: selectedTimeRange ? chronoshift_1.day.ceil(selectedTimeRange.end, timezone) : null
	        });
	    };
	    TimeFilterMenu.prototype.componentDidMount = function () {
	        window.addEventListener('keydown', this.globalKeyDownListener);
	    };
	    TimeFilterMenu.prototype.componentWillUnmount = function () {
	        window.removeEventListener('keydown', this.globalKeyDownListener);
	    };
	    TimeFilterMenu.prototype.globalKeyDownListener = function (e) {
	        if (dom_1.enterKey(e)) {
	            this.onOkClick();
	        }
	    };
	    TimeFilterMenu.prototype.constructFilter = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, tab = _b.tab, startTime = _b.startTime, endTime = _b.endTime;
	        var filter = essence.filter;
	        var timezone = essence.timezone;
	        if (tab !== 'specific')
	            return null;
	        if (startTime && !endTime) {
	            endTime = chronoshift_1.day.shift(startTime, timezone, 1);
	        }
	        if (startTime && endTime && startTime < endTime) {
	            return filter.setSelection(dimension.expression, plywood_1.r(plywood_1.TimeRange.fromJS({ start: startTime, end: endTime })));
	        }
	        else {
	            return null;
	        }
	    };
	    TimeFilterMenu.prototype.onPresetClick = function (preset) {
	        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose, essence = _a.essence, dimension = _a.dimension;
	        var filter = essence.filter;
	        var newFilter = filter.setSelection(dimension.expression, preset.selection);
	        clicker.changeFilter(newFilter);
	        onClose();
	    };
	    TimeFilterMenu.prototype.onPresetMouseEnter = function (preset) {
	        var hoverPreset = this.state.hoverPreset;
	        if (hoverPreset === preset)
	            return;
	        this.setState({
	            hoverPreset: preset
	        });
	    };
	    TimeFilterMenu.prototype.onPresetMouseLeave = function (preset) {
	        var hoverPreset = this.state.hoverPreset;
	        if (hoverPreset !== preset)
	            return;
	        this.setState({
	            hoverPreset: null
	        });
	    };
	    TimeFilterMenu.prototype.onStartChange = function (start) {
	        this.setState({
	            startTime: start
	        });
	    };
	    TimeFilterMenu.prototype.onEndChange = function (end) {
	        this.setState({
	            endTime: end
	        });
	    };
	    TimeFilterMenu.prototype.selectTab = function (tab) {
	        this.setState({ tab: tab });
	    };
	    TimeFilterMenu.prototype.onOkClick = function () {
	        if (!this.actionEnabled())
	            return;
	        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
	        var newFilter = this.constructFilter();
	        if (!newFilter)
	            return;
	        clicker.changeFilter(newFilter);
	        onClose();
	    };
	    TimeFilterMenu.prototype.onCancelClick = function () {
	        var onClose = this.props.onClose;
	        onClose();
	    };
	    TimeFilterMenu.prototype.renderPresets = function () {
	        var _this = this;
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, timeSelection = _b.timeSelection, hoverPreset = _b.hoverPreset;
	        if (!dimension)
	            return null;
	        var timezone = essence.timezone;
	        var presetToButton = function (preset) {
	            return React.createElement("button", {key: preset.name, className: dom_1.classNames('preset', { hover: preset === hoverPreset, selected: preset.selection.equals(timeSelection) }), onClick: _this.onPresetClick.bind(_this, preset), onMouseEnter: _this.onPresetMouseEnter.bind(_this, preset), onMouseLeave: _this.onPresetMouseLeave.bind(_this, preset)}, preset.name);
	        };
	        var previewTimeRange = essence.evaluateSelection(hoverPreset ? hoverPreset.selection : timeSelection);
	        var previewText = previewTimeRange ? time_1.formatTimeRange(previewTimeRange, timezone, time_1.DisplayYear.IF_DIFF) : constants_1.STRINGS.noFilter;
	        var maxTimeBasedPresets = React.createElement("div", null, React.createElement("div", {className: "type"}, constants_1.STRINGS.latest), React.createElement("div", {className: "buttons"}, latestPresets.map(presetToButton)));
	        return React.createElement("div", {className: "cont"}, essence.dataSource.isTimeAttribute(dimension.expression) ? maxTimeBasedPresets : null, React.createElement("div", {className: "type"}, constants_1.STRINGS.current), React.createElement("div", {className: "buttons"}, currentPresets.map(presetToButton)), React.createElement("div", {className: "type"}, constants_1.STRINGS.previous), React.createElement("div", {className: "buttons"}, previousPresets.map(presetToButton)), React.createElement("div", {className: "preview"}, previewText));
	    };
	    TimeFilterMenu.prototype.actionEnabled = function () {
	        var essence = this.props.essence;
	        var tab = this.state.tab;
	        if (tab !== 'specific')
	            return false;
	        var newFilter = this.constructFilter();
	        return newFilter && !essence.filter.equals(newFilter);
	    };
	    TimeFilterMenu.prototype.renderCustom = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, startTime = _b.startTime, endTime = _b.endTime;
	        if (!dimension)
	            return null;
	        return React.createElement("div", null, React.createElement(date_range_picker_1.DateRangePicker, {startTime: startTime, endTime: endTime, maxTime: essence.dataSource.getMaxTimeDate(), timezone: essence.timezone, onStartChange: this.onStartChange.bind(this), onEndChange: this.onEndChange.bind(this)}), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled(), title: constants_1.STRINGS.ok}), React.createElement(button_1.Button, {type: "secondary", onClick: this.onCancelClick.bind(this), title: constants_1.STRINGS.cancel})));
	    };
	    ;
	    TimeFilterMenu.prototype.render = function () {
	        var _this = this;
	        var dimension = this.props.dimension;
	        var tab = this.state.tab;
	        if (!dimension)
	            return null;
	        var tabs = ['relative', 'specific'].map(function (name) {
	            return {
	                isSelected: tab === name,
	                title: (name === 'relative' ? constants_1.STRINGS.relative : constants_1.STRINGS.specific),
	                key: name,
	                onClick: _this.selectTab.bind(_this, name)
	            };
	        });
	        return React.createElement("div", {className: "time-filter-menu"}, React.createElement(button_group_1.ButtonGroup, {groupMembers: tabs}), tab === 'relative' ? this.renderPresets() : this.renderCustom());
	    };
	    return TimeFilterMenu;
	}(React.Component));
	exports.TimeFilterMenu = TimeFilterMenu;


/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(453);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./time-filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./time-filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".time-filter-menu .cont .buttons button.selected,.time-filter-menu .cont .buttons button{display:inline-block;padding:6px 16px;font-size:13px;min-width:46px;text-align:center;cursor:pointer;border-radius:2px;outline:none;height:30px}.time-filter-menu .cont .buttons button.disabled,.time-filter-menu .cont .buttons button[disabled]{opacity:.60;cursor:default;pointer-events:none}.time-filter-menu .cont .buttons button.selected{background:#1ea3e6;color:#fff}.time-filter-menu .cont .buttons button.selected svg path{fill:#fff}.time-filter-menu .cont .buttons button.selected:hover{background:#1795d3}.time-filter-menu .cont .buttons button.active.selected,.time-filter-menu .cont .buttons button.selected:active{background:#1584bc;color:#e0e0e0}.time-filter-menu .cont .buttons button.active.selected svg path,.time-filter-menu .cont .buttons button.selected:active svg path{fill:#e0e0e0}.time-filter-menu .cont .buttons button{background:rgba(30,163,230,0.22);color:#1ea3e6}.time-filter-menu .cont .buttons button svg path{fill:#1ea3e6}.time-filter-menu .cont .buttons button:hover{background:rgba(30,163,230,0.3)}.time-filter-menu .cont .buttons button.active,.time-filter-menu .cont .buttons button:active{background:rgba(30,163,230,0.38)}.time-filter-menu .cont .type{text-transform:uppercase;font-size:12px;color:#a6a6a6;margin-bottom:5px}.time-filter-menu .cont .preview{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;height:30px;line-height:28px;background:#f2f2f2;border-radius:2px;color:#909090;text-align:center;padding-left:8px;padding-right:8px}.time-filter-menu .cont{margin-top:18px}.time-filter-menu .cont .buttons{margin-bottom:14px}.time-filter-menu .cont .buttons button{min-width:0;padding:0;width:17.5%;margin-right:3%}.time-filter-menu .cont .buttons button.selected{min-width:0;padding:0}.time-filter-menu .cont .buttons button:last-child{margin-right:0}\n", ""]);

	// exports


/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(455);
	var React = __webpack_require__(5);
	var chronoshift_1 = __webpack_require__(180);
	var plywood_1 = __webpack_require__(189);
	var time_1 = __webpack_require__(210);
	var dom_1 = __webpack_require__(254);
	var constants_1 = __webpack_require__(236);
	var svg_icon_1 = __webpack_require__(176);
	var date_range_input_1 = __webpack_require__(457);
	var DateRangePicker = (function (_super) {
	    __extends(DateRangePicker, _super);
	    function DateRangePicker() {
	        _super.call(this);
	        this.state = {
	            activeMonthStartDate: null,
	            hoverTimeRange: null,
	            selectionSet: false
	        };
	    }
	    DateRangePicker.prototype.componentWillMount = function () {
	        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, timezone = _a.timezone;
	        if (startTime && !time_1.datesEqual(startTime, chronoshift_1.day.floor(startTime, timezone)))
	            throw new Error("start time must be round");
	        if (endTime && !time_1.datesEqual(endTime, chronoshift_1.day.floor(endTime, timezone)))
	            throw new Error("end time must be round");
	        var flooredStart = chronoshift_1.month.floor(startTime || new Date(), timezone);
	        this.setState({
	            activeMonthStartDate: flooredStart,
	            selectionSet: true
	        });
	    };
	    DateRangePicker.prototype.navigateToMonth = function (offset) {
	        var timezone = this.props.timezone;
	        var activeMonthStartDate = this.state.activeMonthStartDate;
	        var newDate = chronoshift_1.month.shift(activeMonthStartDate, timezone, offset);
	        this.setState({
	            activeMonthStartDate: newDate
	        });
	    };
	    DateRangePicker.prototype.goToPreviousMonth = function () {
	        return this.navigateToMonth(-1);
	    };
	    DateRangePicker.prototype.goToNextMonth = function () {
	        return this.navigateToMonth(1);
	    };
	    DateRangePicker.prototype.calculateHoverTimeRange = function (mouseEnteredDay) {
	        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime;
	        var hoverTimeRange = null;
	        if (startTime && !endTime) {
	            var start = startTime;
	            var end = mouseEnteredDay;
	            // if mousing over backwards, set end to old start time
	            if (mouseEnteredDay < startTime) {
	                start = mouseEnteredDay;
	                end = startTime;
	            }
	            hoverTimeRange = new plywood_1.TimeRange({ start: start, end: end, bounds: '[]' });
	        }
	        this.setState({ hoverTimeRange: hoverTimeRange });
	    };
	    DateRangePicker.prototype.onCalendarMouseLeave = function () {
	        this.setState({ hoverTimeRange: null });
	    };
	    DateRangePicker.prototype.selectNewRange = function (startDate, endDate) {
	        var _a = this.props, onStartChange = _a.onStartChange, onEndChange = _a.onEndChange, timezone = _a.timezone;
	        onStartChange(startDate);
	        // real end points are exclusive so +1 full day to selection (which is floored) to get the real end point
	        if (endDate)
	            endDate = time_1.shiftOneDay(endDate, timezone);
	        onEndChange(endDate);
	    };
	    DateRangePicker.prototype.selectDay = function (selection) {
	        var startTime = this.props.startTime;
	        var selectionSet = this.state.selectionSet;
	        if (selectionSet) {
	            this.setState({ hoverTimeRange: null, selectionSet: false });
	            this.selectNewRange(selection, null);
	        }
	        else {
	            var isDoubleClickSameDay = time_1.datesEqual(selection, startTime);
	            var isBackwardSelection = selection < startTime;
	            if (isDoubleClickSameDay) {
	                this.selectNewRange(startTime, startTime);
	            }
	            else if (isBackwardSelection) {
	                this.selectNewRange(selection, startTime);
	            }
	            else {
	                this.selectNewRange(startTime, selection);
	            }
	            this.setState({ selectionSet: true });
	        }
	    };
	    DateRangePicker.prototype.getIsSelectable = function (date) {
	        var _a = this.state, hoverTimeRange = _a.hoverTimeRange, selectionSet = _a.selectionSet;
	        var inHoverTimeRange = false;
	        if (hoverTimeRange) {
	            inHoverTimeRange = hoverTimeRange.contains(date);
	        }
	        return inHoverTimeRange && !selectionSet;
	    };
	    DateRangePicker.prototype.getIsSelectedEdgeEnd = function (isSingleDate, candidate) {
	        if (isSingleDate)
	            return false;
	        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, timezone = _a.timezone;
	        var candidateEndPoint = time_1.shiftOneDay(candidate, timezone);
	        return time_1.wallTimeInclusiveEndEqual(endTime, candidateEndPoint, timezone) && endTime > startTime;
	    };
	    DateRangePicker.prototype.renderDays = function (weeks, monthStart, isSingleDate) {
	        var _this = this;
	        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, maxTime = _a.maxTime, timezone = _a.timezone;
	        var nextMonthStart = chronoshift_1.month.shift(monthStart, timezone, 1);
	        return weeks.map(function (daysInWeek, row) {
	            return React.createElement("div", {className: "week", key: row}, " ", daysInWeek.map(function (dayDate, column) {
	                var isPast = dayDate < monthStart;
	                var isFuture = dayDate >= nextMonthStart;
	                var isBeyondMaxRange = dayDate > maxTime;
	                var isSelectedEdgeStart = time_1.datesEqual(dayDate, startTime);
	                var isSelectedEdgeEnd = _this.getIsSelectedEdgeEnd(isSingleDate, dayDate);
	                var className = dom_1.classNames("day", "value", {
	                    past: isPast,
	                    future: isFuture,
	                    "beyond-max-range": isBeyondMaxRange,
	                    "selectable": _this.getIsSelectable(dayDate),
	                    "selected": startTime < dayDate && dayDate < endTime,
	                    "selected-edge": isSelectedEdgeStart || isSelectedEdgeEnd
	                });
	                return React.createElement("div", {className: className, key: column, onClick: _this.selectDay.bind(_this, dayDate), onMouseEnter: _this.calculateHoverTimeRange.bind(_this, dayDate)}, time_1.getWallTimeDay(dayDate, timezone));
	            }));
	        });
	    };
	    ;
	    DateRangePicker.prototype.renderCalendar = function (startDate, isSingleDate) {
	        var timezone = this.props.timezone;
	        var weeks = time_1.monthToWeeks(startDate, timezone, constants_1.getLocale());
	        var firstWeek = weeks[0];
	        var lastWeek = weeks[weeks.length - 1];
	        var countPrepend = 7 - firstWeek.length;
	        var countAppend = 7 - lastWeek.length;
	        weeks[0] = time_1.prependDays(timezone, firstWeek, countPrepend);
	        weeks[weeks.length - 1] = time_1.appendDays(timezone, lastWeek, countAppend);
	        return this.renderDays(weeks, startDate, isSingleDate);
	    };
	    DateRangePicker.prototype.renderCalendarNav = function (startDate) {
	        var timezone = this.props.timezone;
	        return React.createElement("div", {className: "calendar-nav"}, React.createElement("div", {className: 'caret left', onClick: this.goToPreviousMonth.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(460)})), time_1.getWallTimeMonthWithYear(startDate, timezone), React.createElement("div", {className: 'caret right', onClick: this.goToNextMonth.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(461)})));
	    };
	    DateRangePicker.prototype.render = function () {
	        var _a = this.props, startTime = _a.startTime, endTime = _a.endTime, timezone = _a.timezone, onStartChange = _a.onStartChange, onEndChange = _a.onEndChange;
	        var _b = this.state, activeMonthStartDate = _b.activeMonthStartDate, selectionSet = _b.selectionSet;
	        if (!activeMonthStartDate)
	            return null;
	        var isSingleDate = endTime ? time_1.getWallTimeDay(startTime, timezone) === time_1.getEndWallTimeInclusive(endTime, timezone).getDate() : true;
	        return React.createElement("div", {className: "date-range-picker"}, React.createElement("div", {className: "side-by-side"}, React.createElement(date_range_input_1.DateRangeInput, {type: "start", time: startTime, timezone: timezone, onChange: onStartChange.bind(this)}), React.createElement(date_range_input_1.DateRangeInput, {type: "end", time: endTime, timezone: timezone, onChange: onEndChange.bind(this), hide: !selectionSet})), React.createElement("div", {className: "calendar", onMouseLeave: this.onCalendarMouseLeave.bind(this)}, this.renderCalendarNav(activeMonthStartDate), React.createElement("div", {className: "week"}, constants_1.getLocale().shortDays.map(function (day, i) {
	            return React.createElement("div", {className: "day label", key: day + i}, React.createElement("span", {className: "space"}), day);
	        })), this.renderCalendar(activeMonthStartDate, isSingleDate)));
	    };
	    return DateRangePicker;
	}(React.Component));
	exports.DateRangePicker = DateRangePicker;


/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(456);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./date-range-picker.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./date-range-picker.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".date-range-picker .side-by-side{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.date-range-picker .side-by-side .date-range-input{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0}.date-range-picker .side-by-side :not(:last-child){margin-right:8px}.date-range-picker .calendar{padding-left:4px;padding-right:4px}.date-range-picker .calendar .calendar-nav{margin-top:18px;margin-bottom:12px;text-align:center;line-height:23px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.date-range-picker .calendar .calendar-nav .caret{position:absolute;top:0;padding:3px 3px;cursor:pointer}.date-range-picker .calendar .calendar-nav .caret svg{width:19px}.date-range-picker .calendar .calendar-nav .caret svg path{fill:#777}.date-range-picker .calendar .calendar-nav .caret:hover svg path{fill:#555}.date-range-picker .calendar .calendar-nav .caret.left{left:0}.date-range-picker .calendar .calendar-nav .caret.right{right:0}.date-range-picker .calendar .week{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%}.date-range-picker .calendar .week .day{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0;text-align:center;height:26px;line-height:26px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.date-range-picker .calendar .week .day.label{color:#bbb;pointer-events:none}.date-range-picker .calendar .week .day.value.selectable,.date-range-picker .calendar .week .day.value.selected{background:rgba(30,163,230,0.26)}.date-range-picker .calendar .week .day.value.selectable.past:not(.selected-edge),.date-range-picker .calendar .week .day.value.selectable.future:not(.selected-edge),.date-range-picker .calendar .week .day.value.selected.past:not(.selected-edge),.date-range-picker .calendar .week .day.value.selected.future:not(.selected-edge){color:#87acbf}.date-range-picker .calendar .week .day.value:hover:not(.selectable)::after{position:absolute;top:0;bottom:0;left:0;right:0;content:'';pointer-events:none;background:rgba(0,0,0,0.06)}.date-range-picker .calendar .week .day.value:hover:not(.selectable).beyond-max-range::after{background:rgba(0,0,0,0.1)}.date-range-picker .calendar .week .day.value.beyond-max-range::after{position:absolute;top:0;bottom:0;left:0;right:0;content:'';pointer-events:none;background:rgba(0,0,0,0.05)}.date-range-picker .calendar .week .day.value.past,.date-range-picker .calendar .week .day.value.future{color:#bbb}.date-range-picker .calendar .week .day.value.selected-edge{background:#1ea3e6;color:#fff}.date-range-picker .calendar .week .day span.space{color:transparent}\n", ""]);

	// exports


/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(458);
	var React = __webpack_require__(5);
	var chronoshift_1 = __webpack_require__(180);
	var time_1 = __webpack_require__(210);
	var DateRangeInput = (function (_super) {
	    __extends(DateRangeInput, _super);
	    function DateRangeInput() {
	        _super.call(this);
	        this.state = {
	            dateString: ''
	        };
	    }
	    // 2015-09-23T17:42:57.636Z
	    // 2015-09-23 17:42
	    DateRangeInput.prototype.componentDidMount = function () {
	        var _a = this.props, time = _a.time, timezone = _a.timezone;
	        this.updateStateFromTime(time, timezone);
	    };
	    DateRangeInput.prototype.componentWillReceiveProps = function (nextProps) {
	        var time = nextProps.time, timezone = nextProps.timezone;
	        this.updateStateFromTime(time, timezone);
	    };
	    DateRangeInput.prototype.updateStateFromTime = function (time, timezone) {
	        if (!time)
	            return;
	        if (isNaN(time.valueOf())) {
	            this.setState({
	                dateString: ''
	            });
	            return;
	        }
	        var effectiveTime = this.props.type === "end" ? time_1.exclusiveToInclusiveEnd(time) : time;
	        this.setState({
	            dateString: time_1.getWallTimeString(effectiveTime, timezone)
	        });
	    };
	    DateRangeInput.prototype.dateChange = function (e) {
	        var dateString = e.target.value.replace(/[^\d-]/g, '').substr(0, 10);
	        this.setState({
	            dateString: dateString
	        });
	        if (dateString.length === 10) {
	            this.changeDate(dateString);
	        }
	    };
	    DateRangeInput.prototype.changeDate = function (possibleDateString) {
	        var _a = this.props, timezone = _a.timezone, onChange = _a.onChange, type = _a.type;
	        var possibleDate = new Date(possibleDateString);
	        // add one if end so it passes the inclusive formatting
	        var day = type === "end" ? possibleDate.getUTCDate() + 1 : possibleDate.getUTCDate();
	        if (isNaN(possibleDate.valueOf())) {
	            onChange(null);
	        }
	        else {
	            // Convert from WallTime to UTC
	            var possibleDate = chronoshift_1.WallTime.WallTimeToUTC(timezone.toString(), possibleDate.getUTCFullYear(), possibleDate.getUTCMonth(), day, possibleDate.getUTCHours(), possibleDate.getUTCMinutes(), possibleDate.getUTCSeconds(), possibleDate.getUTCMilliseconds());
	            onChange(possibleDate);
	        }
	    };
	    DateRangeInput.prototype.render = function () {
	        var hide = this.props.hide;
	        var dateString = this.state.dateString;
	        var value = hide ? '' : dateString;
	        return React.createElement("div", {className: "date-range-input"}, React.createElement("input", {className: "input-field", value: value, onChange: this.dateChange.bind(this)}));
	    };
	    return DateRangeInput;
	}(React.Component));
	exports.DateRangeInput = DateRangeInput;


/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(459);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./date-range-input.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./date-range-input.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".date-range-input .input-field{border:1px solid #d4d4d4;border-radius:2px;box-shadow:inset 0 1px 1px rgba(0,0,0,0.13);padding-left:6px;padding-right:6px;width:100%;height:30px}.date-range-input .input-field:hover{border-color:#b8b8b8}.date-range-input .input-field:focus{border-color:#1ea3e6}.date-range-input .error.input-field{border-color:#e24c4c}\n", ""]);

	// exports


/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(463);
	var React = __webpack_require__(5);
	var plywood_1 = __webpack_require__(189);
	var index_1 = __webpack_require__(193);
	var constants_1 = __webpack_require__(236);
	var dom_1 = __webpack_require__(254);
	var button_1 = __webpack_require__(341);
	var number_range_picker_1 = __webpack_require__(465);
	function numberOrAnyToString(start) {
	    if (start === number_range_picker_1.ANY_VALUE)
	        return constants_1.STRINGS.any;
	    return '' + start;
	}
	function stringToNumberOrAny(startInput) {
	    var parse = parseFloat(startInput);
	    return isNaN(parse) ? number_range_picker_1.ANY_VALUE : parse;
	}
	var NumberFilterMenu = (function (_super) {
	    __extends(NumberFilterMenu, _super);
	    function NumberFilterMenu() {
	        _super.call(this);
	        this.state = {
	            leftOffset: null,
	            rightBound: null,
	            start: null,
	            startInput: "",
	            end: null,
	            endInput: ""
	        };
	        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
	    }
	    NumberFilterMenu.prototype.componentWillMount = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var valueSet = essence.filter.getLiteralSet(dimension.expression);
	        var hasRange = valueSet && valueSet.elements.length !== 0;
	        var start = null;
	        var end = null;
	        if (hasRange) {
	            var range = valueSet.elements[0];
	            start = range.start;
	            end = range.end;
	        }
	        this.setState({
	            startInput: numberOrAnyToString(start),
	            endInput: numberOrAnyToString(end),
	            start: start,
	            end: end
	        });
	    };
	    NumberFilterMenu.prototype.componentDidMount = function () {
	        window.addEventListener('keydown', this.globalKeyDownListener);
	    };
	    NumberFilterMenu.prototype.componentWillUnmount = function () {
	        window.removeEventListener('keydown', this.globalKeyDownListener);
	    };
	    NumberFilterMenu.prototype.constructFilter = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, start = _b.start, end = _b.end;
	        var filter = essence.filter;
	        var validFilter = false;
	        if ((start !== null && end !== null)) {
	            validFilter = start <= end;
	        }
	        else {
	            validFilter = (!isNaN(start) && !(isNaN(end))) && (start !== null || end !== null);
	        }
	        if (validFilter) {
	            var bounds = start === end ? '[]' : '[)';
	            var newSet = plywood_1.Set.fromJS({ setType: "NUMBER_RANGE", elements: [plywood_1.NumberRange.fromJS({ start: start, end: end, bounds: bounds })] });
	            var clause = new index_1.FilterClause({
	                expression: dimension.expression,
	                selection: new plywood_1.LiteralExpression({ type: "SET/NUMBER_RANGE", value: newSet })
	            });
	            return filter.setClause(clause);
	        }
	        else {
	            return null;
	        }
	    };
	    NumberFilterMenu.prototype.globalKeyDownListener = function (e) {
	        if (dom_1.enterKey(e)) {
	            this.onOkClick();
	        }
	    };
	    NumberFilterMenu.prototype.onOkClick = function () {
	        if (!this.actionEnabled())
	            return;
	        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
	        clicker.changeFilter(this.constructFilter());
	        onClose();
	    };
	    NumberFilterMenu.prototype.onCancelClick = function () {
	        var onClose = this.props.onClose;
	        onClose();
	    };
	    NumberFilterMenu.prototype.onRangeInputStartChange = function (e) {
	        var startInput = e.target.value;
	        this.setState({
	            startInput: startInput,
	            start: stringToNumberOrAny(startInput)
	        });
	    };
	    NumberFilterMenu.prototype.onRangeInputEndChange = function (e) {
	        var endInput = e.target.value;
	        this.setState({
	            endInput: endInput,
	            end: stringToNumberOrAny(endInput)
	        });
	    };
	    NumberFilterMenu.prototype.onRangeStartChange = function (newStart) {
	        this.setState({ startInput: numberOrAnyToString(newStart), start: newStart });
	    };
	    NumberFilterMenu.prototype.onRangeEndChange = function (newEnd) {
	        this.setState({ endInput: numberOrAnyToString(newEnd), end: newEnd });
	    };
	    NumberFilterMenu.prototype.actionEnabled = function () {
	        var essence = this.props.essence;
	        return !essence.filter.equals(this.constructFilter()) && Boolean(this.constructFilter());
	    };
	    NumberFilterMenu.prototype.render = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, endInput = _b.endInput, startInput = _b.startInput, end = _b.end, start = _b.start;
	        return React.createElement("div", {className: "number-filter-menu", ref: "number-filter-menu"}, React.createElement("div", {className: "side-by-side"}, React.createElement("div", {className: "group"}, React.createElement("label", {className: "input-top-label"}, "Min"), React.createElement("input", {value: startInput, onChange: this.onRangeInputStartChange.bind(this)})), React.createElement("div", {className: "group"}, React.createElement("label", {className: "input-top-label"}, "Max"), React.createElement("input", {value: endInput, onChange: this.onRangeInputEndChange.bind(this)}))), React.createElement(number_range_picker_1.NumberRangePicker, {onRangeEndChange: this.onRangeEndChange.bind(this), onRangeStartChange: this.onRangeStartChange.bind(this), start: start, end: end, dimension: dimension, essence: essence}), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", title: constants_1.STRINGS.ok, onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled()}), React.createElement(button_1.Button, {type: "secondary", title: constants_1.STRINGS.cancel, onClick: this.onCancelClick.bind(this)})));
	    };
	    return NumberFilterMenu;
	}(React.Component));
	exports.NumberFilterMenu = NumberFilterMenu;


/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(464);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./number-filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./number-filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".number-filter-menu .side-by-side{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.number-filter-menu .side-by-side>*{margin-right:5px}.number-filter-menu .side-by-side>*:last-child{margin-right:0}.number-filter-menu .input-top-label{text-transform:uppercase;font-size:12px;color:#a6a6a6;margin-bottom:5px}.number-filter-menu input{border:1px solid #d4d4d4;border-radius:2px;box-shadow:inset 0 1px 1px rgba(0,0,0,0.13);padding-left:6px;padding-right:6px;width:100%;height:30px}.number-filter-menu input:hover{border-color:#b8b8b8}.number-filter-menu input:focus{border-color:#1ea3e6}.number-filter-menu input.error{border-color:#e24c4c}.number-filter-menu .group{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.number-filter-menu input{margin-top:6px}.number-filter-menu input.gray{color:#ccc}\n", ""]);

	// exports


/***/ },

/***/ 465:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(466);
	var React = __webpack_require__(5);
	var ReactDOM = __webpack_require__(42);
	var plywood_1 = __webpack_require__(189);
	var general_1 = __webpack_require__(198);
	var dom_1 = __webpack_require__(254);
	var loader_1 = __webpack_require__(173);
	var query_error_1 = __webpack_require__(289);
	var range_handle_1 = __webpack_require__(468);
	exports.ANY_VALUE = null;
	var NUB_SIZE = 16;
	var GRANULARITY_IN_BAR = 300; // this is how many steps we want to represent in the slider bar
	function addNubSize(value) {
	    return value + NUB_SIZE;
	}
	function subtractNubSize(value) {
	    return value && value > NUB_SIZE ? value - NUB_SIZE : 0;
	}
	function getNumberOfDigitsToShow(n) {
	    var totalDigits = general_1.getNumberOfWholeDigits(n / GRANULARITY_IN_BAR);
	    return totalDigits > 3 ? Math.min(totalDigits, 4) : 3;
	}
	// offset the bar a little because a rectangle at the same position as a circle will peek through
	function getAdjustedStartHalf(start) {
	    return start + NUB_SIZE / 2;
	}
	var NumberRangePicker = (function (_super) {
	    __extends(NumberRangePicker, _super);
	    function NumberRangePicker() {
	        _super.call(this);
	        this.state = {
	            min: null,
	            max: null,
	            step: null,
	            loading: false,
	            error: null
	        };
	    }
	    NumberRangePicker.prototype.fetchData = function (essence, dimension, rightBound) {
	        var _this = this;
	        var dataSource = essence.dataSource;
	        var filterExpression = essence.getEffectiveFilter(null, dimension).toExpression();
	        var $main = plywood_1.$('main');
	        var query = plywood_1.ply()
	            .apply('main', $main.filter(filterExpression))
	            .apply('Min', $main.min(plywood_1.$(dimension.name)))
	            .apply('Max', $main.max(plywood_1.$(dimension.name)));
	        this.setState({
	            loading: true
	        });
	        dataSource.executor(query)
	            .then(function (dataset) {
	            if (!_this.mounted)
	                return;
	            var min = dataset.data[0]['Min'];
	            var max = dataset.data[0]['Max'];
	            var step = max && min && isFinite(max) && isFinite(min) ? (max - min) / rightBound : 1;
	            _this.setState({
	                min: min,
	                max: max,
	                loading: false,
	                step: step !== 0 && isFinite(step) ? step : 1
	            });
	        }, function (error) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                loading: false,
	                error: error
	            });
	        });
	    };
	    NumberRangePicker.prototype.componentDidMount = function () {
	        this.mounted = true;
	        var node = ReactDOM.findDOMNode(this.refs['number-range-picker']);
	        var rect = node.getBoundingClientRect();
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var leftOffset = rect.left;
	        var rightBound = rect.width;
	        this.setState({ leftOffset: leftOffset, rightBound: rightBound });
	        this.fetchData(essence, dimension, rightBound);
	    };
	    NumberRangePicker.prototype.componentWillUnmount = function () {
	        this.mounted = false;
	    };
	    NumberRangePicker.prototype.relativePositionToValue = function (position, type) {
	        var _a = this.state, step = _a.step, min = _a.min, max = _a.max, rightBound = _a.rightBound;
	        if (position <= addNubSize(0) && type === 'start')
	            return exports.ANY_VALUE;
	        if (position >= rightBound && type === 'end')
	            return exports.ANY_VALUE;
	        var range = max - min !== 0 ? max - min : Math.abs(max);
	        return general_1.toSignificantDigits(position * step, getNumberOfDigitsToShow(range));
	    };
	    NumberRangePicker.prototype.valueToRelativePosition = function (value) {
	        var step = this.state.step;
	        return value / step;
	    };
	    NumberRangePicker.prototype.onBarClick = function (positionStart, positionEnd, e) {
	        var leftOffset = this.state.leftOffset;
	        var clickPadding = 5;
	        var absoluteX = dom_1.getXFromEvent(e);
	        var relativeX = absoluteX - leftOffset;
	        if (relativeX < NUB_SIZE / 2)
	            return this.updateStart(leftOffset);
	        var startNubPosition = addNubSize(positionStart) + clickPadding;
	        var endNubPosition = subtractNubSize(positionEnd) + clickPadding;
	        var isBeforeStart = relativeX < positionStart;
	        var isAfterEnd = relativeX > positionEnd + NUB_SIZE;
	        var inBetween = (relativeX < positionEnd) && relativeX > startNubPosition;
	        if (isBeforeStart) {
	            this.updateStart(absoluteX - NUB_SIZE);
	        }
	        else if (isAfterEnd) {
	            this.updateEnd(absoluteX);
	        }
	        else if (inBetween) {
	            var distanceFromEnd = endNubPosition - relativeX;
	            var distanceFromStart = relativeX - startNubPosition;
	            if (distanceFromEnd < distanceFromStart) {
	                this.updateEnd(endNubPosition + leftOffset - distanceFromEnd);
	            }
	            else {
	                this.updateStart(startNubPosition + leftOffset + distanceFromStart - NUB_SIZE);
	            }
	            return;
	        }
	    };
	    NumberRangePicker.prototype.updateStart = function (absolutePosition) {
	        var onRangeStartChange = this.props.onRangeStartChange;
	        var leftOffset = this.state.leftOffset;
	        var relativePosition = absolutePosition - leftOffset;
	        var newValue = this.relativePositionToValue(addNubSize(relativePosition), 'start');
	        onRangeStartChange(newValue);
	    };
	    NumberRangePicker.prototype.updateEnd = function (absolutePosition) {
	        var onRangeEndChange = this.props.onRangeEndChange;
	        var leftOffset = this.state.leftOffset;
	        var relativePosition = absolutePosition - leftOffset;
	        var newValue = this.relativePositionToValue(relativePosition, 'end');
	        onRangeEndChange(newValue);
	    };
	    NumberRangePicker.prototype.render = function () {
	        var _a = this.props, start = _a.start, end = _a.end;
	        var _b = this.state, min = _b.min, max = _b.max, loading = _b.loading, error = _b.error, step = _b.step, rightBound = _b.rightBound, leftOffset = _b.leftOffset;
	        var content = null;
	        if (rightBound && step && isFinite(max) && isFinite(min)) {
	            var relativeStart = start === exports.ANY_VALUE ? 0 : subtractNubSize(this.valueToRelativePosition(start));
	            var relativeEnd = end === exports.ANY_VALUE ? rightBound : this.valueToRelativePosition(end);
	            var adjustedRightBound = subtractNubSize(rightBound);
	            var positionEnd = dom_1.clamp(relativeEnd, addNubSize(relativeStart), adjustedRightBound);
	            var positionStart = start ? dom_1.clamp(relativeStart, 0, subtractNubSize(positionEnd)) : 0;
	            var rangeBarSelected = { left: getAdjustedStartHalf(positionStart), width: positionEnd - positionStart };
	            var absoluteRightBound = leftOffset + rightBound;
	            content = React.createElement("div", {className: "range-slider", onMouseDown: this.onBarClick.bind(this, positionStart, positionEnd)}, React.createElement("div", {className: "range-bar full"}), React.createElement("div", {className: "range-bar selected", style: rangeBarSelected}), React.createElement(range_handle_1.RangeHandle, {positionLeft: positionStart, onChange: this.updateStart.bind(this), isAny: start === exports.ANY_VALUE, isBeyondMin: start !== exports.ANY_VALUE && start < min, leftBound: leftOffset, rightBound: leftOffset + subtractNubSize(positionEnd), offset: leftOffset}), React.createElement(range_handle_1.RangeHandle, {positionLeft: positionEnd, onChange: this.updateEnd.bind(this), isAny: end === exports.ANY_VALUE, isBeyondMax: end !== exports.ANY_VALUE && max < end, leftBound: leftOffset + addNubSize(positionStart), rightBound: absoluteRightBound, offset: leftOffset}));
	        }
	        return React.createElement("div", {className: "number-range-picker", ref: "number-range-picker"}, content, loading ? React.createElement(loader_1.Loader, null) : null, error ? React.createElement(query_error_1.QueryError, {error: error}) : null);
	    };
	    return NumberRangePicker;
	}(React.Component));
	exports.NumberRangePicker = NumberRangePicker;


/***/ },

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(467);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./number-range-picker.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./number-range-picker.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".number-range-picker{margin:10px 0;height:25px}.number-range-picker .range-bar{position:absolute;top:6px;height:6px}.number-range-picker .range-bar.full{background-color:#dedede;left:8px;right:8px}.number-range-picker .range-bar.selected{background-color:#1ea3e6}.number-range-picker .range-handle{position:absolute}.number-range-picker .loader,.number-range-picker .query-error{position:absolute;top:0;bottom:0;left:0;right:0}\n", ""]);

	// exports


/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(469);
	var React = __webpack_require__(5);
	var dom_1 = __webpack_require__(254);
	var RangeHandle = (function (_super) {
	    __extends(RangeHandle, _super);
	    function RangeHandle() {
	        _super.call(this);
	        this.state = {
	            anchor: null
	        };
	        this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
	        this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
	    }
	    RangeHandle.prototype.onGlobalMouseMove = function (event) {
	        var _a = this.props, onChange = _a.onChange, leftBound = _a.leftBound, rightBound = _a.rightBound;
	        var anchor = this.state.anchor;
	        var newX = dom_1.getXFromEvent(event) - anchor;
	        onChange(dom_1.clamp(newX, leftBound, rightBound));
	    };
	    RangeHandle.prototype.onMouseDown = function (event) {
	        var _a = this.props, offset = _a.offset, positionLeft = _a.positionLeft;
	        var x = dom_1.getXFromEvent(event);
	        var anchor = x - offset - positionLeft;
	        this.setState({
	            anchor: anchor
	        });
	        event.preventDefault();
	        window.addEventListener('mouseup', this.onGlobalMouseUp);
	        window.addEventListener('mousemove', this.onGlobalMouseMove);
	    };
	    RangeHandle.prototype.onGlobalMouseUp = function () {
	        window.removeEventListener('mouseup', this.onGlobalMouseUp);
	        window.removeEventListener('mousemove', this.onGlobalMouseMove);
	    };
	    RangeHandle.prototype.render = function () {
	        var _a = this.props, positionLeft = _a.positionLeft, isAny = _a.isAny, isBeyondMin = _a.isBeyondMin, isBeyondMax = _a.isBeyondMax;
	        var style = { left: positionLeft };
	        return React.createElement("div", {className: dom_1.classNames("range-handle", { empty: isAny, "beyond min": isBeyondMin, "beyond max": isBeyondMax }), style: style, onMouseDown: this.onMouseDown.bind(this)});
	    };
	    return RangeHandle;
	}(React.Component));
	exports.RangeHandle = RangeHandle;


/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(470);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./range-handle.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./range-handle.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".range-handle{width:16px;height:16px;background:#1ea3e6;border-radius:50%;border:2px solid #1ea3e6;z-index:2}.range-handle.empty{background:#fff}.range-handle.beyond::before{border-style:solid;border-color:#ededed;border-width:2.5px 2.5px 0 0;content:'';display:inline-block;height:4px;position:relative;top:2.5px;vertical-align:top;width:4px}.range-handle.beyond.min::before{top:3px;left:4px;-webkit-transform:rotate(-135deg);-ms-transform:rotate(-135deg);transform:rotate(-135deg)}.range-handle.beyond.max::before{left:2px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}\n", ""]);

	// exports


/***/ }

});