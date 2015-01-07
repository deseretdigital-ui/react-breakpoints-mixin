(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.BreakpointsMixin = __webpack_require__(1);
	module.exports.ResizeSensor = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var values = {
	  width: function (element) {
	    return element.offsetWidth;
	  },
	  height: function (element) {
	    return element.offsetHeight;
	  }
	};


	var BreakpointsMixin = {

	  getInitialState: function () {
	    var breakpointsMatched = {};

	    for (var property in this.breakpoints) {
	      breakpointsMatched[property] = [];
	    }

	    return {
	      breakpointsMatched: breakpointsMatched
	    };
	  },

	  componentDidMount: function () {
	    this.breakpointsEvaluate();
	  },

	  breakpointsHandleResize: function () {
	    this.breakpointsEvaluate();
	  },

	  breakpointsEvaluate: function () {
	    var matched = {};

	    for (var property in this.breakpoints) {
	      matched[property] = [];
	      var breakpoints = this.breakpoints[property];
	      var value = values[property](this.getDOMNode());

	      for (var name in breakpoints) {
	        var breakpoint = breakpoints[name];
	        var min = breakpoint[0];
	        var max = breakpoint[1];
	        if (min <= value && value < max) {
	          matched[property].push(name);
	        }
	      }
	    }

	    this.setState({ breakpointsMatched: matched });
	  },

	  breakpointMatched: function (property, name) {
	    return this.state.breakpointsMatched[property].indexOf(name) !== -1;
	  }

	};


	module.exports = BreakpointsMixin;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);


	var ResizeSensor = React.createClass({displayName: "ResizeSensor",

	  propTypes: {
	    onResize: React.PropTypes.func.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      onResize: null
	    };
	  },

	  render: function () {
	    return (
	      React.createElement("iframe", {className: "element-resize-sensor", style: this.getStyles()})
	    );
	  },

	  getStyles: function () {
	    return {
	      position: 'absolute',
	      left: '0px',
	      top: '0px',
	      right: '0px',
	      bottom: '0px',
	      width: '100%',
	      height: '100%',
	      zIndex: '-1',
	      visibility: 'hidden',
	      border: '0 none'
	    }
	  },

	  componentDidMount: function () {
	    this.getDOMNode().contentWindow.addEventListener('resize', this.handleResize);
	  },

	  componentWillUnmount: function () {
	    this.getDOMNode().contentWindow.removeEventListener('resize', this.handleResize);
	  },

	  handleResize: function () {
	    this.props.onResize();
	  }
	});

	module.exports = ResizeSensor;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
