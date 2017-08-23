"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./filter-tile.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Q = require('q');
var constants_1 = require('../../config/constants');
var index_1 = require('../../../common/models/index');
var formatter_1 = require('../../../common/utils/formatter/formatter');
var pill_tile_1 = require('../../utils/pill-tile/pill-tile');
var dom_1 = require('../../utils/dom/dom');
var drag_manager_1 = require('../../utils/drag-manager/drag-manager');
var svg_icon_1 = require('../svg-icon/svg-icon');
var fancy_drag_indicator_1 = require('../fancy-drag-indicator/fancy-drag-indicator');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var FILTER_CLASS_NAME = 'filter';
var ANIMATION_DURATION = 400;
function formatLabelDummy(dimension) {
    return dimension.title;
}
var FilterTile = (function (_super) {
    __extends(FilterTile, _super);
    function FilterTile() {
        _super.call(this);
        this.overflowMenuId = dom_1.uniqueId('overflow-menu-');
        this.state = {
            FilterMenuAsync: null,
            menuOpenOn: null,
            menuDimension: null,
            menuInside: null,
            overflowMenuOpenOn: null,
            dragPosition: null,
            possibleDimension: null,
            possiblePosition: null,
            maxItems: 20
        };
    }
    FilterTile.prototype.componentDidMount = function () {
        var _this = this;
        require.ensure(['../filter-menu/filter-menu'], function (require) {
            _this.setState({
                FilterMenuAsync: require('../filter-menu/filter-menu').FilterMenu
            });
        }, 'filter-menu');
    };
    FilterTile.prototype.componentWillReceiveProps = function (nextProps) {
        var menuStage = nextProps.menuStage;
        if (menuStage) {
            var newMaxItems = pill_tile_1.getMaxItems(menuStage.width, this.getItemBlanks().length);
            if (newMaxItems !== this.state.maxItems) {
                this.setState({
                    menuOpenOn: null,
                    menuDimension: null,
                    menuInside: null,
                    possibleDimension: null,
                    possiblePosition: null,
                    overflowMenuOpenOn: null,
                    maxItems: newMaxItems
                });
            }
        }
    };
    FilterTile.prototype.componentDidUpdate = function () {
        var _a = this.state, possibleDimension = _a.possibleDimension, overflowMenuOpenOn = _a.overflowMenuOpenOn;
        if (possibleDimension) {
            this.dummyDeferred.resolve(null);
        }
        if (overflowMenuOpenOn) {
            var overflowMenu = this.getOverflowMenu();
            if (overflowMenu)
                this.overflowMenuDeferred.resolve(overflowMenu);
        }
    };
    FilterTile.prototype.overflowButtonTarget = function () {
        return ReactDOM.findDOMNode(this.refs['overflow']);
    };
    FilterTile.prototype.getOverflowMenu = function () {
        return document.getElementById(this.overflowMenuId);
    };
    FilterTile.prototype.clickDimension = function (dimension, e) {
        var target = dom_1.findParentWithClass(e.target, FILTER_CLASS_NAME);
        this.openMenu(dimension, target);
    };
    FilterTile.prototype.openMenuOnDimension = function (dimension) {
        var _this = this;
        var targetRef = this.refs[dimension.name];
        if (targetRef) {
            var target = ReactDOM.findDOMNode(targetRef);
            if (!target)
                return;
            this.openMenu(dimension, target);
        }
        else {
            var overflowButtonTarget = this.overflowButtonTarget();
            if (overflowButtonTarget) {
                this.openOverflowMenu(overflowButtonTarget).then(function () {
                    var target = ReactDOM.findDOMNode(_this.refs[dimension.name]);
                    if (!target)
                        return;
                    _this.openMenu(dimension, target);
                });
            }
        }
    };
    FilterTile.prototype.openMenu = function (dimension, target) {
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
            menuInside: menuInside
        });
    };
    FilterTile.prototype.closeMenu = function () {
        var _a = this.state, menuOpenOn = _a.menuOpenOn, possibleDimension = _a.possibleDimension;
        if (!menuOpenOn)
            return;
        var newState = {
            menuOpenOn: null,
            menuDimension: null,
            menuInside: null,
            possibleDimension: null,
            possiblePosition: null
        };
        if (possibleDimension) {
            // If we are adding a ghost dimension also close the overflow menu
            // This is so it does not remain phantom open with nothing inside
            newState.overflowMenuOpenOn = null;
        }
        this.setState(newState);
    };
    FilterTile.prototype.openOverflowMenu = function (target) {
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
    FilterTile.prototype.closeOverflowMenu = function () {
        var overflowMenuOpenOn = this.state.overflowMenuOpenOn;
        if (!overflowMenuOpenOn)
            return;
        this.setState({
            overflowMenuOpenOn: null
        });
    };
    FilterTile.prototype.removeFilter = function (itemBlank, e) {
        var _a = this.props, essence = _a.essence, clicker = _a.clicker;
        if (itemBlank.clause) {
            if (itemBlank.source === 'from-highlight') {
                clicker.dropHighlight();
            }
            else {
                clicker.changeFilter(essence.filter.remove(itemBlank.clause.expression));
            }
        }
        this.closeMenu();
        this.closeOverflowMenu();
        e.stopPropagation();
    };
    FilterTile.prototype.dragStart = function (dimension, clause, e) {
        var _a = this.props, essence = _a.essence, getUrlPrefix = _a.getUrlPrefix;
        var dataTransfer = e.dataTransfer;
        dataTransfer.effectAllowed = 'all';
        if (getUrlPrefix) {
            var newUrl = essence.getURL(getUrlPrefix());
            dataTransfer.setData("text/url-list", newUrl);
            dataTransfer.setData("text/plain", newUrl);
        }
        drag_manager_1.DragManager.setDragDimension(dimension, 'filter-tile');
        dom_1.setDragGhost(dataTransfer, dimension.title);
        this.closeMenu();
        this.closeOverflowMenu();
    };
    FilterTile.prototype.calculateDragPosition = function (e) {
        var essence = this.props.essence;
        var numItems = essence.filter.length();
        var rect = ReactDOM.findDOMNode(this.refs['items']).getBoundingClientRect();
        var offset = dom_1.getXFromEvent(e) - rect.left;
        return index_1.DragPosition.calculateFromOffset(offset, numItems, constants_1.CORE_ITEM_WIDTH, constants_1.CORE_ITEM_GAP);
    };
    FilterTile.prototype.canDrop = function (e) {
        return Boolean(drag_manager_1.DragManager.getDragDimension());
    };
    FilterTile.prototype.dragEnter = function (e) {
        if (!this.canDrop(e))
            return;
        var dragPosition = this.calculateDragPosition(e);
        if (dragPosition.equals(this.state.dragPosition))
            return;
        this.setState({ dragPosition: dragPosition });
    };
    FilterTile.prototype.dragOver = function (e) {
        if (!this.canDrop(e))
            return;
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
        var dragPosition = this.calculateDragPosition(e);
        if (dragPosition.equals(this.state.dragPosition))
            return;
        this.setState({ dragPosition: dragPosition });
    };
    FilterTile.prototype.dragLeave = function (e) {
        this.setState({ dragPosition: null });
    };
    FilterTile.prototype.drop = function (e) {
        var _this = this;
        if (!this.canDrop(e))
            return;
        e.preventDefault();
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        var filter = essence.filter, dataSource = essence.dataSource;
        var newState = {
            dragPosition: null
        };
        var dimension = drag_manager_1.DragManager.getDragDimension();
        if (dimension) {
            var dragPosition = this.calculateDragPosition(e);
            var tryingToReplaceTime = false;
            if (dragPosition.replace !== null) {
                var targetClause = filter.clauses.get(dragPosition.replace);
                tryingToReplaceTime = targetClause && targetClause.expression.equals(dataSource.timeAttribute);
            }
            var existingClause = filter.clauseForExpression(dimension.expression);
            if (existingClause) {
                var newFilter;
                if (dragPosition.isReplace()) {
                    newFilter = filter.replaceByIndex(dragPosition.replace, existingClause);
                }
                else {
                    newFilter = filter.insertByIndex(dragPosition.insert, existingClause);
                }
                var newFilterSame = filter.equals(newFilter);
                if (!newFilterSame) {
                    clicker.changeFilter(newFilter);
                }
                if (drag_manager_1.DragManager.getDragOrigin() !== 'filter-tile') {
                    if (newFilterSame) {
                        this.filterMenuRequest(dimension);
                    }
                    else {
                        // Wait for the animation to finish to know where to open the menu
                        setTimeout(function () {
                            _this.filterMenuRequest(dimension);
                        }, ANIMATION_DURATION + 50);
                    }
                }
            }
            else {
                if (dragPosition && !tryingToReplaceTime) {
                    this.addDummy(dimension, dragPosition);
                }
            }
        }
        this.setState(newState);
    };
    FilterTile.prototype.addDummy = function (dimension, possiblePosition) {
        var _this = this;
        this.dummyDeferred = Q.defer();
        this.setState({
            possibleDimension: dimension,
            possiblePosition: possiblePosition
        });
        this.dummyDeferred.promise.then(function () {
            _this.openMenuOnDimension(dimension);
        });
    };
    // This will be called externally
    FilterTile.prototype.filterMenuRequest = function (dimension) {
        var filter = this.props.essence.filter;
        if (filter.filteredOn(dimension.expression)) {
            this.openMenuOnDimension(dimension);
        }
        else {
            this.addDummy(dimension, new index_1.DragPosition({ insert: filter.length() }));
        }
    };
    FilterTile.prototype.overflowButtonClick = function () {
        this.openOverflowMenu(this.overflowButtonTarget());
    };
    ;
    FilterTile.prototype.renderMenu = function () {
        var _a = this.props, essence = _a.essence, clicker = _a.clicker, menuStage = _a.menuStage;
        var _b = this.state, FilterMenuAsync = _b.FilterMenuAsync, menuOpenOn = _b.menuOpenOn, menuDimension = _b.menuDimension, menuInside = _b.menuInside, possiblePosition = _b.possiblePosition, maxItems = _b.maxItems, overflowMenuOpenOn = _b.overflowMenuOpenOn;
        if (!FilterMenuAsync || !menuDimension)
            return null;
        if (possiblePosition && possiblePosition.replace === maxItems) {
            possiblePosition = new index_1.DragPosition({ insert: possiblePosition.replace });
        }
        return React.createElement(FilterMenuAsync, {clicker: clicker, essence: essence, direction: "down", containerStage: overflowMenuOpenOn ? null : menuStage, openOn: menuOpenOn, dimension: menuDimension, changePosition: possiblePosition, onClose: this.closeMenu.bind(this), inside: menuInside});
    };
    FilterTile.prototype.renderOverflowMenu = function (overflowItemBlanks) {
        var _this = this;
        var overflowMenuOpenOn = this.state.overflowMenuOpenOn;
        if (!overflowMenuOpenOn)
            return null;
        var segmentHeight = 29 + constants_1.CORE_ITEM_GAP;
        var itemY = constants_1.CORE_ITEM_GAP;
        var filterItems = overflowItemBlanks.map(function (itemBlank) {
            var style = dom_1.transformStyle(0, itemY);
            itemY += segmentHeight;
            return _this.renderItemBlank(itemBlank, style);
        });
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "overflow-menu", id: this.overflowMenuId, direction: "down", stage: index_1.Stage.fromSize(208, itemY), fixedSize: true, openOn: overflowMenuOpenOn, onClose: this.closeOverflowMenu.bind(this)}, filterItems);
    };
    FilterTile.prototype.renderOverflow = function (overflowItemBlanks, itemX) {
        var style = dom_1.transformStyle(itemX, 0);
        return React.createElement("div", {className: dom_1.classNames('overflow', { 'all-continuous': overflowItemBlanks.every(function (item) { return item.dimension.isContinuous(); }) }), ref: "overflow", key: "overflow", style: style, onClick: this.overflowButtonClick.bind(this)}, React.createElement("div", {className: "count"}, '+' + overflowItemBlanks.length), this.renderOverflowMenu(overflowItemBlanks));
    };
    FilterTile.prototype.renderRemoveButton = function (itemBlank) {
        var essence = this.props.essence;
        var dataSource = essence.dataSource;
        if (itemBlank.dimension.expression.equals(dataSource.timeAttribute))
            return null;
        return React.createElement("div", {className: "remove", onClick: this.removeFilter.bind(this, itemBlank)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/x.svg')}));
    };
    FilterTile.prototype.renderItemLabel = function (dimension, clause, timezone) {
        var _a = formatter_1.getFormattedClause(dimension, clause, timezone), title = _a.title, values = _a.values;
        return React.createElement("div", {className: "reading"}, title ? React.createElement("span", {className: "dimension-title"}, title) : null, React.createElement("span", {className: "values"}, values));
    };
    FilterTile.prototype.renderItemBlank = function (itemBlank, style) {
        var _a = this.props, essence = _a.essence, clicker = _a.clicker;
        var menuDimension = this.state.menuDimension;
        var dimension = itemBlank.dimension, clause = itemBlank.clause, source = itemBlank.source;
        var dimensionName = dimension.name;
        var className = [
            FILTER_CLASS_NAME,
            'type-' + dimension.className,
            source,
            (clause && clause.exclude) ? 'excluded' : 'included',
            dimension === menuDimension ? 'selected' : undefined
        ].filter(Boolean).join(' ');
        var evaluatedClause = dimension.kind === 'time' ? essence.evaluateClause(clause) : clause;
        var timezone = essence.timezone;
        if (source === 'from-highlight') {
            return React.createElement("div", {className: className, key: dimensionName, ref: dimensionName, onClick: clicker.acceptHighlight.bind(clicker), style: style}, this.renderItemLabel(dimension, evaluatedClause, timezone), this.renderRemoveButton(itemBlank));
        }
        if (clause) {
            return React.createElement("div", {className: className, key: dimensionName, ref: dimensionName, draggable: true, onClick: this.clickDimension.bind(this, dimension), onDragStart: this.dragStart.bind(this, dimension, clause), style: style}, this.renderItemLabel(dimension, evaluatedClause, timezone), this.renderRemoveButton(itemBlank));
        }
        else {
            return React.createElement("div", {className: className, key: dimensionName, ref: dimensionName, style: style}, React.createElement("div", {className: "reading"}, formatLabelDummy(dimension)), this.renderRemoveButton(itemBlank));
        }
    };
    FilterTile.prototype.getItemBlanks = function () {
        var essence = this.props.essence;
        var _a = this.state, possibleDimension = _a.possibleDimension, possiblePosition = _a.possiblePosition, maxItems = _a.maxItems;
        var dataSource = essence.dataSource, filter = essence.filter, highlight = essence.highlight;
        var itemBlanks = filter.clauses.toArray()
            .map(function (clause) {
            var dimension = dataSource.getDimensionByExpression(clause.expression);
            if (!dimension)
                return null;
            return {
                dimension: dimension,
                source: 'from-filter',
                clause: clause
            };
        })
            .filter(Boolean);
        if (highlight) {
            highlight.delta.clauses.forEach(function (clause) {
                var added = false;
                itemBlanks = itemBlanks.map(function (blank) {
                    if (clause.expression.equals(blank.clause.expression)) {
                        added = true;
                        return {
                            dimension: blank.dimension,
                            source: 'from-highlight',
                            clause: clause
                        };
                    }
                    else {
                        return blank;
                    }
                });
                if (!added) {
                    var dimension = dataSource.getDimensionByExpression(clause.expression);
                    if (dimension) {
                        itemBlanks.push({
                            dimension: dimension,
                            source: 'from-highlight',
                            clause: clause
                        });
                    }
                }
            });
        }
        if (possibleDimension && possiblePosition) {
            var dummyBlank = {
                dimension: possibleDimension,
                source: 'from-drag'
            };
            if (possiblePosition.replace === maxItems) {
                possiblePosition = new index_1.DragPosition({ insert: possiblePosition.replace });
            }
            if (possiblePosition.isInsert()) {
                itemBlanks.splice(possiblePosition.insert, 0, dummyBlank);
            }
            else {
                itemBlanks[possiblePosition.replace] = dummyBlank;
            }
        }
        return itemBlanks;
    };
    FilterTile.prototype.render = function () {
        var _this = this;
        var _a = this.state, dragPosition = _a.dragPosition, maxItems = _a.maxItems;
        var itemBlanks = this.getItemBlanks();
        var itemX = 0;
        var filterItems = itemBlanks.slice(0, maxItems).map(function (item) {
            var style = dom_1.transformStyle(itemX, 0);
            itemX += pill_tile_1.SECTION_WIDTH;
            return _this.renderItemBlank(item, style);
        });
        var overflow = itemBlanks.slice(maxItems);
        if (overflow.length > 0) {
            var overFlowStart = filterItems.length * pill_tile_1.SECTION_WIDTH;
            filterItems.push(this.renderOverflow(overflow, overFlowStart));
        }
        return React.createElement("div", {className: 'filter-tile', onDragEnter: this.dragEnter.bind(this)}, React.createElement("div", {className: "title"}, constants_1.STRINGS.filter), React.createElement("div", {className: "items", ref: "items"}, filterItems), dragPosition ? React.createElement(fancy_drag_indicator_1.FancyDragIndicator, {dragPosition: dragPosition}) : null, dragPosition ? React.createElement("div", {className: "drag-mask", onDragOver: this.dragOver.bind(this), onDragLeave: this.dragLeave.bind(this), onDrop: this.drop.bind(this)}) : null, this.renderMenu());
    };
    return FilterTile;
}(React.Component));
exports.FilterTile = FilterTile;
