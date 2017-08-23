"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./measures-tile.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var dom_1 = require('../../utils/dom/dom');
var localStorage = require('../../utils/local-storage/local-storage');
var checkbox_1 = require('../checkbox/checkbox');
var highlight_string_1 = require('../highlight-string/highlight-string');
var searchable_tile_1 = require('../searchable-tile/searchable-tile');
var MeasuresTile = (function (_super) {
    __extends(MeasuresTile, _super);
    function MeasuresTile() {
        _super.call(this);
        this.state = {
            showSearch: false,
            searchText: ''
        };
    }
    MeasuresTile.prototype.measureClick = function (measure, e) {
        if (e.altKey && typeof console !== 'undefined') {
            console.log("Measure: " + measure.name);
            console.log("expression: " + measure.expression.toString());
            return;
        }
        var clicker = this.props.clicker;
        clicker.toggleEffectiveMeasure(measure);
    };
    MeasuresTile.prototype.toggleSearch = function () {
        var showSearch = this.state.showSearch;
        this.setState({ showSearch: !showSearch });
        this.onSearchChange('');
    };
    MeasuresTile.prototype.onSearchChange = function (text) {
        var searchText = this.state.searchText;
        var newSearchText = text.substr(0, constants_1.MAX_SEARCH_LENGTH);
        if (searchText === newSearchText)
            return; // nothing to do;
        this.setState({
            searchText: newSearchText
        });
    };
    MeasuresTile.prototype.toggleMultiMeasure = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        clicker.toggleMultiMeasureMode();
        localStorage.set('is-multi-measure', !essence.getEffectiveMultiMeasureMode());
    };
    MeasuresTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, essence = _a.essence, style = _a.style;
        var _b = this.state, showSearch = _b.showSearch, searchText = _b.searchText;
        var dataSource = essence.dataSource;
        var multiMeasureMode = essence.getEffectiveMultiMeasureMode();
        var selectedMeasures = essence.getEffectiveSelectedMeasure();
        var checkboxType = multiMeasureMode ? 'check' : 'radio';
        var shownMeasures = dataSource.measures.toArray();
        if (searchText) {
            shownMeasures = shownMeasures.filter(function (r) {
                return r.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
        }
        var rows = shownMeasures.map(function (measure) {
            var measureName = measure.name;
            var selected = selectedMeasures.has(measureName);
            return React.createElement("div", {className: dom_1.classNames('row', { selected: selected }), key: measureName, onClick: _this.measureClick.bind(_this, measure)}, React.createElement(checkbox_1.Checkbox, {type: checkboxType, selected: selected}), React.createElement(highlight_string_1.HighlightString, {className: "label", text: measure.title, highlightText: searchText}));
        });
        var message = null;
        if (searchText && !rows.length) {
            message = React.createElement("div", {className: "message"}, "No " + constants_1.STRINGS.measures.toLowerCase() + " for \"" + searchText + "\"");
        }
        var icons = [];
        if (!essence.isFixedMeasureMode()) {
            icons.push({
                name: 'multi',
                onClick: this.toggleMultiMeasure.bind(this),
                svg: require('../../icons/full-multi.svg'),
                active: multiMeasureMode
            });
        }
        icons.push({
            name: 'search',
            ref: 'search',
            onClick: this.toggleSearch.bind(this),
            svg: require('../../icons/full-search.svg'),
            active: showSearch
        });
        // More icons to add later
        //{ name: 'more', onClick: null, svg: require('../../icons/full-more-mini.svg') }
        return React.createElement(searchable_tile_1.SearchableTile, {style: style, title: constants_1.STRINGS.measures, toggleChangeFn: this.toggleSearch.bind(this), onSearchChange: this.onSearchChange.bind(this), searchText: searchText, showSearch: showSearch, icons: icons, className: 'measures-tile'}, React.createElement("div", {className: "rows"}, rows, message));
    };
    ;
    return MeasuresTile;
}(React.Component));
exports.MeasuresTile = MeasuresTile;
