"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./button.css');
var React = require('react');
var dom_1 = require('../../utils/dom/dom');
var svg_icon_1 = require('../svg-icon/svg-icon');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.call(this);
    }
    Button.prototype.render = function () {
        var _a = this.props, title = _a.title, type = _a.type, className = _a.className, svg = _a.svg, active = _a.active, disabled = _a.disabled, onClick = _a.onClick;
        var icon = null;
        if (svg) {
            icon = React.createElement(svg_icon_1.SvgIcon, {svg: svg});
        }
        return React.createElement("button", {className: dom_1.classNames('button', type, className, { icon: icon, active: active }), onClick: onClick, disabled: disabled}, icon, title);
    };
    return Button;
}(React.Component));
exports.Button = Button;
