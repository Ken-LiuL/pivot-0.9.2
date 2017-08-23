"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./split-tile.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Q = require('q');
var svg_icon_1 = require('../svg-icon/svg-icon');
var constants_1 = require('../../config/constants');
var index_1 = require('../../../common/models/index');
var dom_1 = require('../../utils/dom/dom');
var pill_tile_1 = require('../../utils/pill-tile/pill-tile');
var drag_manager_1 = require('../../utils/drag-manager/drag-manager');
var fancy_drag_indicator_1 = require('../fancy-drag-indicator/fancy-drag-indicator');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var SPLIT_CLASS_NAME = 'split';
var SplitTile = (function (_super) {
    __extends(SplitTile, _super);
    function SplitTile() {
        _super.call(this);
        this.overflowMenuId = dom_1.uniqueId('overflow-menu-');
        this.state = {
            SplitMenuAsync: null,
            menuOpenOn: null,
            menuDimension: null,
            dragPosition: null,
            maxItems: null
        };
    }
    SplitTile.prototype.componentDidMount = function () {
        var _this = this;
        require.ensure(['../split-menu/split-menu'], function (require) {
            _this.setState({
                SplitMenuAsync: require('../split-menu/split-menu').SplitMenu
            });
        }, 'split-menu');
    };
    SplitTile.prototype.componentWillReceiveProps = function (nextProps) {
        var menuStage = nextProps.menuStage, essence = nextProps.essence;
        var splits = essence.splits;
        if (menuStage) {
            var newMaxItems = pill_tile_1.getMaxItems(menuStage.width, splits.toArray().length);
            if (newMaxItems !== this.state.maxItems) {
                this.setState({
                    menuOpenOn: null,
                    menuDimension: null,
                    overflowMenuOpenOn: null,
                    maxItems: newMaxItems
                });
            }
        }
    };
    SplitTile.prototype.componentDidUpdate = function () {
        var overflowMenuOpenOn = this.state.overflowMenuOpenOn;
        if (overflowMenuOpenOn) {
            var overflowMenu = this.getOverflowMenu();
            if (overflowMenu)
                this.overflowMenuDeferred.resolve(overflowMenu);
        }
    };
    SplitTile.prototype.selectDimensionSplit = function (dimension, split, e) {
        var target = dom_1.findParentWithClass(e.target, SPLIT_CLASS_NAME);
        this.openMenu(dimension, split, target);
    };
    SplitTile.prototype.openMenu = function (dimension, split, target) {
        var menuOpenOn = this.state.menuOpenOn;
        if (menuOpenOn === target) {
            this.closeMenu();
            return;
        }
        var overflowMenu = this.getOverflowMenu();
        var menuInside = null;
        if (overflowMenu && dom_1.isInside(target, overflowMenu)) {
            menuInside = overflowMenu;
        }
        this.setState({
            menuOpenOn: target,
            menuDimension: dimension,
            menuSplit: split,
            menuInside: menuInside
        });
    };
    SplitTile.prototype.closeMenu = function () {
        var menuOpenOn = this.state.menuOpenOn;
        if (!menuOpenOn)
            return;
        this.setState({
            menuOpenOn: null,
            menuDimension: null,
            menuInside: null,
            menuSplit: null
        });
    };
    SplitTile.prototype.getOverflowMenu = function () {
        return document.getElementById(this.overflowMenuId);
    };
    SplitTile.prototype.openOverflowMenu = function (target) {
        if (!target)
            return;
        var overflowMenuOpenOn = this.state.overflowMenuOpenOn;
        if (overflowMenuOpenOn === target) {
            this.closeOverflowMenu();
            return;
        }
        this.overflowMenuDeferred = Q.defer();
        this.setState({ overflowMenuOpenOn: target });
        return this.overflowMenuDeferred.promise;
    };
    SplitTile.prototype.closeOverflowMenu = function () {
        var overflowMenuOpenOn = this.state.overflowMenuOpenOn;
        if (!overflowMenuOpenOn)
            return;
        this.setState({
            overflowMenuOpenOn: null
        });
    };
    SplitTile.prototype.removeSplit = function (split, e) {
        var clicker = this.props.clicker;
        clicker.removeSplit(split, index_1.VisStrategy.FairGame);
        this.closeMenu();
        this.closeOverflowMenu();
        e.stopPropagation();
    };
    SplitTile.prototype.dragStart = function (dimension, split, splitIndex, e) {
        var _a = this.props, essence = _a.essence, getUrlPrefix = _a.getUrlPrefix;
        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = 'all';
        if (getUrlPrefix) {
            var newUrl = essence.changeSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.FairGame).getURL(getUrlPrefix());
            dataTransfer.setData("text/url-list", newUrl);
            dataTransfer.setData("text/plain", newUrl);
        }
        drag_manager_1.DragManager.setDragSplit(split, 'filter-tile');
        drag_manager_1.DragManager.setDragDimension(dimension, 'filter-tile');
        dom_1.setDragGhost(dataTransfer, dimension.title);
        this.closeMenu();
        this.closeOverflowMenu();
    };
    SplitTile.prototype.calculateDragPosition = function (e) {
        var essence = this.props.essence;
        var numItems = essence.splits.length();
        var rect = ReactDOM.findDOMNode(this.refs['items']).getBoundingClientRect();
        var x = dom_1.getXFromEvent(e);
        var offset = x - rect.left;
        return index_1.DragPosition.calculateFromOffset(offset, numItems, constants_1.CORE_ITEM_WIDTH, constants_1.CORE_ITEM_GAP);
    };
    SplitTile.prototype.canDrop = function (e) {
        return Boolean(drag_manager_1.DragManager.getDragSplit() || drag_manager_1.DragManager.getDragDimension());
    };
    SplitTile.prototype.dragEnter = function (e) {
        if (!this.canDrop(e))
            return;
        this.setState({
            dragPosition: this.calculateDragPosition(e)
        });
    };
    SplitTile.prototype.dragOver = function (e) {
        if (!this.canDrop(e))
            return;
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
        var dragPosition = this.calculateDragPosition(e);
        if (dragPosition.equals(this.state.dragPosition))
            return;
        this.setState({ dragPosition: dragPosition });
    };
    SplitTile.prototype.dragLeave = function (e) {
        if (!this.canDrop(e))
            return;
        this.setState({
            dragPosition: null
        });
    };
    SplitTile.prototype.drop = function (e) {
        if (!this.canDrop(e))
            return;
        e.preventDefault();
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        var maxItems = this.state.maxItems;
        var splits = essence.splits;
        var newSplitCombine = null;
        if (drag_manager_1.DragManager.getDragSplit()) {
            newSplitCombine = drag_manager_1.DragManager.getDragSplit();
        }
        else if (drag_manager_1.DragManager.getDragDimension()) {
            newSplitCombine = index_1.SplitCombine.fromExpression(drag_manager_1.DragManager.getDragDimension().expression);
        }
        if (newSplitCombine) {
            var dragPosition = this.calculateDragPosition(e);
            if (dragPosition.replace === maxItems) {
                dragPosition = new index_1.DragPosition({ insert: dragPosition.replace });
            }
            if (dragPosition.isReplace()) {
                clicker.changeSplits(splits.replaceByIndex(dragPosition.replace, newSplitCombine), index_1.VisStrategy.FairGame);
            }
            else {
                clicker.changeSplits(splits.insertByIndex(dragPosition.insert, newSplitCombine), index_1.VisStrategy.FairGame);
            }
        }
        this.setState({
            dragPosition: null
        });
    };
    // This will be called externally
    SplitTile.prototype.splitMenuRequest = function (dimension) {
        var splits = this.props.essence.splits;
        var split = splits.findSplitForDimension(dimension);
        if (!split)
            return;
        var targetRef = this.refs[dimension.name];
        if (!targetRef)
            return;
        var target = ReactDOM.findDOMNode(targetRef);
        if (!target)
            return;
        this.openMenu(dimension, split, target);
    };
    SplitTile.prototype.overflowButtonTarget = function () {
        return ReactDOM.findDOMNode(this.refs['overflow']);
    };
    SplitTile.prototype.overflowButtonClick = function () {
        this.openOverflowMenu(this.overflowButtonTarget());
    };
    ;
    SplitTile.prototype.renderMenu = function () {
        var _a = this.props, essence = _a.essence, clicker = _a.clicker, menuStage = _a.menuStage;
        var _b = this.state, SplitMenuAsync = _b.SplitMenuAsync, menuOpenOn = _b.menuOpenOn, menuDimension = _b.menuDimension, menuSplit = _b.menuSplit, menuInside = _b.menuInside, overflowMenuOpenOn = _b.overflowMenuOpenOn;
        if (!SplitMenuAsync || !menuDimension)
            return null;
        var onClose = this.closeMenu.bind(this);
        return React.createElement(SplitMenuAsync, {clicker: clicker, essence: essence, containerStage: overflowMenuOpenOn ? null : menuStage, openOn: menuOpenOn, dimension: menuDimension, split: menuSplit, onClose: onClose, inside: menuInside});
    };
    SplitTile.prototype.renderOverflowMenu = function (items) {
        var _this = this;
        var overflowMenuOpenOn = this.state.overflowMenuOpenOn;
        if (!overflowMenuOpenOn)
            return null;
        var segmentHeight = 29 + constants_1.CORE_ITEM_GAP;
        var itemY = constants_1.CORE_ITEM_GAP;
        var filterItems = items.map(function (item, i) {
            var style = dom_1.transformStyle(0, itemY);
            itemY += segmentHeight;
            return _this.renderSplit(item, style, i);
        });
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "overflow-menu", id: this.overflowMenuId, direction: "down", stage: index_1.Stage.fromSize(208, itemY), fixedSize: true, openOn: overflowMenuOpenOn, onClose: this.closeOverflowMenu.bind(this)}, filterItems);
    };
    SplitTile.prototype.renderOverflow = function (items, itemX) {
        var essence = this.props.essence;
        var dataSource = essence.dataSource;
        var style = dom_1.transformStyle(itemX, 0);
        return React.createElement("div", {className: dom_1.classNames('overflow', { 'all-continuous': items.every(function (item) { return item.getDimension(dataSource.dimensions).isContinuous(); }) }), ref: "overflow", key: "overflow", style: style, onClick: this.overflowButtonClick.bind(this)}, React.createElement("div", {className: "count"}, '+' + items.length), this.renderOverflowMenu(items));
    };
    SplitTile.prototype.renderSplit = function (split, style, i) {
        var essence = this.props.essence;
        var menuDimension = this.state.menuDimension;
        var dataSource = essence.dataSource;
        var dimension = split.getDimension(dataSource.dimensions);
        if (!dimension)
            throw new Error('dimension not found');
        var dimensionName = dimension.name;
        var classNames = [
            SPLIT_CLASS_NAME,
            'type-' + dimension.className
        ];
        if (dimension === menuDimension)
            classNames.push('selected');
        return React.createElement("div", {className: classNames.join(' '), key: split.toKey(), ref: dimensionName, draggable: true, onClick: this.selectDimensionSplit.bind(this, dimension, split), onDragStart: this.dragStart.bind(this, dimension, split, i), style: style}, React.createElement("div", {className: "reading"}, split.getTitle(dataSource.dimensions)), React.createElement("div", {className: "remove", onClick: this.removeSplit.bind(this, split)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/x.svg')})));
    };
    SplitTile.prototype.render = function () {
        var _this = this;
        var essence = this.props.essence;
        var _a = this.state, dragPosition = _a.dragPosition, maxItems = _a.maxItems;
        var splits = essence.splits;
        var splitsArray = splits.toArray();
        var itemX = 0;
        var splitItems = splitsArray.slice(0, maxItems).map(function (split, i) {
            var style = dom_1.transformStyle(itemX, 0);
            itemX += pill_tile_1.SECTION_WIDTH;
            return _this.renderSplit(split, style, i);
        }, this);
        var overflowItems = splitsArray.slice(maxItems);
        if (overflowItems.length > 0) {
            var overFlowStart = splitItems.length * pill_tile_1.SECTION_WIDTH;
            splitItems.push(this.renderOverflow(overflowItems, overFlowStart));
        }
        return React.createElement("div", {className: "split-tile", onDragEnter: this.dragEnter.bind(this)}, React.createElement("div", {className: "title"}, constants_1.STRINGS.split), React.createElement("div", {className: "items", ref: "items"}, splitItems), dragPosition ? React.createElement(fancy_drag_indicator_1.FancyDragIndicator, {dragPosition: dragPosition}) : null, dragPosition ? React.createElement("div", {className: "drag-mask", onDragOver: this.dragOver.bind(this), onDragLeave: this.dragLeave.bind(this), onDrop: this.drop.bind(this)}) : null, this.renderMenu());
    };
    return SplitTile;
}(React.Component));
exports.SplitTile = SplitTile;
