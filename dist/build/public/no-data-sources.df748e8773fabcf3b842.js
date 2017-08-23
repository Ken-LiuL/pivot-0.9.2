webpackJsonp([9],{

/***/ 236:
/***/ function(module, exports) {

	"use strict";
	exports.TITLE_HEIGHT = 36;
	// Core = filter + split
	exports.DIMENSION_HEIGHT = 27;
	exports.MEASURE_HEIGHT = 27;
	exports.CORE_ITEM_WIDTH = 192;
	exports.CORE_ITEM_GAP = 8;
	exports.BAR_TITLE_WIDTH = 66;
	exports.PIN_TITLE_HEIGHT = 36;
	exports.PIN_ITEM_HEIGHT = 25;
	exports.PIN_PADDING_BOTTOM = 12;
	exports.VIS_H_PADDING = 10;
	exports.VIS_SELECTOR_WIDTH = 79;
	exports.OVERFLOW_WIDTH = 40;
	exports.SPLIT = 'SPLIT';
	exports.MAX_SEARCH_LENGTH = 300;
	exports.SEARCH_WAIT = 900;
	exports.STRINGS = {
	    home: 'Home',
	    settings: 'Settings',
	    dimensions: 'Dimensions',
	    measures: 'Measures',
	    filter: 'Filter',
	    split: 'Split',
	    subsplit: 'Split',
	    sortBy: 'Sort by',
	    limit: 'Limit',
	    pin: 'Pin',
	    pinboard: 'Pinboard',
	    pinboardPlaceholder: 'Click or drag dimensions to pin them',
	    granularity: 'Granularity',
	    relative: 'Relative',
	    specific: 'Specific',
	    noFilter: 'No filter',
	    latest: 'Latest',
	    current: 'Current',
	    previous: 'Previous',
	    start: 'Start',
	    end: 'End',
	    ok: 'OK',
	    select: 'Select',
	    cancel: 'Cancel',
	    close: 'Close',
	    queryError: 'Query error',
	    autoUpdate: 'Auto update',
	    download: 'Download',
	    copyUrl: 'Copy URL',
	    viewRawData: 'View raw data',
	    rawData: 'Raw Data',
	    copySpecificUrl: 'Copy URL - fixed time',
	    logout: 'Logout',
	    infoAndFeedback: 'Info & Feedback',
	    copyValue: 'Copy value',
	    goToUrl: 'Go to URL',
	    openIn: 'Open in',
	    segment: 'segment',
	    exportToCSV: 'Export to CSV',
	    updateTimezone: 'Update Timezone',
	    timezone: 'Timezone',
	    splitDelimiter: 'by',
	    any: 'any',
	    noQueryableDataSources: 'There are no queryable data sources configured',
	    include: 'Include',
	    exclude: 'Exclude',
	    intersection: 'Intersection',
	    stringSearch: 'String search',
	    regex: 'Regex'
	};
	var EN_US = {
	    shortDays: ["S", "M", "T", "W", "T", "F", "S"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
	    weekStart: 0
	};
	function getLocale() {
	    return EN_US;
	}
	exports.getLocale = getLocale;


/***/ },

/***/ 537:
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 44 44\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#888888\" fill-rule=\"evenodd\"><path d=\"M28.9681047,20.032976 C28.9681047,19.6865607 28.7698491,19.3699088 28.4558863,19.2152889 L19.4283348,14.7661309 C19.1682989,14.6379417 18.862364,14.6379417 18.6022699,14.7661309 L9.57460207,19.2152889 C9.26081375,19.3699088 9.0625,19.6684614 9.0625,20.0439505 L9.0625,29.9388209 C9.0625,30.2836274 9.25912672,30.5990727 9.57070444,30.754497 L18.5983141,35.2568038 C18.7297282,35.322421 18.8726026,35.3548849 19.015186,35.3548849 C19.2398524,35.3548849 19.4697544,35.2375553 19.4696962,35.2381299 L28.4599003,30.7544395 C28.7715362,30.5990152 28.9681047,30.2835699 28.9681047,29.9387635 C28.9681047,29.9388784 28.9681047,20.0418246 28.9681047,20.032976 L28.9681047,20.032976 Z M19.0153024,16.6050794 L25.9706526,20.032976 L19.0153024,23.4608152 L12.0599522,20.032976 L19.0153024,16.6050794 L19.0153024,16.6050794 Z M10.9128854,21.5101679 L18.0901097,25.04735 L18.0901097,32.956064 L10.9128854,29.3765928 L10.9128854,21.5101679 L10.9128854,21.5101679 Z M27.1177193,29.3765928 L19.9404951,32.956064 L19.9404951,25.04735 L27.1177775,21.5101679 L27.1177775,29.3765928 L27.1177193,29.3765928 Z\" transform=\"translate(8 4)\"/><path d=\"M16.9480085,15.5807816 L17.1403996,15.574277 C17.4543624,15.7288969 19.958659,15.2278617 19.958659,15.574277 C19.958659,15.5831255 19.958659,25.4801793 19.958659,25.4800644 C19.958659,25.8248708 19.7620905,26.1403162 19.4504546,26.2957405 L10.4602505,30.7794308 C10.4603087,30.7788563 10.2304067,30.8961858 10.0057403,30.8961858 C9.86315687,30.8961858 9.72028254,30.863722 9.58886841,30.7981047 L0.561258751,26.2957979 C0.249681028,26.1403736 0.0530543098,25.8249283 0.0530543098,25.4801219 L0.0530543098,15.5852515 C0.0530543098,15.2097624 3.32632048,16.1853343 3.6401088,16.0307144 L3.95504778,16.0200665 L10.0058567,19.0021161 L16.9480085,15.5807816 Z M1.90343971,17.0514689 L9.08066397,20.5886509 L9.08066397,28.497365 L1.90343971,24.9178937 L1.90343971,17.0514689 L1.90343971,17.0514689 Z M18.1082736,24.9178937 L10.9310494,28.497365 L10.9310494,20.5886509 L18.1083318,17.0514689 L18.1083318,24.9178937 L18.1082736,24.9178937 Z\" transform=\"translate(8 4)\"/><path d=\"M19.958659,5.4204308 C19.958659,5.07401553 19.7604035,4.75736359 19.4464406,4.60274367 L10.4188891,0.153585672 C10.1588532,0.0253965084 9.85291831,0.0253965084 9.59282421,0.153585672 L0.565156381,4.60274367 C0.251368062,4.75736359 0.0530543098,5.05591621 0.0530543098,5.43140531 L0.0530543098,15.3262757 C0.0530543098,15.6710821 0.249681028,15.9865275 0.561258751,16.1419518 L9.58886841,20.6442586 C9.72028254,20.7098758 9.86315687,20.7423397 10.0057403,20.7423397 C10.2304067,20.7423397 10.4603087,20.6250101 10.4602505,20.6255847 L19.4504546,16.1418943 C19.7620905,15.98647 19.958659,15.6710247 19.958659,15.3262182 C19.958659,15.3263332 19.958659,5.42927936 19.958659,5.4204308 L19.958659,5.4204308 Z M10.0058567,1.9925342 L16.9612069,5.4204308 L10.0058567,8.84826994 L3.05050647,5.4204308 L10.0058567,1.9925342 L10.0058567,1.9925342 Z M1.90343971,6.89762273 L9.08066397,10.4348048 L9.08066397,18.3435188 L1.90343971,14.7640476 L1.90343971,6.89762273 L1.90343971,6.89762273 Z M18.1082736,14.7640476 L10.9310494,18.3435188 L10.9310494,10.4348048 L18.1083318,6.89762273 L18.1083318,14.7640476 L18.1082736,14.7640476 Z\" transform=\"translate(8 4)\"/></g></svg>"

/***/ },

/***/ 615:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(616);
	var React = __webpack_require__(5);
	var constants_1 = __webpack_require__(236);
	var svg_icon_1 = __webpack_require__(176);
	var NoDataSourcesApplication = (function (_super) {
	    __extends(NoDataSourcesApplication, _super);
	    function NoDataSourcesApplication() {
	        _super.call(this);
	    }
	    NoDataSourcesApplication.prototype.componentDidMount = function () {
	        this.refreshTimer = setInterval(function () {
	            window.location.reload(true);
	        }, 10000);
	    };
	    NoDataSourcesApplication.prototype.componentWillUnmount = function () {
	        if (this.refreshTimer) {
	            clearInterval(this.refreshTimer);
	            this.refreshTimer = null;
	        }
	    };
	    NoDataSourcesApplication.prototype.render = function () {
	        return React.createElement("div", {className: "no-data-sources-application"}, React.createElement("div", {className: "icon"}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(537)})), React.createElement("p", null, constants_1.STRINGS.noQueryableDataSources));
	    };
	    return NoDataSourcesApplication;
	}(React.Component));
	exports.NoDataSourcesApplication = NoDataSourcesApplication;


/***/ },

/***/ 616:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(617);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./no-data-sources-application.css", function() {
				var newContent = require("!!./../../../../node_modules/laborer/node_modules/css-loader/index.js!./no-data-sources-application.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 617:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".no-data-sources-application{margin-top:280px;text-align:center;font-size:16px;color:#999}.no-data-sources-application .icon{display:inline-block;margin-bottom:6px;width:42px}.no-data-sources-application .icon svg{width:42px}.no-data-sources-application p{display:block}\n", ""]);

	// exports


/***/ }

});