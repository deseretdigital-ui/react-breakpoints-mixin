var {addEventListener, removeEventListener} = require('../util/event');
var windowResizeEvent = require('../util/windowResizeEvent');
var elementValue = require('../util/elementValue');


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
