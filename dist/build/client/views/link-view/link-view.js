"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./link-view.css');
var React = require('react');
var ReactDOM = require('react-dom');
var plywood_1 = require('plywood');
var dom_1 = require('../../utils/dom/dom');
var index_1 = require('../../../common/models/index');
var localStorage = require('../../utils/local-storage/local-storage');
var link_header_bar_1 = require('../../components/link-header-bar/link-header-bar');
var manual_fallback_1 = require('../../components/manual-fallback/manual-fallback');
var pinboard_panel_1 = require('../../components/pinboard-panel/pinboard-panel');
var button_group_1 = require('../../components/button-group/button-group');
var resize_handle_1 = require('../../components/resize-handle/resize-handle');
var index_2 = require('../../visualizations/index');
var $maxTime = plywood_1.$(index_1.FilterClause.MAX_TIME_REF_NAME);
var latestPresets = [
    { name: '5M', selection: $maxTime.timeRange('PT5M', -1) },
    { name: '1H', selection: $maxTime.timeRange('PT1H', -1) },
    { name: '1D', selection: $maxTime.timeRange('P1D', -1) },
    { name: '1W', selection: $maxTime.timeRange('P1W', -1) }
];
var MIN_PANEL_WIDTH = 240;
var MAX_PANEL_WIDTH = 400;
var LinkView = (function (_super) {
    __extends(LinkView, _super);
    function LinkView() {
        var _this = this;
        _super.call(this);
        this.state = {
            linkItem: null,
            essence: null,
            visualizationStage: null,
            menuStage: null,
            layout: this.getStoredLayout()
        };
        var clicker = {
            changeFilter: function (filter, colors) {
                var essence = _this.state.essence;
                essence = essence.changeFilter(filter);
                if (colors)
                    essence = essence.changeColors(colors);
                _this.setState({ essence: essence });
            },
            changeTimeSelection: function (selection) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changeTimeSelection(selection) });
            },
            changeColors: function (colors) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changeColors(colors) });
            },
            changePinnedSortMeasure: function (measure) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changePinnedSortMeasure(measure) });
            },
            toggleMeasure: function (measure) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.toggleSelectedMeasure(measure) });
            },
            changeHighlight: function (owner, measure, delta) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changeHighlight(owner, measure, delta) });
            },
            acceptHighlight: function () {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.acceptHighlight() });
            },
            dropHighlight: function () {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.dropHighlight() });
            }
        };
        this.clicker = clicker;
        this.globalResizeListener = this.globalResizeListener.bind(this);
    }
    LinkView.prototype.componentWillMount = function () {
        var _a = this.props, hash = _a.hash, linkViewConfig = _a.linkViewConfig, updateViewHash = _a.updateViewHash;
        var linkItem = linkViewConfig.findByName(hash);
        if (!linkItem) {
            linkItem = linkViewConfig.defaultLinkItem();
            updateViewHash(linkItem.name);
        }
        this.setState({
            linkItem: linkItem,
            essence: linkItem.essence
        });
    };
    LinkView.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.globalResizeListener);
        this.globalResizeListener();
    };
    LinkView.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, hash = _a.hash, linkViewConfig = _a.linkViewConfig;
        if (hash !== nextProps.hash) {
            var linkItem = linkViewConfig.findByName(hash);
            this.setState({ linkItem: linkItem });
        }
    };
    LinkView.prototype.componentWillUpdate = function (nextProps, nextState) {
        var updateViewHash = this.props.updateViewHash;
        var linkItem = this.state.linkItem;
        if (updateViewHash && !nextState.linkItem.equals(linkItem)) {
            updateViewHash(nextState.linkItem.name);
        }
    };
    LinkView.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.globalResizeListener);
    };
    LinkView.prototype.globalResizeListener = function () {
        var _a = this.refs, container = _a.container, visualization = _a.visualization;
        var containerDOM = ReactDOM.findDOMNode(container);
        var visualizationDOM = ReactDOM.findDOMNode(visualization);
        if (!containerDOM || !visualizationDOM)
            return;
        this.setState({
            menuStage: index_1.Stage.fromClientRect(containerDOM.getBoundingClientRect()),
            visualizationStage: index_1.Stage.fromClientRect(visualizationDOM.getBoundingClientRect())
        });
    };
    LinkView.prototype.selectLinkItem = function (linkItem) {
        var essence = this.state.essence;
        var newEssence = linkItem.essence;
        if (essence.getTimeAttribute()) {
            newEssence = newEssence.changeTimeSelection(essence.getTimeSelection());
        }
        this.setState({
            linkItem: linkItem,
            essence: newEssence
        });
    };
    LinkView.prototype.goToCubeView = function () {
        var _a = this.props, changeHash = _a.changeHash, getUrlPrefix = _a.getUrlPrefix;
        var essence = this.state.essence;
        changeHash(essence.dataSource.name + "/" + essence.toHash(), true);
    };
    LinkView.prototype.getStoredLayout = function () {
        return localStorage.get('link-view-layout') || { linkPanelWidth: 240, pinboardWidth: 240 };
    };
    LinkView.prototype.storeLayout = function (layout) {
        localStorage.set('link-view-layout', layout);
    };
    LinkView.prototype.onLinkPanelResize = function (value) {
        var layout = this.state.layout;
        layout.linkPanelWidth = value;
        this.setState({ layout: layout });
        this.storeLayout(layout);
    };
    LinkView.prototype.onPinboardPanelResize = function (value) {
        var layout = this.state.layout;
        layout.pinboardWidth = value;
        this.setState({ layout: layout });
        this.storeLayout(layout);
    };
    LinkView.prototype.onPanelResizeEnd = function () {
        this.globalResizeListener();
    };
    LinkView.prototype.renderPresets = function () {
        var _this = this;
        var essence = this.state.essence;
        var presetToButton = function (preset) {
            return {
                isSelected: preset.selection.equals(essence.getTimeSelection()),
                title: preset.name,
                onClick: _this.clicker.changeTimeSelection.bind(_this, preset.selection),
                key: preset.name
            };
        };
        return React.createElement(button_group_1.ButtonGroup, {groupMembers: latestPresets.map(presetToButton)});
    };
    LinkView.prototype.renderLinkPanel = function (style) {
        var _this = this;
        var linkViewConfig = this.props.linkViewConfig;
        var linkItem = this.state.linkItem;
        var groupId = 0;
        var lastGroup = null;
        var items = [];
        linkViewConfig.linkItems.forEach(function (li) {
            // Add a group header if needed
            if (lastGroup !== li.group) {
                items.push(React.createElement("div", {className: "link-group-title", key: 'group_' + groupId}, li.group));
                groupId++;
                lastGroup = li.group;
            }
            items.push(React.createElement("div", {className: dom_1.classNames('link-item', { selected: li === linkItem }), key: 'li_' + li.name, onClick: _this.selectLinkItem.bind(_this, li)}, li.title));
        });
        return React.createElement("div", {className: "link-panel", style: style}, React.createElement("div", {className: "link-container"}, items));
    };
    LinkView.prototype.render = function () {
        var clicker = this.clicker;
        var _a = this.props, getUrlPrefix = _a.getUrlPrefix, onNavClick = _a.onNavClick, linkViewConfig = _a.linkViewConfig, user = _a.user, customization = _a.customization;
        var _b = this.state, linkItem = _b.linkItem, essence = _b.essence, visualizationStage = _b.visualizationStage, layout = _b.layout;
        if (!linkItem)
            return null;
        var visualization = essence.visualization;
        var visElement = null;
        if (essence.visResolve.isReady() && visualizationStage) {
            var visProps = {
                clicker: clicker,
                essence: essence,
                stage: visualizationStage
            };
            visElement = React.createElement(index_2.getVisualizationComponent(visualization), visProps);
        }
        var manualFallback = null;
        if (essence.visResolve.isManual()) {
            manualFallback = React.createElement(manual_fallback_1.ManualFallback, {
                clicker: clicker,
                essence: essence
            });
        }
        var styles = {
            linkMeasurePanel: { width: layout.linkPanelWidth },
            centerPanel: { left: layout.linkPanelWidth, right: layout.pinboardWidth },
            pinboardPanel: { width: layout.pinboardWidth }
        };
        return React.createElement("div", {className: 'link-view'}, React.createElement(link_header_bar_1.LinkHeaderBar, {title: linkViewConfig.title, user: user, onNavClick: onNavClick, onExploreClick: this.goToCubeView.bind(this), getUrlPrefix: getUrlPrefix, customization: customization}), React.createElement("div", {className: "container", ref: 'container'}, this.renderLinkPanel(styles.linkMeasurePanel), React.createElement(resize_handle_1.ResizeHandle, {side: "left", initialValue: layout.linkPanelWidth, onResize: this.onLinkPanelResize.bind(this), onResizeEnd: this.onPanelResizeEnd.bind(this), min: MIN_PANEL_WIDTH, max: MAX_PANEL_WIDTH}), React.createElement("div", {className: 'center-panel', style: styles.centerPanel}, React.createElement("div", {className: 'center-top-bar'}, React.createElement("div", {className: 'link-title'}, linkItem.title), React.createElement("div", {className: 'link-description'}, linkItem.description), React.createElement("div", {className: "right-align"}, this.renderPresets())), React.createElement("div", {className: 'center-main'}, React.createElement("div", {className: 'visualization', ref: 'visualization'}, visElement), manualFallback)), React.createElement(resize_handle_1.ResizeHandle, {side: "right", initialValue: layout.pinboardWidth, onResize: this.onPinboardPanelResize.bind(this), onResizeEnd: this.onPanelResizeEnd.bind(this), min: MIN_PANEL_WIDTH, max: MAX_PANEL_WIDTH}), React.createElement(pinboard_panel_1.PinboardPanel, {style: styles.pinboardPanel, clicker: clicker, essence: essence, getUrlPrefix: getUrlPrefix})));
    };
    return LinkView;
}(React.Component));
exports.LinkView = LinkView;
