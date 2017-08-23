webpackJsonp([8],{

/***/ 612:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(613);
	var React = __webpack_require__(5);
	var constants_1 = __webpack_require__(236);
	var modal_1 = __webpack_require__(501);
	var button_1 = __webpack_require__(341);
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


/***/ },

/***/ 613:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(614);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./about-modal.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./about-modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 614:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".about-modal p{margin-bottom:14px;line-height:20px}.about-modal p:last-child{margin-bottom:0}.about-modal a{color:#1ea3e6;cursor:pointer}.about-modal a:hover{text-decoration:underline}.about-modal .button-bar{padding-top:6px}\n", ""]);

	// exports


/***/ }

});