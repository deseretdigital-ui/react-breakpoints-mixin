(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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

	module.exports = __webpack_require__(1);


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


	var addEventListener = function (element, name, handler) {
	  if (element.addEventListener) {
	    element.addEventListener(name, handler);
	  } else {
	    element.attachEvent('on' + name, handler);
	  }
	};


	var removeEventListener = function (element, name, handler) {
	  if (element.removeEventListener) {
	    element.removeEventListener(name, handler);
	  } else {
	    element.detachEvent('on' + name, handler);
	  }
	};


	var throttle = (function() {
	  var throttle = null;

	  if (window.requestAnimationFrame) {
	    throttle = window.requestAnimationFrame;
	  }

	  var vendors = ['webkit', 'moz'];
	  for (var x = 0; x < vendors.length && !throttle; ++x) {
	    throttle = window[vendors[x]+'RequestAnimationFrame'];
	  }

	  if (!throttle) {
	    var lastTime = 0;
	    throttle = function(callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	        timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }

	  return throttle;
	})();


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
	    this.setupResizeSensor();
	  },

	  componentWillUnmount: function () {
	    this.teardownResizeSensor();
	  },

	  setupResizeSensor: function () {
	    var sensor = document.createElement('iframe');

	    // add essential styles
	    sensor.style.position = 'absolute';
	    sensor.style.left = '0px';
	    sensor.style.top = '0px';
	    sensor.style.right = '0px';
	    sensor.style.bottom = '0px';
	    sensor.style.width = '100%';
	    sensor.style.height = '100%';
	    sensor.style.zIndex = '-1';
	    sensor.style.visibility = 'hidden';
	    sensor.style.border = '0 none';

	    // add class name for easy identification
	    sensor.className = 'element-resize-sensor';

	    // append
	    this.getDOMNode().appendChild(sensor);

	    // add event listener
	    addEventListener(sensor.contentWindow, 'resize', this.breakpointsHandleResize);

	    // save it for later
	    this.breakpointsSensor = sensor;
	  },

	  teardownResizeSensor: function () {
	    removeEventListener(this.breakpointsSensor.contentWindow, 'resize', this.breakpointsHandleResize);
	  },

	  breakpointsHandleResize: function () {
	    throttle(this.breakpointsEvaluate);
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


/***/ }
/******/ ])
});
