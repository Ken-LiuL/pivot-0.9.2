"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./scroller.css');
var React = require('react');
var ReactDOM = require('react-dom');
var dom_1 = require('../../utils/dom/dom');
var string_1 = require('../../utils/string/string');
var Scroller = (function (_super) {
    __extends(Scroller, _super);
    function Scroller() {
        _super.call(this);
        this.state = {
            scrollTop: 0,
            scrollLeft: 0,
            viewportHeight: 0,
            viewportWidth: 0
        };
        this.globalResizeListener = this.globalResizeListener.bind(this);
    }
    Scroller.prototype.globalResizeListener = function () {
        this.updateViewport();
    };
    Scroller.prototype.getGutterStyle = function (side) {
        var layout = this.props.layout;
        var _a = this.state, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
        switch (side) {
            case "top":
                return {
                    height: layout.top,
                    left: layout.left - scrollLeft,
                    right: layout.right
                };
            case "right":
                return {
                    width: layout.right,
                    right: 0,
                    top: layout.top - scrollTop,
                    bottom: layout.bottom
                };
            case "bottom":
                return {
                    height: layout.bottom,
                    left: layout.left - scrollLeft,
                    right: layout.right,
                    bottom: 0
                };
            case "left":
                return {
                    width: layout.left,
                    left: 0,
                    top: layout.top - scrollTop,
                    bottom: layout.bottom
                };
            default:
                throw new Error("Unknown side for gutter. This shouldn't happen.");
        }
    };
    Scroller.prototype.getCornerStyle = function (yPos, xPos) {
        var layout = this.props.layout;
        var style = {};
        if (xPos === 'left') {
            style.left = 0;
            style.width = layout.left;
        }
        else {
            style.right = 0;
            style.width = layout.right;
        }
        if (yPos === 'top') {
            style.top = 0;
            style.height = layout.top;
        }
        else {
            style.height = layout.bottom;
            style.bottom = 0;
        }
        return style;
    };
    Scroller.prototype.getShadowStyle = function (side) {
        var layout = this.props.layout;
        switch (side) {
            case "top":
                return { top: 0, height: layout.top, left: 0, right: 0 };
            case "right":
                return { width: layout.right, right: 0, top: 0, bottom: 0 };
            case "bottom":
                return { height: layout.bottom, bottom: 0, left: 0, right: 0 };
            case "left":
                return { width: layout.left, left: 0, top: 0, bottom: 0 };
            default:
                throw new Error("Unknown side for shadow. This shouldn't happen.");
        }
    };
    Scroller.prototype.getBodyStyle = function () {
        var layout = this.props.layout;
        var _a = this.state, scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
        return {
            top: layout.top - scrollTop,
            right: layout.right,
            bottom: layout.bottom,
            left: layout.left - scrollLeft
        };
    };
    Scroller.prototype.getTargetStyle = function () {
        var layout = this.props.layout;
        return {
            width: layout.bodyWidth + layout.left + layout.right,
            height: layout.bodyHeight + layout.top + layout.bottom
        };
    };
    Scroller.prototype.getDOMElement = function (refName) {
        return ReactDOM.findDOMNode(this.refs[refName]);
    };
    Scroller.prototype.onScroll = function (e) {
        var _this = this;
        var _a = this.props.layout, bodyWidth = _a.bodyWidth, bodyHeight = _a.bodyHeight;
        var _b = this.state, viewportWidth = _b.viewportWidth, viewportHeight = _b.viewportHeight;
        var target = e.target;
        var scrollLeft = dom_1.clamp(target.scrollLeft, 0, Math.max(bodyWidth - viewportWidth, 0));
        var scrollTop = dom_1.clamp(target.scrollTop, 0, Math.max(bodyHeight - viewportHeight, 0));
        if (this.props.onScroll !== undefined) {
            this.setState({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft
            }, function () { return _this.props.onScroll(scrollTop, scrollLeft); });
        }
        else {
            this.setState({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft
            });
        }
    };
    Scroller.prototype.getRelativeMouseCoordinates = function (event) {
        var _a = this.props.layout, top = _a.top, left = _a.left, bodyWidth = _a.bodyWidth, bodyHeight = _a.bodyHeight;
        var container = this.getDOMElement('eventContainer');
        var _b = this.state, scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop, viewportHeight = _b.viewportHeight, viewportWidth = _b.viewportWidth;
        var rect = container.getBoundingClientRect();
        var x = dom_1.getXFromEvent(event) - rect.left;
        var y = dom_1.getYFromEvent(event) - rect.top;
        if (x > left && x <= left + viewportWidth) {
            x += scrollLeft;
        }
        else if (x > left + viewportWidth) {
            x += bodyWidth - viewportWidth;
        }
        if (y > top && y <= top + viewportHeight) {
            y += scrollTop;
        }
        else if (y > top + viewportHeight) {
            y += bodyHeight - viewportHeight;
        }
        return { x: x, y: y };
    };
    Scroller.prototype.onClick = function (event) {
        if (this.props.onClick === undefined)
            return;
        var _a = this.getRelativeMouseCoordinates(event), x = _a.x, y = _a.y;
        this.props.onClick(x, y);
    };
    Scroller.prototype.onMouseMove = function (event) {
        if (this.props.onMouseMove === undefined)
            return;
        var _a = this.getRelativeMouseCoordinates(event), x = _a.x, y = _a.y;
        this.props.onMouseMove(x, y);
    };
    Scroller.prototype.renderGutter = function (side) {
        var element = this.props[(side + "Gutter")];
        if (!element)
            return null;
        return React.createElement("div", {className: side + "-gutter", style: this.getGutterStyle(side)}, element);
    };
    Scroller.prototype.shouldHaveShadow = function (side) {
        var layout = this.props.layout;
        var _a = this.state, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, viewportHeight = _a.viewportHeight, viewportWidth = _a.viewportWidth;
        if (side === 'top')
            return scrollTop > 0;
        if (side === 'left')
            return scrollLeft > 0;
        if (side === 'bottom')
            return layout.bodyHeight - scrollTop > viewportHeight;
        if (side === 'right')
            return layout.bodyWidth - scrollLeft > viewportWidth;
        throw new Error('Unknown side for shadow : ' + side);
    };
    Scroller.prototype.renderShadow = function (side) {
        if (!this.props.layout[side])
            return null; // no gutter ? no shadow.
        if (!this.shouldHaveShadow(side))
            return null;
        return React.createElement("div", {className: side + "-shadow", style: this.getShadowStyle(side)});
    };
    Scroller.prototype.renderCorner = function (yPos, xPos) {
        var style = this.getCornerStyle(yPos, xPos);
        var element = this.props[yPos + string_1.firstUp(xPos) + 'Corner'];
        if (!element)
            return null;
        return React.createElement("div", {className: [yPos, xPos, 'corner'].join('-'), style: style}, element);
    };
    Scroller.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.globalResizeListener);
        this.updateViewport();
    };
    Scroller.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.globalResizeListener);
    };
    Scroller.prototype.componentDidUpdate = function () {
        this.updateViewport();
    };
    Scroller.prototype.updateViewport = function () {
        var scroller = this.getDOMElement('Scroller');
        if (!scroller)
            return;
        var rect = scroller.getBoundingClientRect();
        var _a = this.props.layout, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
        var newHeight = rect.height - top - bottom;
        var newWidth = rect.width - left - right;
        if (this.state.viewportHeight !== newHeight || this.state.viewportWidth !== newWidth) {
            this.setState({ viewportHeight: newHeight, viewportWidth: newWidth });
        }
    };
    Scroller.prototype.render = function () {
        var _a = this.state, viewportWidth = _a.viewportWidth, viewportHeight = _a.viewportHeight;
        var _b = this.props, body = _b.body, overlay = _b.overlay, onMouseLeave = _b.onMouseLeave, layout = _b.layout;
        if (!layout)
            return null;
        var bodyWidth = layout.bodyWidth, bodyHeight = layout.bodyHeight;
        var blockHorizontalScroll = bodyWidth <= viewportWidth;
        var blockVerticalScroll = bodyHeight <= viewportHeight;
        return React.createElement("div", {className: "scroller", ref: "Scroller"}, React.createElement("div", {className: "body", style: this.getBodyStyle()}, body), this.renderGutter("top"), this.renderGutter("right"), this.renderGutter("bottom"), this.renderGutter("left"), this.renderCorner("top", "left"), this.renderCorner("top", "right"), this.renderCorner("bottom", "left"), this.renderCorner("bottom", "right"), this.renderShadow("top"), this.renderShadow("right"), this.renderShadow("bottom"), this.renderShadow("left"), overlay ? React.createElement("div", {className: "overlay"}, overlay) : null, React.createElement("div", {className: dom_1.classNames('event-container', { 'no-x-scroll': blockHorizontalScroll, 'no-y-scroll': blockVerticalScroll }), ref: "eventContainer", onScroll: this.onScroll.bind(this), onClick: this.onClick.bind(this), onMouseMove: this.onMouseMove.bind(this), onMouseLeave: onMouseLeave || null}, React.createElement("div", {className: "event-target", style: this.getTargetStyle()})));
    };
    return Scroller;
}(React.Component));
exports.Scroller = Scroller;
