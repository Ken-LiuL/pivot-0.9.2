"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./golden-center.css');
var React = require('react');
var ReactDOM = require('react-dom');
var GoldenCenter = (function (_super) {
    __extends(GoldenCenter, _super);
    function GoldenCenter() {
        _super.call(this);
        this.state = {
            top: 0
        };
        this.globalResizeListener = this.globalResizeListener.bind(this);
    }
    GoldenCenter.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.globalResizeListener);
        this.globalResizeListener();
    };
    GoldenCenter.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.globalResizeListener);
    };
    GoldenCenter.prototype.globalResizeListener = function () {
        var myNode = ReactDOM.findDOMNode(this);
        if (!myNode)
            return;
        var childNode = myNode.firstChild;
        if (!childNode)
            return;
        var myRect = myNode.getBoundingClientRect();
        var childRect = childNode.getBoundingClientRect();
        var _a = this.props, topRatio = _a.topRatio, minPadding = _a.minPadding;
        var top = Math.max((myRect.height - childRect.height) * topRatio, minPadding);
        this.setState({ top: top });
    };
    GoldenCenter.prototype.render = function () {
        var _a = this.props, minPadding = _a.minPadding, children = _a.children;
        var top = this.state.top;
        return React.createElement("div", {className: "golden-center", style: { paddingTop: top, paddingBottom: minPadding }}, React.Children.only(children));
    };
    GoldenCenter.defaultProps = {
        topRatio: 0.618 / 1.618,
        minPadding: 50
    };
    return GoldenCenter;
}(React.Component));
exports.GoldenCenter = GoldenCenter;
