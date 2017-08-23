"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./resize-handle.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var dom_2 = require('../../utils/dom/dom');
var ResizeHandle = (function (_super) {
    __extends(ResizeHandle, _super);
    function ResizeHandle() {
        _super.call(this);
        this.offset = 0;
        this.state = {};
        this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
        this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
    }
    ResizeHandle.prototype.componentDidMount = function () {
        this.setState({
            currentValue: this.constrainValue(this.props.initialValue)
        });
        this.mounted = true;
    };
    ResizeHandle.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    ResizeHandle.prototype.onMouseDown = function (event) {
        window.addEventListener('mouseup', this.onGlobalMouseUp);
        window.addEventListener('mousemove', this.onGlobalMouseMove);
        var newX = this.state.currentValue;
        var eventX = this.getValueFromX(dom_2.getXFromEvent(event));
        this.setState({
            dragging: true,
            startValue: newX,
            currentValue: newX,
            anchor: eventX - newX
        });
        event.preventDefault();
    };
    ResizeHandle.prototype.getValueFromX = function (x) {
        if (this.props.side !== 'right') {
            return this.constrainValue(x);
        }
        return this.constrainValue(window.innerWidth - x);
    };
    ResizeHandle.prototype.constrainValue = function (value) {
        return dom_1.clamp(value, this.props.min, this.props.max);
    };
    ResizeHandle.prototype.onGlobalMouseMove = function (event) {
        var anchor = this.state.anchor;
        var newX = this.getValueFromX(dom_2.getXFromEvent(event)) - anchor;
        this.setState({
            currentValue: newX
        });
        if (!!this.props.onResize) {
            this.props.onResize(newX);
        }
    };
    ResizeHandle.prototype.onGlobalMouseUp = function (event) {
        this.setState({
            dragging: false
        });
        window.removeEventListener('mouseup', this.onGlobalMouseUp);
        window.removeEventListener('mousemove', this.onGlobalMouseMove);
        if (!!this.props.onResizeEnd) {
            this.props.onResizeEnd(this.state.currentValue);
        }
    };
    ResizeHandle.prototype.render = function () {
        var side = this.props.side;
        var style = {};
        style[side] = this.state.currentValue;
        var className = 'resize-handle ' + side;
        return React.createElement("div", {className: className, style: style, onMouseDown: this.onMouseDown.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: require('../../icons/drag-handle.svg')}));
    };
    return ResizeHandle;
}(React.Component));
exports.ResizeHandle = ResizeHandle;
