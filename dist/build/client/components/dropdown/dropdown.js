"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./dropdown.css');
var React = require('react');
var ReactDOM = require('react-dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var dom_1 = require('../../utils/dom/dom');
function simpleEqual(item1, item2) {
    return item1 === item2;
}
var Dropdown = (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown() {
        _super.call(this);
        this.state = {
            open: false
        };
        this.globalMouseDownListener = this.globalMouseDownListener.bind(this);
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    Dropdown.prototype.componentDidMount = function () {
        window.addEventListener('mousedown', this.globalMouseDownListener);
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    Dropdown.prototype.componentWillUnmount = function () {
        window.removeEventListener('mousedown', this.globalMouseDownListener);
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    Dropdown.prototype.onClick = function () {
        var open = this.state.open;
        this.setState({ open: !open });
    };
    Dropdown.prototype.globalMouseDownListener = function (e) {
        var open = this.state.open;
        if (!open)
            return;
        var myElement = ReactDOM.findDOMNode(this);
        if (!myElement)
            return;
        var target = e.target;
        if (dom_1.isInside(target, myElement))
            return;
        this.setState({ open: false });
    };
    Dropdown.prototype.globalKeyDownListener = function (e) {
        if (!dom_1.escapeKey(e))
            return;
        var open = this.state.open;
        if (!open)
            return;
        this.setState({ open: false });
    };
    Dropdown.prototype.renderMenu = function () {
        var _a = this.props, items = _a.items, renderItem = _a.renderItem, keyItem = _a.keyItem, selectedItem = _a.selectedItem, equal = _a.equal, onSelect = _a.onSelect, className = _a.className;
        if (!items || !items.length)
            return null;
        if (!renderItem)
            renderItem = String;
        if (!keyItem)
            keyItem = renderItem;
        if (!equal)
            equal = simpleEqual;
        var itemElements = items.map(function (item) {
            return React.createElement("div", {className: dom_1.classNames('dropdown-item', equal(item, selectedItem) ? 'selected' : null), key: keyItem(item), onClick: function () { return onSelect(item); }}, renderItem(item));
        });
        return React.createElement("div", {className: dom_1.classNames('dropdown-menu', className)}, itemElements);
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, label = _a.label, renderItem = _a.renderItem, selectedItem = _a.selectedItem, direction = _a.direction, renderSelectedItem = _a.renderSelectedItem;
        var open = this.state.open;
        if (!renderItem)
            renderItem = String;
        if (!direction)
            direction = 'down';
        if (!renderSelectedItem)
            renderSelectedItem = renderItem;
        var labelElement = null;
        if (label) {
            labelElement = React.createElement("div", {className: "dropdown-label"}, label);
        }
        return React.createElement("div", {className: dom_1.classNames('dropdown', direction), onClick: this.onClick.bind(this)}, labelElement, React.createElement("div", {className: dom_1.classNames('selected-item', { active: open })}, renderSelectedItem(selectedItem), React.createElement(svg_icon_1.SvgIcon, {className: "caret-icon", svg: require('../../icons/dropdown-caret.svg')})), open ? this.renderMenu() : null);
    };
    return Dropdown;
}(React.Component));
exports.Dropdown = Dropdown;
