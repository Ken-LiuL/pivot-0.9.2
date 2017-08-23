"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./bubble-menu.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var dom_1 = require('../../utils/dom/dom');
var body_portal_1 = require('../body-portal/body-portal');
var shpitz_1 = require('../shpitz/shpitz');
var OFFSET_H = 10;
var OFFSET_V = 0;
var SCREEN_OFFSET = 5;
var BubbleMenu = (function (_super) {
    __extends(BubbleMenu, _super);
    function BubbleMenu() {
        _super.call(this);
        this.state = {
            id: null
        };
        this.globalMouseDownListener = this.globalMouseDownListener.bind(this);
        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
    }
    BubbleMenu.prototype.componentWillMount = function () {
        var _a = this.props, alignOn = _a.alignOn, openOn = _a.openOn, direction = _a.direction, align = _a.align, id = _a.id;
        var rect = (alignOn || openOn).getBoundingClientRect();
        var x;
        var y;
        switch (direction) {
            case 'right':
                x = rect.left + rect.width - OFFSET_H;
                y = rect.top + rect.height / 2;
                break;
            case 'down':
                if (align === 'center') {
                    x = rect.left + rect.width / 2;
                }
                else if (align === 'start') {
                    x = rect.left;
                }
                else {
                    x = rect.left + rect.width;
                }
                y = rect.top + rect.height - OFFSET_V;
                break;
            default:
                throw new Error("unknown direction: '" + direction + "'");
        }
        this.setState({
            id: id || dom_1.uniqueId('bubble-menu-'),
            x: x,
            y: y
        });
    };
    BubbleMenu.prototype.componentDidMount = function () {
        window.addEventListener('mousedown', this.globalMouseDownListener);
        window.addEventListener('keydown', this.globalKeyDownListener);
    };
    BubbleMenu.prototype.componentWillUnmount = function () {
        window.removeEventListener('mousedown', this.globalMouseDownListener);
        window.removeEventListener('keydown', this.globalKeyDownListener);
    };
    BubbleMenu.prototype.globalMouseDownListener = function (e) {
        var _a = this.props, onClose = _a.onClose, openOn = _a.openOn;
        var id = this.state.id;
        // can not use ReactDOM.findDOMNode(this) because portal?
        var myElement = document.getElementById(id);
        if (!myElement)
            return;
        var target = e.target;
        if (dom_1.isInside(target, myElement) || dom_1.isInside(target, openOn))
            return;
        onClose();
    };
    BubbleMenu.prototype.globalKeyDownListener = function (e) {
        if (!dom_1.escapeKey(e))
            return;
        var onClose = this.props.onClose;
        onClose();
    };
    BubbleMenu.prototype.render = function () {
        var _a = this.props, className = _a.className, direction = _a.direction, stage = _a.stage, fixedSize = _a.fixedSize, containerStage = _a.containerStage, inside = _a.inside, layout = _a.layout, align = _a.align, children = _a.children;
        var _b = this.state, id = _b.id, x = _b.x, y = _b.y;
        var menuWidth = stage.width;
        var menuHeight = stage.height;
        var menuLeft = 0;
        var menuTop = 0;
        var menuStyle = {};
        if (fixedSize) {
            menuStyle.width = menuWidth;
            menuStyle.height = menuHeight;
        }
        var shpitzStyle = {
            left: 0,
            top: 0
        };
        if (!containerStage) {
            containerStage = new index_1.Stage({
                x: SCREEN_OFFSET,
                y: SCREEN_OFFSET,
                width: window.innerWidth - SCREEN_OFFSET * 2,
                height: window.innerHeight - SCREEN_OFFSET * 2
            });
        }
        switch (direction) {
            case 'right':
                var top = y - menuHeight / 2;
                // constrain
                top = Math.min(Math.max(top, containerStage.y), containerStage.y + containerStage.height - menuHeight);
                menuLeft = x;
                menuTop = top;
                shpitzStyle.top = y - top;
                menuStyle.height = menuHeight;
                break;
            case 'down':
                var left;
                if (align === 'center') {
                    left = x - menuWidth / 2;
                }
                else if (align === 'start') {
                    left = x;
                }
                else {
                    left = x - menuWidth;
                }
                // constrain
                left = Math.min(Math.max(left, containerStage.x), containerStage.x + containerStage.width - menuWidth);
                menuLeft = left;
                menuTop = y;
                shpitzStyle.left = x - left;
                menuStyle.width = menuWidth;
                break;
            default:
                throw new Error("unknown direction: '" + direction + "'");
        }
        var insideId = null;
        if (inside) {
            insideId = inside.id;
            if (!insideId)
                throw new Error('inside element must have id');
        }
        var shpitzElement = null;
        if (align === 'center') {
            shpitzElement = React.createElement(shpitz_1.Shpitz, {style: shpitzStyle, direction: direction});
        }
        var myClass = dom_1.classNames('bubble-menu', direction, className, { mini: layout === 'mini' });
        return React.createElement(body_portal_1.BodyPortal, {left: menuLeft, top: menuTop}, React.createElement("div", {className: myClass, id: id, "data-parent": insideId, style: menuStyle}, children, shpitzElement));
    };
    BubbleMenu.defaultProps = {
        align: 'center'
    };
    return BubbleMenu;
}(React.Component));
exports.BubbleMenu = BubbleMenu;
