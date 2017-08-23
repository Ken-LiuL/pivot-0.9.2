"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./about-modal.css');
var React = require('react');
var constants_1 = require('../../config/constants');
var modal_1 = require('../modal/modal');
var button_1 = require('../button/button');
var AboutModal = (function (_super) {
    __extends(AboutModal, _super);
    function AboutModal() {
        _super.call(this);
    }
    AboutModal.prototype.render = function () {
        var _a = this.props, version = _a.version, onClose = _a.onClose;
        return React.createElement(modal_1.Modal, {className: "about-modal", title: "About Pivot", onClose: onClose}, React.createElement("p", null, "For feedback and support please visit" + ' ' + "the ", React.createElement("a", {href: "https://groups.google.com/forum/#!forum/imply-user-group", target: '_blank'}, "Imply User Group"), "."), React.createElement("p", null, "For bug reports please create an issue on ", React.createElement("a", {href: "https://github.com/implydata/pivot/issues", target: '_blank'}, "GitHub"), "."), React.createElement("p", null, React.createElement("a", {href: "https://github.com/implydata/pivot", target: '_blank'}, "Pivot"), " (version ", version, ") is open source under" + ' ' + "the ", React.createElement("a", {href: "https://github.com/implydata/pivot/blob/master/LICENSE", target: '_blank'}, "Apache 2.0"), " license." + ' ' + "It is being built and maintained with great care by ", React.createElement("a", {href: "http://imply.io/", target: '_blank'}, "imply.io"), "."), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", onClick: onClose, title: constants_1.STRINGS.close})));
    };
    return AboutModal;
}(React.Component));
exports.AboutModal = AboutModal;
