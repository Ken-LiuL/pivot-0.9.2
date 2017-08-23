"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./searchable-tile.css');
var React = require('react');
var ReactDOM = require('react-dom');
var index_1 = require('../../../common/models/index');
var dom_1 = require('../../utils/dom/dom');
var tile_header_1 = require('../tile-header/tile-header');
var clearable_input_1 = require('../clearable-input/clearable-input');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var SearchableTile = (function (_super) {
    __extends(SearchableTile, _super);
    function SearchableTile() {
        _super.call(this);
        this.state = {
            actionsMenuOpenOn: null
        };
        this.globalMouseDownListener = this.globalMouseDownListener.bind(this);
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    SearchableTile.prototype.componentDidMount = function () {
        this.mounted = true;
        this.setState({ actionsMenuAlignOn: ReactDOM.findDOMNode(this.refs['header']) });
        window.addEventListener('mousedown', this.globalMouseDownListener);
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    SearchableTile.prototype.componentWillUnmount = function () {
        this.mounted = false;
        window.removeEventListener('mousedown', this.globalMouseDownListener);
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    SearchableTile.prototype.globalMouseDownListener = function (e) {
        var _a = this.props, searchText = _a.searchText, toggleChangeFn = _a.toggleChangeFn;
        // Remove search if it looses focus while empty
        if (searchText !== '')
            return;
        var target = e.target;
        var searchBoxElement = ReactDOM.findDOMNode(this.refs['search-box']);
        if (!searchBoxElement || dom_1.isInside(target, searchBoxElement))
            return;
        var headerRef = this.refs['header'];
        if (!headerRef)
            return;
        var searchButtonElement = ReactDOM.findDOMNode(headerRef.refs['search']);
        if (!searchButtonElement || dom_1.isInside(target, searchButtonElement))
            return;
        toggleChangeFn();
    };
    SearchableTile.prototype.globalKeyDownListener = function (e) {
        var _a = this.props, toggleChangeFn = _a.toggleChangeFn, showSearch = _a.showSearch;
        if (!dom_1.escapeKey(e))
            return;
        if (!showSearch)
            return;
        toggleChangeFn();
    };
    SearchableTile.prototype.onActionsMenuClose = function () {
        var actionsMenuOpenOn = this.state.actionsMenuOpenOn;
        if (!actionsMenuOpenOn)
            return;
        this.setState({
            actionsMenuOpenOn: null
        });
    };
    SearchableTile.prototype.onActionsMenuClick = function (e) {
        var actionsMenuOpenOn = this.state.actionsMenuOpenOn;
        if (actionsMenuOpenOn)
            return this.onActionsMenuClose();
        this.setState({
            actionsMenuOpenOn: e.target
        });
    };
    SearchableTile.prototype.onSelectGranularity = function (action) {
        this.onActionsMenuClose();
        action.onSelect();
    };
    SearchableTile.prototype.renderGranularityElements = function () {
        var _this = this;
        var actions = this.props.actions;
        return actions.map(function (action) {
            return React.createElement("li", {className: dom_1.classNames({ selected: action.selected }), key: action.keyString || action.toString(), onClick: _this.onSelectGranularity.bind(_this, action)}, action.displayValue || action.toString());
        });
    };
    SearchableTile.prototype.renderActionsMenu = function () {
        var _a = this.state, actionsMenuOpenOn = _a.actionsMenuOpenOn, actionsMenuAlignOn = _a.actionsMenuAlignOn;
        var stage = index_1.Stage.fromSize(180, 200);
        return React.createElement(bubble_menu_1.BubbleMenu, {align: "end", className: "dimension-tile-actions", direction: "down", stage: stage, onClose: this.onActionsMenuClose.bind(this), openOn: actionsMenuOpenOn, alignOn: actionsMenuAlignOn}, React.createElement("ul", {className: "bubble-list"}, this.renderGranularityElements()));
    };
    SearchableTile.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, icons = _a.icons, title = _a.title, onSearchChange = _a.onSearchChange, showSearch = _a.showSearch, searchText = _a.searchText, children = _a.children, onDragStart = _a.onDragStart, actions = _a.actions;
        var actionsMenuOpenOn = this.state.actionsMenuOpenOn;
        var tileIcons = icons;
        if (actions && actions.length > 0) {
            tileIcons = [{
                    name: 'more',
                    ref: 'more',
                    onClick: this.onActionsMenuClick.bind(this),
                    svg: require('../../icons/full-more.svg'),
                    active: Boolean(actionsMenuOpenOn)
                }].concat(icons);
        }
        var qualifiedClassName = "searchable-tile " + className;
        var header = React.createElement(tile_header_1.TileHeader, {title: title, ref: "header", icons: tileIcons, onDragStart: onDragStart});
        var searchBar = null;
        if (showSearch) {
            searchBar = React.createElement("div", {className: "search-box", ref: "search-box"}, React.createElement(clearable_input_1.ClearableInput, {placeholder: "Search", focusOnMount: true, value: searchText, onChange: onSearchChange.bind(this)}));
        }
        qualifiedClassName = dom_1.classNames(qualifiedClassName, (showSearch ? 'has-search' : 'no-search'));
        return React.createElement("div", {className: qualifiedClassName, style: style}, header, searchBar, actionsMenuOpenOn ? this.renderActionsMenu() : null, children);
    };
    return SearchableTile;
}(React.Component));
exports.SearchableTile = SearchableTile;
