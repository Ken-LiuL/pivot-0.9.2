"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./base-visualization.css');
var React = require('react');
var plywood_1 = require('plywood');
var constants_1 = require('../../config/constants');
var loader_1 = require('../../components/loader/loader');
var query_error_1 = require('../../components/query-error/query-error');
var BaseVisualization = (function (_super) {
    __extends(BaseVisualization, _super);
    function BaseVisualization() {
        _super.call(this);
        this.lastRenderResult = null;
        this.state = this.getDefaultState();
        this.globalMouseMoveListener = this.globalMouseMoveListener.bind(this);
        this.globalMouseUpListener = this.globalMouseUpListener.bind(this);
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    BaseVisualization.prototype.getDefaultState = function () {
        return {
            datasetLoad: {},
            scrollLeft: 0,
            scrollTop: 0,
            hoverMeasure: null
        };
    };
    Object.defineProperty(BaseVisualization.prototype, "id", {
        // Way to get a static property without explicitly specifying the class
        get: function () {
            return this.constructor.id;
        },
        enumerable: true,
        configurable: true
    });
    BaseVisualization.prototype.onScroll = function (e) {
        var target = e.target;
        this.setState({
            scrollLeft: target.scrollLeft,
            scrollTop: target.scrollTop
        }); // Geez, TypeScript
    };
    BaseVisualization.prototype.makeQuery = function (essence) {
        var splits = essence.splits, colors = essence.colors, dataSource = essence.dataSource;
        var measures = essence.getEffectiveMeasures();
        var $main = plywood_1.$('main');
        var query = plywood_1.ply()
            .apply('main', $main.filter(essence.getEffectiveFilter(this.id).toExpression()));
        measures.forEach(function (measure) {
            query = query.performAction(measure.toApplyAction());
        });
        function makeSubQuery(i) {
            var split = splits.get(i);
            var splitDimension = dataSource.getDimensionByExpression(split.expression);
            var sortAction = split.sortAction, limitAction = split.limitAction;
            if (!sortAction) {
                throw new Error('something went wrong during query generation');
            }
            var subQuery = $main.split(split.toSplitExpression(), splitDimension.name);
            if (colors && colors.dimension === splitDimension.name) {
                var havingFilter = colors.toHavingFilter(splitDimension.name);
                if (havingFilter) {
                    subQuery = subQuery.performAction(havingFilter);
                }
            }
            measures.forEach(function (measure) {
                subQuery = subQuery.performAction(measure.toApplyAction());
            });
            var applyForSort = essence.getApplyForSort(sortAction);
            if (applyForSort) {
                subQuery = subQuery.performAction(applyForSort);
            }
            subQuery = subQuery.performAction(sortAction);
            if (colors && colors.dimension === splitDimension.name) {
                subQuery = subQuery.performAction(colors.toLimitAction());
            }
            else if (limitAction) {
                subQuery = subQuery.performAction(limitAction);
            }
            else if (splitDimension.kind === 'number') {
                // Hack: Plywood converts groupBys to topN if the limit is below a certain threshold.  Currently sorting on dimension in a groupBy query does not
                // behave as expected and in the future plywood will handle this, but for now add a limit so a topN query is performed.
                // 5000 is just a randomly selected number that's high enough that it's not immediately obvious that there's a limit.
                subQuery = subQuery.limit(5000);
            }
            if (i + 1 < splits.length()) {
                subQuery = subQuery.apply(constants_1.SPLIT, makeSubQuery(i + 1));
            }
            return subQuery;
        }
        return query.apply(constants_1.SPLIT, makeSubQuery(0));
    };
    BaseVisualization.prototype.fetchData = function (essence) {
        var _this = this;
        var registerDownloadableDataset = this.props.registerDownloadableDataset;
        var query = this.makeQuery(essence);
        this.precalculate(this.props, { loading: true });
        essence.dataSource.executor(query, { timezone: essence.timezone })
            .then(function (dataset) {
            if (!_this._isMounted)
                return;
            _this.precalculate(_this.props, {
                loading: false,
                dataset: dataset,
                error: null
            });
        }, function (error) {
            if (registerDownloadableDataset)
                registerDownloadableDataset(null);
            if (!_this._isMounted)
                return;
            _this.precalculate(_this.props, {
                loading: false,
                dataset: null,
                error: error
            });
        }).done(); // Not calling done() prevents potential error from being bubbled up
    };
    BaseVisualization.prototype.componentWillMount = function () {
        this.precalculate(this.props);
    };
    BaseVisualization.prototype.componentDidMount = function () {
        this._isMounted = true;
        var essence = this.props.essence;
        this.fetchData(essence);
        window.addEventListener('keydown', this.globalKeyDownListener);
        window.addEventListener('mousemove', this.globalMouseMoveListener);
        window.addEventListener('mouseup', this.globalMouseUpListener);
    };
    BaseVisualization.prototype.componentWillReceiveProps = function (nextProps) {
        this.precalculate(nextProps);
        var essence = this.props.essence;
        var nextEssence = nextProps.essence;
        if (nextEssence.differentDataSource(essence) ||
            nextEssence.differentEffectiveFilter(essence, this.id) ||
            nextEssence.differentEffectiveSplits(essence) ||
            nextEssence.differentColors(essence) ||
            nextEssence.newEffectiveMeasures(essence)) {
            this.fetchData(nextEssence);
        }
    };
    BaseVisualization.prototype.componentWillUnmount = function () {
        this._isMounted = false;
        window.removeEventListener('keydown', this.globalKeyDownListener);
        window.removeEventListener('mousemove', this.globalMouseMoveListener);
        window.removeEventListener('mouseup', this.globalMouseUpListener);
    };
    BaseVisualization.prototype.globalMouseMoveListener = function (e) { };
    BaseVisualization.prototype.globalMouseUpListener = function (e) { };
    BaseVisualization.prototype.globalKeyDownListener = function (e) { };
    BaseVisualization.prototype.renderInternals = function () {
        return null;
    };
    BaseVisualization.prototype.precalculate = function (props, datasetLoad) {
        if (datasetLoad === void 0) { datasetLoad = null; }
    };
    BaseVisualization.prototype.render = function () {
        var datasetLoad = this.state.datasetLoad;
        if (!datasetLoad.loading || !this.lastRenderResult) {
            this.lastRenderResult = this.renderInternals();
        }
        return React.createElement("div", {className: 'base-visualization ' + this.id}, this.lastRenderResult, datasetLoad.error ? React.createElement(query_error_1.QueryError, {error: datasetLoad.error}) : null, datasetLoad.loading ? React.createElement(loader_1.Loader, null) : null);
    };
    BaseVisualization.id = 'base-visualization';
    return BaseVisualization;
}(React.Component));
exports.BaseVisualization = BaseVisualization;
