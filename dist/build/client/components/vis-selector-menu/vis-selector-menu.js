"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./vis-selector-menu.css');
var React = require('react');
var ReactDOM = require('react-dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var dom_1 = require('../../utils/dom/dom');
var VisSelectorMenu = (function (_super) {
    __extends(VisSelectorMenu, _super);
    function VisSelectorMenu() {
        _super.call(this);
        this.globalMouseDownListener = this.globalMouseDownListener.bind(this);
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    VisSelectorMenu.prototype.componentDidMount = function () {
        window.addEventListener('mousedown', this.globalMouseDownListener);
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    VisSelectorMenu.prototype.componentWillUnmount = function () {
        window.removeEventListener('mousedown', this.globalMouseDownListener);
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    VisSelectorMenu.prototype.globalMouseDownListener = function (e) {
        var _a = this.props, onClose = _a.onClose, openOn = _a.openOn;
        var myElement = ReactDOM.findDOMNode(this);
        if (!myElement)
            return;
        var target = e.target;
        if (dom_1.isInside(target, myElement) || dom_1.isInside(target, openOn))
            return;
        onClose();
    };
    VisSelectorMenu.prototype.globalKeyDownListener = function (e) {
        if (!dom_1.escapeKey(e))
            return;
        var onClose = this.props.onClose;
        onClose();
    };
    VisSelectorMenu.prototype.onVisSelect = function (v) {
        var clicker = this.props.clicker;
        clicker.changeVisualization(v);
        this.setState({
            menuOpen: false
        });
    };
    VisSelectorMenu.prototype.renderVisItem = function (v) {
        var essence = this.props.essence;
        var visualization = essence.visualization;
        return React.createElement("div", {className: dom_1.classNames('vis-item', (v.name === visualization.name ? 'selected' : 'not-selected')), key: v.name, onClick: this.onVisSelect.bind(this, v)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/vis-' + v.name + '.svg')}), React.createElement("div", {className: "vis-title"}, v.title));
    };
    VisSelectorMenu.prototype.render = function () {
        var _this = this;
        var essence = this.props.essence;
        var visualizations = essence.visualizations;
        var visItems = null;
        if (visualizations) {
            visItems = visualizations.map(function (v) {
                return _this.renderVisItem(v);
            });
        }
        return React.createElement("div", {className: "vis-selector-menu"}, visItems);
    };
    return VisSelectorMenu;
}(React.Component));
exports.VisSelectorMenu = VisSelectorMenu;
