"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./vis-selector.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var vis_selector_menu_1 = require('../vis-selector-menu/vis-selector-menu');
var VisSelector = (function (_super) {
    __extends(VisSelector, _super);
    function VisSelector() {
        _super.call(this);
        this.state = {
            menuOpenOn: null
        };
    }
    VisSelector.prototype.openMenu = function (e) {
        var menuOpenOn = this.state.menuOpenOn;
        var target = dom_1.findParentWithClass(e.target, 'vis-selector');
        if (menuOpenOn === target) {
            this.closeMenu();
            return;
        }
        this.setState({
            menuOpenOn: target
        });
    };
    VisSelector.prototype.closeMenu = function () {
        this.setState({
            menuOpenOn: null
        });
    };
    VisSelector.prototype.render = function () {
        var _a = this.props, clicker = _a.clicker, essence = _a.essence;
        var menuOpenOn = this.state.menuOpenOn;
        var visualization = essence.visualization;
        var menu = null;
        if (menuOpenOn) {
            menu = React.createElement(vis_selector_menu_1.VisSelectorMenu, {
                clicker: clicker,
                essence: essence,
                openOn: menuOpenOn,
                onClose: this.closeMenu.bind(this)
            });
        }
        return React.createElement("div", {className: dom_1.classNames('vis-selector', { active: menuOpenOn }), onClick: this.openMenu.bind(this)}, React.createElement("div", {className: "vis-item selected"}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/vis-' + visualization.name + '.svg')}), React.createElement("div", {className: "vis-title"}, visualization.title)), menu);
    };
    return VisSelector;
}(React.Component));
exports.VisSelector = VisSelector;
