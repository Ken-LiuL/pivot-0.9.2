"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./segment-action-buttons.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var constants_1 = require('../../config/constants');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var button_1 = require('../button/button');
var SegmentActionButtons = (function (_super) {
    __extends(SegmentActionButtons, _super);
    function SegmentActionButtons() {
        _super.call(this);
        this.state = {
            moreMenuOpenOn: null
        };
    }
    SegmentActionButtons.prototype.onSelect = function (e) {
        var _a = this.props, onClose = _a.onClose, clicker = _a.clicker;
        clicker.acceptHighlight();
        if (onClose)
            onClose();
    };
    SegmentActionButtons.prototype.onCancel = function (e) {
        var _a = this.props, onClose = _a.onClose, clicker = _a.clicker;
        clicker.dropHighlight();
        if (onClose)
            onClose();
    };
    SegmentActionButtons.prototype.onMore = function (e) {
        var moreMenuOpenOn = this.state.moreMenuOpenOn;
        if (moreMenuOpenOn)
            return this.closeMoreMenu();
        this.setState({
            moreMenuOpenOn: e.target
        });
    };
    SegmentActionButtons.prototype.closeMoreMenu = function () {
        this.setState({
            moreMenuOpenOn: null
        });
    };
    SegmentActionButtons.prototype.getUrl = function () {
        var _a = this.props, segmentLabel = _a.segmentLabel, dimension = _a.dimension;
        if (!dimension || !dimension.url)
            return null;
        return dimension.url.replace(/%s/g, segmentLabel);
    };
    SegmentActionButtons.prototype.openRawDataModal = function () {
        var openRawDataModal = this.props.openRawDataModal;
        this.closeMoreMenu();
        openRawDataModal();
    };
    SegmentActionButtons.prototype.renderMoreMenu = function () {
        var segmentLabel = this.props.segmentLabel;
        var moreMenuOpenOn = this.state.moreMenuOpenOn;
        if (!moreMenuOpenOn)
            return null;
        var menuSize = index_1.Stage.fromSize(160, 160);
        var bubbleListItems = [
            React.createElement("li", {className: "clipboard", key: "copyValue", "data-clipboard-text": segmentLabel, onClick: this.closeMoreMenu.bind(this)}, constants_1.STRINGS.copyValue),
            React.createElement("li", {className: "view-raw-data", key: "view-raw-data", onClick: this.openRawDataModal.bind(this)}, constants_1.STRINGS.viewRawData)
        ];
        var url = this.getUrl();
        if (url) {
            bubbleListItems.push(React.createElement("li", {key: "goToUrl"}, React.createElement("a", {href: url, onClick: this.closeMoreMenu.bind(this), target: "_blank"}, constants_1.STRINGS.goToUrl)));
        }
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "more-menu", direction: "down", stage: menuSize, openOn: moreMenuOpenOn, align: "start", onClose: this.closeMoreMenu.bind(this)}, React.createElement("ul", {className: "bubble-list"}, bubbleListItems));
    };
    SegmentActionButtons.prototype.render = function () {
        var disableMoreMenu = this.props.disableMoreMenu;
        var moreMenuOpenOn = this.state.moreMenuOpenOn;
        return React.createElement("div", {className: "segment-action-buttons"}, React.createElement(button_1.Button, {type: "primary", className: "mini", onClick: this.onSelect.bind(this), title: constants_1.STRINGS.select}), React.createElement(button_1.Button, {type: "secondary", className: "mini", onClick: this.onCancel.bind(this), title: constants_1.STRINGS.cancel}), disableMoreMenu ? null : React.createElement(button_1.Button, {type: "secondary", className: "mini", onClick: this.onMore.bind(this), svg: require('../../icons/full-more-mini.svg'), active: Boolean(moreMenuOpenOn)}), this.renderMoreMenu());
    };
    return SegmentActionButtons;
}(React.Component));
exports.SegmentActionButtons = SegmentActionButtons;
