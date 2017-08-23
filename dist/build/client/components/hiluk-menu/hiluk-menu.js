"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./hiluk-menu.css');
var React = require('react');
var index_1 = require('../../../common/models/index');
var constants_1 = require('../../config/constants');
var download_1 = require('../../utils/download/download');
var bubble_menu_1 = require('../bubble-menu/bubble-menu');
var HilukMenu = (function (_super) {
    __extends(HilukMenu, _super);
    function HilukMenu() {
        _super.call(this);
        this.state = {
            url: null,
            specificUrl: null
        };
    }
    HilukMenu.prototype.componentDidMount = function () {
        var _a = this.props, essence = _a.essence, getUrlPrefix = _a.getUrlPrefix;
        var urlPrefix = getUrlPrefix();
        var url = essence.getURL(urlPrefix);
        var specificUrl = essence.filter.isRelative() ? essence.convertToSpecificFilter().getURL(urlPrefix) : null;
        this.setState({
            url: url,
            specificUrl: specificUrl
        });
    };
    HilukMenu.prototype.openRawDataModal = function () {
        var _a = this.props, openRawDataModal = _a.openRawDataModal, onClose = _a.onClose;
        openRawDataModal();
        onClose();
    };
    HilukMenu.prototype.onExport = function () {
        var _a = this.props, onClose = _a.onClose, getDownloadableDataset = _a.getDownloadableDataset, essence = _a.essence;
        var dataSource = essence.dataSource, splits = essence.splits;
        if (!getDownloadableDataset)
            return;
        var filters = essence.getEffectiveFilter().getFileString(dataSource.timeAttribute);
        var splitsString = splits.toArray().map(function (split) {
            var dimension = split.getDimension(dataSource.dimensions);
            if (!dimension)
                return '';
            return constants_1.STRINGS.splitDelimiter + "_" + dimension.name;
        }).join("_");
        download_1.download(getDownloadableDataset(), download_1.makeFileName(dataSource.name, filters, splitsString), 'csv');
        onClose();
    };
    HilukMenu.prototype.render = function () {
        var _a = this.props, openOn = _a.openOn, onClose = _a.onClose, externalViews = _a.externalViews, essence = _a.essence, getDownloadableDataset = _a.getDownloadableDataset;
        var _b = this.state, url = _b.url, specificUrl = _b.specificUrl;
        var shareOptions = [
            React.createElement("li", {className: "copy-url clipboard", key: "copy-url", "data-clipboard-text": url, onClick: onClose}, constants_1.STRINGS.copyUrl)
        ];
        if (specificUrl) {
            shareOptions.push(React.createElement("li", {className: "copy-specific-url clipboard", key: "copy-specific-url", "data-clipboard-text": specificUrl, onClick: onClose}, constants_1.STRINGS.copySpecificUrl));
        }
        if (getDownloadableDataset()) {
            shareOptions.push(React.createElement("li", {className: "export", key: "export", onClick: this.onExport.bind(this)}, constants_1.STRINGS.exportToCSV));
        }
        shareOptions.push(React.createElement("li", {className: "view-raw-data", key: "view-raw-data", onClick: this.openRawDataModal.bind(this)}, constants_1.STRINGS.viewRawData));
        if (externalViews) {
            externalViews.forEach(function (externalView, i) {
                var url = externalView.linkGeneratorFn(essence.dataSource, essence.timezone, essence.filter, essence.splits);
                if (typeof url !== "string")
                    return;
                var title = constants_1.STRINGS.openIn + " " + externalView.title;
                var target = externalView.sameWindow ? "_self" : "_blank";
                shareOptions.push(React.createElement("li", {key: "custom-url-" + i}, React.createElement("a", {href: url, target: target}, title)));
            });
        }
        var stage = index_1.Stage.fromSize(200, 200);
        return React.createElement(bubble_menu_1.BubbleMenu, {className: "hiluk-menu", direction: "down", stage: stage, openOn: openOn, onClose: onClose}, React.createElement("ul", {className: "bubble-list"}, shareOptions));
    };
    return HilukMenu;
}(React.Component));
exports.HilukMenu = HilukMenu;
