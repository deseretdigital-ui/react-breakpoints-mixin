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

	var $__0=   __webpack_require__(2),addEventListener=$__0.addEventListener,removeEventListener=$__0.removeEventListener;
	var windowResizeEvent = __webpack_require__(3);
	var elementValue = __webpack_require__(4);


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
	    this.breakpointsSetup();
	  },

	  componentWillUnmount: function () {
	    this.breakpointsTeardown();
	  },

	  breakpointsSetup: function () {
	    windowResizeEvent.addListener(this.breakpointsEvaluate);
	  },

	  breakpointsTeardown: function () {
	    windowResizeEvent.removeListener(this.breakpointsEvaluate);
	  },

	  breakpointsEvaluate: function () {
	    var matched = {};

	    for (var property in this.breakpoints) {
	      matched[property] = [];
	      var breakpoints = this.breakpoints[property];
	      var value = elementValue(this.getDOMNode(), property);

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
	  },

	  breakpointsClasses: function (className) {
	    var classes = {};
	    classes[className] = true;

	    for (var property in this.state.breakpointsMatched) {
	      var breakpointsMatched = this.state.breakpointsMatched[property];
	      breakpointsMatched.forEach(function (name) {
	        classes[className + '--' + property + '-' + name] = true;
	      });
	    }

	    return classes;
	  }

	};


	module.exports = BreakpointsMixin;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var event = {

	  addListener: function (element, name, handler) {
	    if (element.addEventListener) {
	      element.addEventListener(name, handler);
	    } else {
	      element.attachEvent('on' + name, handler);
	    }
	  },

	  removeListener: function (element, name, handler) {
	    if (element.removeEventListener) {
	      element.removeEventListener(name, handler);
	    } else {
	      element.detachEvent('on' + name, handler);
	    }
	  }
	};

	module.exports = event;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var event = __webpack_require__(2);
	var throttle = __webpack_require__(5);


	var windowResizeEvent = (function () {

	  var handlers = [];


	  var executeHandlers = function () {
	    var limit = handlers.length;
	    for (var i = 0; i < limit; i++) {
	      handlers[i]();
	    }
	  };

	  var handler = function () {
	    throttle(executeHandlers);
	  };


	  event.addListener(window, 'resize', handler);


	  return {
	    addListener: function (handler) {
	      handlers.push(handler);
	    },
	    removeListener: function (handler) {
	      var index = handlers.indexOf(handler);
	      if (index !== -1) {
	        handlers.slice(index, 1);
	      }
	    }
	  };

	})();


	module.exports = windowResizeEvent;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var values = {
	  width: function (element) {
	    return element.offsetWidth;
	  },
	  height: function (element) {
	    return element.offsetHeight;
	  }
	};

	var elementValue = function (element, name) {
	  return values[name](element);
	};

	module.exports = elementValue;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = throttle;


/***/ }
/******/ ])
});
