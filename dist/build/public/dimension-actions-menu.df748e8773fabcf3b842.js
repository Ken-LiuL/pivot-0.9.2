webpackJsonp([2],{

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(423);
	var React = __webpack_require__(5);
	var svg_icon_1 = __webpack_require__(176);
	var constants_1 = __webpack_require__(236);
	var index_1 = __webpack_require__(193);
	var bubble_menu_1 = __webpack_require__(304);
	var ACTION_SIZE = 60;
	var DimensionActionsMenu = (function (_super) {
	    __extends(DimensionActionsMenu, _super);
	    function DimensionActionsMenu() {
	        _super.call(this);
	    }
	    DimensionActionsMenu.prototype.onFilter = function () {
	        var _a = this.props, dimension = _a.dimension, triggerFilterMenu = _a.triggerFilterMenu, onClose = _a.onClose;
	        triggerFilterMenu(dimension);
	        onClose();
	    };
	    DimensionActionsMenu.prototype.onSplit = function () {
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, triggerSplitMenu = _a.triggerSplitMenu, onClose = _a.onClose;
	        if (essence.splits.hasSplitOn(dimension) && essence.splits.length() === 1) {
	            triggerSplitMenu(dimension);
	        }
	        else {
	            clicker.changeSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.UnfairGame);
	        }
	        onClose();
	    };
	    DimensionActionsMenu.prototype.onSubsplit = function () {
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, triggerSplitMenu = _a.triggerSplitMenu, onClose = _a.onClose;
	        if (essence.splits.hasSplitOn(dimension)) {
	            triggerSplitMenu(dimension);
	        }
	        else {
	            clicker.addSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.UnfairGame);
	        }
	        onClose();
	    };
	    DimensionActionsMenu.prototype.onPin = function () {
	        var _a = this.props, clicker = _a.clicker, dimension = _a.dimension, onClose = _a.onClose;
	        clicker.pin(dimension);
	        onClose();
	    };
	    DimensionActionsMenu.prototype.render = function () {
	        var _a = this.props, direction = _a.direction, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose;
	        if (!dimension)
	            return null;
	        var menuSize = index_1.Stage.fromSize(ACTION_SIZE * 2, ACTION_SIZE * 2);
	        return React.createElement(bubble_menu_1.BubbleMenu, {className: "dimension-actions-menu", direction: direction, containerStage: containerStage, stage: menuSize, fixedSize: true, openOn: openOn, onClose: onClose}, React.createElement("div", {className: "filter action", onClick: this.onFilter.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(425)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.filter)), React.createElement("div", {className: "pin action", onClick: this.onPin.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(317)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.pin)), React.createElement("div", {className: "split action", onClick: this.onSplit.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(426)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.split)), React.createElement("div", {className: "subsplit action", onClick: this.onSubsplit.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(427)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.subsplit)));
	    };
	    return DimensionActionsMenu;
	}(React.Component));
	exports.DimensionActionsMenu = DimensionActionsMenu;


/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(424);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./dimension-actions-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./dimension-actions-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".dimension-actions-menu{padding:8px}.dimension-actions-menu .action{display:inline-block;width:50px;height:50px;cursor:pointer;text-align:center;color:#1ea3e6;font-size:12px}.dimension-actions-menu .action svg{width:18px;padding-top:7px;padding-bottom:4px}.dimension-actions-menu .action svg path{fill:#1ea3e6}.dimension-actions-menu .action:hover::before{content:'';position:absolute;top:3px;bottom:3px;left:3px;right:3px;background:#e3f4fc}\n", ""]);

	// exports


/***/ }

});