"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./cube-view.css');
var React = require('react');
var ReactDOM = require('react-dom');
var drag_manager_1 = require('../../utils/drag-manager/drag-manager');
var index_1 = require('../../../common/models/index');
var index_2 = require('../../../common/manifests/index');
var cube_header_bar_1 = require('../../components/cube-header-bar/cube-header-bar');
var dimension_measure_panel_1 = require('../../components/dimension-measure-panel/dimension-measure-panel');
var filter_tile_1 = require('../../components/filter-tile/filter-tile');
var split_tile_1 = require('../../components/split-tile/split-tile');
var vis_selector_1 = require('../../components/vis-selector/vis-selector');
var manual_fallback_1 = require('../../components/manual-fallback/manual-fallback');
var drop_indicator_1 = require('../../components/drop-indicator/drop-indicator');
var pinboard_panel_1 = require('../../components/pinboard-panel/pinboard-panel');
var resize_handle_1 = require('../../components/resize-handle/resize-handle');
var index_3 = require('../../visualizations/index');
var localStorage = require('../../utils/local-storage/local-storage');
var MIN_PANEL_WIDTH = 240;
var MAX_PANEL_WIDTH = 400;
var CubeView = (function (_super) {
    __extends(CubeView, _super);
    function CubeView() {
        var _this = this;
        _super.call(this);
        this.state = {
            essence: null,
            dragOver: false,
            showRawDataModal: false,
            layout: this.getStoredLayout(),
            updatingMaxTime: false
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
            changeSplits: function (splits, strategy, colors) {
                var essence = _this.state.essence;
                if (colors)
                    essence = essence.changeColors(colors);
                _this.setState({ essence: essence.changeSplits(splits, strategy) });
            },
            changeSplit: function (split, strategy) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changeSplit(split, strategy) });
            },
            addSplit: function (split, strategy) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.addSplit(split, strategy) });
            },
            removeSplit: function (split, strategy) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.removeSplit(split, strategy) });
            },
            changeColors: function (colors) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changeColors(colors) });
            },
            changeVisualization: function (visualization) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changeVisualization(visualization) });
            },
            pin: function (dimension) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.pin(dimension) });
            },
            unpin: function (dimension) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.unpin(dimension) });
            },
            changePinnedSortMeasure: function (measure) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.changePinnedSortMeasure(measure) });
            },
            toggleMultiMeasureMode: function () {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.toggleMultiMeasureMode() });
            },
            toggleEffectiveMeasure: function (measure) {
                var essence = _this.state.essence;
                _this.setState({ essence: essence.toggleEffectiveMeasure(measure) });
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
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    CubeView.prototype.refreshMaxTime = function () {
        var _this = this;
        var essence = this.state.essence;
        var dataSource = essence.dataSource;
        this.setState({ updatingMaxTime: true });
        index_1.DataSource.updateMaxTime(dataSource)
            .then(function (updatedDataSource) {
            if (!_this.mounted)
                return;
            _this.setState({ essence: essence.updateDataSource(updatedDataSource), updatingMaxTime: false });
        });
    };
    CubeView.prototype.componentWillMount = function () {
        var _a = this.props, hash = _a.hash, dataSource = _a.dataSource, updateViewHash = _a.updateViewHash;
        var essence = this.getEssenceFromHash(hash);
        if (!essence) {
            if (!dataSource)
                throw new Error('must have data source');
            essence = this.getEssenceFromDataSource(dataSource);
            updateViewHash(essence.toHash(), true);
        }
        this.setState({ essence: essence });
    };
    CubeView.prototype.componentDidMount = function () {
        var _this = this;
        this.mounted = true;
        drag_manager_1.DragManager.init();
        window.addEventListener('resize', this.globalResizeListener);
        window.addEventListener('keydown', this.globalKeyDownListener);
        this.globalResizeListener();
        require.ensure(['../../components/raw-data-modal/raw-data-modal'], function (require) {
            _this.setState({
                RawDataModalAsync: require('../../components/raw-data-modal/raw-data-modal').RawDataModal
            });
        }, 'raw-data-modal');
    };
    CubeView.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, hash = _a.hash, dataSource = _a.dataSource, updateViewHash = _a.updateViewHash;
        if (!nextProps.dataSource)
            throw new Error('must have data source');
        if (hash !== nextProps.hash) {
            var hashEssence = this.getEssenceFromHash(nextProps.hash);
            if (!hashEssence) {
                hashEssence = this.getEssenceFromDataSource(nextProps.dataSource);
                updateViewHash(hashEssence.toHash(), true);
            }
            this.setState({ essence: hashEssence });
        }
        else if (!dataSource.equals(nextProps.dataSource)) {
            var newEssence = this.getEssenceFromDataSource(nextProps.dataSource);
            this.setState({ essence: newEssence });
        }
    };
    CubeView.prototype.componentWillUpdate = function (nextProps, nextState) {
        var updateViewHash = this.props.updateViewHash;
        var essence = this.state.essence;
        if (updateViewHash && !nextState.essence.equals(essence)) {
            updateViewHash(nextState.essence.toHash());
        }
    };
    CubeView.prototype.componentWillUnmount = function () {
        this.mounted = false;
        window.removeEventListener('resize', this.globalResizeListener);
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    CubeView.prototype.getEssenceFromDataSource = function (dataSource) {
        var essence = index_1.Essence.fromDataSource(dataSource, { dataSource: dataSource, visualizations: index_2.MANIFESTS });
        return essence.multiMeasureMode !== Boolean(localStorage.get('is-multi-measure')) ? essence.toggleMultiMeasureMode() : essence;
    };
    CubeView.prototype.getEssenceFromHash = function (hash) {
        if (!hash)
            return null;
        var dataSource = this.props.dataSource;
        return index_1.Essence.fromHash(hash, { dataSource: dataSource, visualizations: index_2.MANIFESTS });
    };
    CubeView.prototype.globalKeyDownListener = function (e) {
        // Shortcuts will go here one day
    };
    CubeView.prototype.globalResizeListener = function () {
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
    CubeView.prototype.canDrop = function (e) {
        return Boolean(drag_manager_1.DragManager.getDragDimension());
    };
    CubeView.prototype.dragEnter = function (e) {
        if (!this.canDrop(e))
            return;
        this.setState({ dragOver: true });
    };
    CubeView.prototype.dragOver = function (e) {
        if (!this.canDrop(e))
            return;
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
    };
    CubeView.prototype.dragLeave = function (e) {
        this.setState({ dragOver: false });
    };
    CubeView.prototype.drop = function (e) {
        if (!this.canDrop(e))
            return;
        e.preventDefault();
        var dimension = drag_manager_1.DragManager.getDragDimension();
        if (dimension) {
            this.clicker.changeSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.FairGame);
        }
        this.setState({ dragOver: false });
    };
    CubeView.prototype.openRawDataModal = function () {
        this.setState({
            showRawDataModal: true
        });
    };
    CubeView.prototype.onRawDataModalClose = function () {
        this.setState({
            showRawDataModal: false
        });
    };
    CubeView.prototype.renderRawDataModal = function () {
        var _a = this.state, RawDataModalAsync = _a.RawDataModalAsync, showRawDataModal = _a.showRawDataModal, essence = _a.essence, visualizationStage = _a.visualizationStage;
        if (!RawDataModalAsync || !showRawDataModal)
            return null;
        return React.createElement(RawDataModalAsync, {essence: essence, onClose: this.onRawDataModalClose.bind(this)});
    };
    CubeView.prototype.triggerFilterMenu = function (dimension) {
        if (!dimension)
            return;
        this.refs['filterTile'].filterMenuRequest(dimension);
    };
    CubeView.prototype.triggerSplitMenu = function (dimension) {
        if (!dimension)
            return;
        this.refs['splitTile'].splitMenuRequest(dimension);
    };
    CubeView.prototype.changeTimezone = function (newTimezone) {
        var essence = this.state.essence;
        var newEsssence = essence.changeTimezone(newTimezone);
        this.setState({ essence: newEsssence });
    };
    CubeView.prototype.getStoredLayout = function () {
        return localStorage.get('cube-view-layout') || { dimensionPanelWidth: 240, pinboardWidth: 240 };
    };
    CubeView.prototype.storeLayout = function (layout) {
        localStorage.set('cube-view-layout', layout);
    };
    CubeView.prototype.onDimensionPanelResize = function (value) {
        var layout = this.state.layout;
        layout.dimensionPanelWidth = value;
        this.setState({ layout: layout });
        this.storeLayout(layout);
    };
    CubeView.prototype.onPinboardPanelResize = function (value) {
        var layout = this.state.layout;
        layout.pinboardWidth = value;
        this.setState({ layout: layout });
        this.storeLayout(layout);
    };
    CubeView.prototype.onPanelResizeEnd = function () {
        this.globalResizeListener();
    };
    CubeView.prototype.render = function () {
        var _this = this;
        var clicker = this.clicker;
        var _a = this.props, getUrlPrefix = _a.getUrlPrefix, onNavClick = _a.onNavClick, user = _a.user, customization = _a.customization;
        var _b = this.state, layout = _b.layout, essence = _b.essence, menuStage = _b.menuStage, visualizationStage = _b.visualizationStage, dragOver = _b.dragOver, updatingMaxTime = _b.updatingMaxTime;
        if (!essence)
            return null;
        var visualization = essence.visualization;
        var visElement = null;
        if (essence.visResolve.isReady() && visualizationStage) {
            var visProps = {
                clicker: clicker,
                essence: essence,
                stage: visualizationStage,
                openRawDataModal: this.openRawDataModal.bind(this),
                registerDownloadableDataset: function (dataset) { _this.downloadableDataset = dataset; }
            };
            visElement = React.createElement(index_3.getVisualizationComponent(visualization), visProps);
        }
        var manualFallback = null;
        if (essence.visResolve.isManual()) {
            manualFallback = React.createElement(manual_fallback_1.ManualFallback, {
                clicker: clicker,
                essence: essence
            });
        }
        var styles = {
            dimensionMeasurePanel: { width: layout.dimensionPanelWidth },
            centerPanel: { left: layout.dimensionPanelWidth, right: layout.pinboardWidth },
            pinboardPanel: { width: layout.pinboardWidth }
        };
        return React.createElement("div", {className: 'cube-view'}, React.createElement(cube_header_bar_1.CubeHeaderBar, {clicker: clicker, essence: essence, user: user, onNavClick: onNavClick, getUrlPrefix: getUrlPrefix, refreshMaxTime: this.refreshMaxTime.bind(this), openRawDataModal: this.openRawDataModal.bind(this), customization: customization, getDownloadableDataset: function () { return _this.downloadableDataset; }, changeTimezone: this.changeTimezone.bind(this), timezone: essence.timezone, updatingMaxTime: updatingMaxTime}), React.createElement("div", {className: "container", ref: 'container'}, React.createElement(dimension_measure_panel_1.DimensionMeasurePanel, {style: styles.dimensionMeasurePanel, clicker: clicker, essence: essence, menuStage: menuStage, triggerFilterMenu: this.triggerFilterMenu.bind(this), triggerSplitMenu: this.triggerSplitMenu.bind(this), getUrlPrefix: getUrlPrefix}), React.createElement(resize_handle_1.ResizeHandle, {side: "left", initialValue: layout.dimensionPanelWidth, onResize: this.onDimensionPanelResize.bind(this), onResizeEnd: this.onPanelResizeEnd.bind(this), min: MIN_PANEL_WIDTH, max: MAX_PANEL_WIDTH}), React.createElement("div", {className: 'center-panel', style: styles.centerPanel}, React.createElement("div", {className: 'center-top-bar'}, React.createElement("div", {className: 'filter-split-section'}, React.createElement(filter_tile_1.FilterTile, {ref: "filterTile", clicker: clicker, essence: essence, menuStage: visualizationStage, getUrlPrefix: getUrlPrefix}), React.createElement(split_tile_1.SplitTile, {ref: "splitTile", clicker: clicker, essence: essence, menuStage: visualizationStage, getUrlPrefix: getUrlPrefix})), React.createElement(vis_selector_1.VisSelector, {clicker: clicker, essence: essence})), React.createElement("div", {className: 'center-main', onDragEnter: this.dragEnter.bind(this)}, React.createElement("div", {className: 'visualization', ref: 'visualization'}, visElement), manualFallback, dragOver ? React.createElement(drop_indicator_1.DropIndicator, null) : null, dragOver ? React.createElement("div", {className: "drag-mask", onDragOver: this.dragOver.bind(this), onDragLeave: this.dragLeave.bind(this), onDrop: this.drop.bind(this)}) : null)), React.createElement(resize_handle_1.ResizeHandle, {side: "right", initialValue: layout.pinboardWidth, onResize: this.onPinboardPanelResize.bind(this), onResizeEnd: this.onPanelResizeEnd.bind(this), min: MIN_PANEL_WIDTH, max: MAX_PANEL_WIDTH}), React.createElement(pinboard_panel_1.PinboardPanel, {style: styles.pinboardPanel, clicker: clicker, essence: essence, getUrlPrefix: getUrlPrefix})), this.renderRawDataModal());
    };
    CubeView.defaultProps = {
        maxFilters: 20,
        maxSplits: 3
    };
    return CubeView;
}(React.Component));
exports.CubeView = CubeView;
