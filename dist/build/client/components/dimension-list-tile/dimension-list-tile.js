"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./dimension-list-tile.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var drag_manager_1 = require('../../utils/drag-manager/drag-manager');
var dom_1 = require('../../utils/dom/dom');
var index_1 = require('../../../common/models/index');
var svg_icon_1 = require('../svg-icon/svg-icon');
var highlight_string_1 = require('../highlight-string/highlight-string');
var searchable_tile_1 = require('../searchable-tile/searchable-tile');
var DIMENSION_CLASS_NAME = 'dimension';
var DimensionListTile = (function (_super) {
    __extends(DimensionListTile, _super);
    function DimensionListTile() {
        _super.call(this);
        this.state = {
            DimensionActionsMenuAsync: null,
            menuOpenOn: null,
            menuDimension: null,
            highlightDimension: null,
            showSearch: false,
            searchText: ''
        };
    }
    DimensionListTile.prototype.componentDidMount = function () {
        var _this = this;
        require.ensure(['../dimension-actions-menu/dimension-actions-menu'], function (require) {
            _this.setState({
                DimensionActionsMenuAsync: require('../dimension-actions-menu/dimension-actions-menu').DimensionActionsMenu
            });
        }, 'dimension-actions-menu');
    };
    DimensionListTile.prototype.clickDimension = function (dimension, e) {
        var menuOpenOn = this.state.menuOpenOn;
        var target = dom_1.findParentWithClass(e.target, DIMENSION_CLASS_NAME);
        if (menuOpenOn === target) {
            this.closeMenu();
            return;
        }
        this.setState({
            menuOpenOn: target,
            menuDimension: dimension
        });
    };
    DimensionListTile.prototype.closeMenu = function () {
        var menuOpenOn = this.state.menuOpenOn;
        if (!menuOpenOn)
            return;
        this.setState({
            menuOpenOn: null,
            menuDimension: null
        });
    };
    DimensionListTile.prototype.dragStart = function (dimension, e) {
        var _a = this.props, essence = _a.essence, getUrlPrefix = _a.getUrlPrefix;
        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = 'all';
        if (getUrlPrefix) {
            var newUrl = essence.changeSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.FairGame).getURL(getUrlPrefix());
            dataTransfer.setData("text/url-list", newUrl);
            dataTransfer.setData("text/plain", newUrl);
        }
        drag_manager_1.DragManager.setDragDimension(dimension, 'dimension-list-tile');
        dom_1.setDragGhost(dataTransfer, dimension.title);
        this.closeMenu();
    };
    DimensionListTile.prototype.onMouseOver = function (dimension) {
        var highlightDimension = this.state.highlightDimension;
        if (highlightDimension === dimension)
            return;
        this.setState({
            highlightDimension: dimension
        });
    };
    DimensionListTile.prototype.onMouseLeave = function (dimension) {
        var highlightDimension = this.state.highlightDimension;
        if (highlightDimension !== dimension)
            return;
        this.setState({
            highlightDimension: null
        });
    };
    DimensionListTile.prototype.toggleSearch = function () {
        var showSearch = this.state.showSearch;
        this.setState({ showSearch: !showSearch });
        this.onSearchChange('');
    };
    DimensionListTile.prototype.onSearchChange = function (text) {
        var searchText = this.state.searchText;
        var newSearchText = text.substr(0, constants_1.MAX_SEARCH_LENGTH);
        if (searchText === newSearchText)
            return; // nothing to do;
        this.setState({
            searchText: newSearchText
        });
    };
    DimensionListTile.prototype.renderMenu = function () {
        var _a = this.props, essence = _a.essence, clicker = _a.clicker, menuStage = _a.menuStage, triggerFilterMenu = _a.triggerFilterMenu, triggerSplitMenu = _a.triggerSplitMenu;
        var _b = this.state, DimensionActionsMenuAsync = _b.DimensionActionsMenuAsync, menuOpenOn = _b.menuOpenOn, menuDimension = _b.menuDimension;
        if (!DimensionActionsMenuAsync || !menuDimension)
            return null;
        var onClose = this.closeMenu.bind(this);
        return React.createElement(DimensionActionsMenuAsync, {clicker: clicker, essence: essence, direction: "right", containerStage: menuStage, openOn: menuOpenOn, dimension: menuDimension, triggerFilterMenu: triggerFilterMenu, triggerSplitMenu: triggerSplitMenu, onClose: onClose});
    };
    DimensionListTile.prototype.render = function () {
        var _this = this;
        var _a = this.props, essence = _a.essence, style = _a.style;
        var _b = this.state, menuDimension = _b.menuDimension, highlightDimension = _b.highlightDimension, showSearch = _b.showSearch, searchText = _b.searchText;
        var dataSource = essence.dataSource;
        var shownDimensions = dataSource.dimensions.toArray();
        var itemY = 0;
        if (searchText) {
            shownDimensions = shownDimensions.filter(function (r) {
                return r.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
        }
        var dimensionItems = shownDimensions.map(function (dimension) {
            var className = dom_1.classNames(DIMENSION_CLASS_NAME, 'type-' + dimension.className, {
                highlight: dimension === highlightDimension,
                selected: dimension === menuDimension
            });
            var style = dom_1.transformStyle(0, itemY);
            itemY += constants_1.DIMENSION_HEIGHT;
            return React.createElement("div", {className: className, key: dimension.name, onClick: _this.clickDimension.bind(_this, dimension), onMouseOver: _this.onMouseOver.bind(_this, dimension), onMouseLeave: _this.onMouseLeave.bind(_this, dimension), draggable: true, onDragStart: _this.dragStart.bind(_this, dimension), style: style}, React.createElement("div", {className: "icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/dim-' + dimension.className + '.svg')})), React.createElement("div", {className: "item-title"}, React.createElement(highlight_string_1.HighlightString, {className: "label", text: dimension.title, highlightText: searchText})));
        }, this);
        var message = null;
        if (searchText && !dimensionItems.length) {
            message = React.createElement("div", {className: "message"}, "No " + constants_1.STRINGS.dimensions.toLowerCase() + " for \"" + searchText + "\"");
        }
        var icons = [
            //{ name: 'more', onClick: null, svg: require('../../icons/full-more-mini.svg') }
            {
                name: 'search',
                ref: 'search',
                onClick: this.toggleSearch.bind(this),
                svg: require('../../icons/full-search.svg'),
                active: showSearch
            }
        ];
        return React.createElement(searchable_tile_1.SearchableTile, {style: style, title: constants_1.STRINGS.dimensions, toggleChangeFn: this.toggleSearch.bind(this), onSearchChange: this.onSearchChange.bind(this), searchText: searchText, showSearch: showSearch, icons: icons, className: 'dimension-list-tile'}, React.createElement("div", {className: "items", ref: "items"}, dimensionItems, message), this.renderMenu());
    };
    return DimensionListTile;
}(React.Component));
exports.DimensionListTile = DimensionListTile;
