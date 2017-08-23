"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./body-portal.css');
var React = require('react');
var ReactDOM = require('react-dom');
var BodyPortal = (function (_super) {
    __extends(BodyPortal, _super);
    function BodyPortal() {
        _super.call(this);
        this._target = null; // HTMLElement, a div that is appended to the body
        this._component = null; // ReactElement, which is mounted on the target
    }
    Object.defineProperty(BodyPortal.prototype, "component", {
        get: function () {
            return this._component;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BodyPortal.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    BodyPortal.prototype.updateStyle = function () {
        var _a = this.props, left = _a.left, top = _a.top, disablePointerEvents = _a.disablePointerEvents;
        var style = this._target.style;
        if (typeof left === 'number') {
            style.left = Math.round(left) + 'px';
        }
        else if (typeof left === 'string') {
            style.left = left;
        }
        if (typeof top === 'number') {
            style.top = Math.round(top) + 'px';
        }
        else if (typeof top === 'string') {
            style.top = top;
        }
        style['z-index'] = disablePointerEvents ? 200 : 201;
        style['pointer-events'] = disablePointerEvents ? 'none' : 'auto';
    };
    BodyPortal.prototype.componentDidMount = function () {
        this.teleport();
    };
    BodyPortal.prototype.teleport = function () {
        var fullSize = this.props.fullSize;
        var newDiv = document.createElement('div');
        newDiv.className = 'body-portal' + (fullSize ? ' full-size' : '');
        this._target = document.body.appendChild(newDiv);
        this.updateStyle();
        this._component = ReactDOM.render(React.Children.only(this.props.children), this._target);
    };
    BodyPortal.prototype.componentDidUpdate = function () {
        this.updateStyle();
        this._component = ReactDOM.render(React.Children.only(this.props.children), this._target);
    };
    BodyPortal.prototype.componentWillUnmount = function () {
        ReactDOM.unmountComponentAtNode(this._target);
        document.body.removeChild(this._target);
    };
    BodyPortal.prototype.render = function () {
        return null;
    };
    return BodyPortal;
}(React.Component));
exports.BodyPortal = BodyPortal;
