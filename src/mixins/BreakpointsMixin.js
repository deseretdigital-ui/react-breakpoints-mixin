var windowResizeEvent = require('../util/windowResizeEvent');
var elementValue = require('../util/elementValue');
var warn = require('../util/warn');
var range = require('../util/range');


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
    this.breakpointsWarnOverlapping();
    this.breakpointsEvaluate();
    this.breakpointsSetup();
  },

  componentWillUnmount: function () {
    this.breakpointsTeardown();
  },

  breakpointsWarnOverlapping: function () {
    for (var property in this.breakpoints) {

      // collect all breakpoints in list for permutation comparisons
      var list = [];
      for (var name in this.breakpoints[property]) {
        list.push({
          name: name,
          range: this.breakpoints[property][name]
        });
      }

      // now check overlap for each permutation
      while (list.length > 0) {
        var a = list.shift();
        var limit = list.length;
        for (var i = 0; i < limit; i++) {
          var b = list[i];
          if (range(a.range).overlaps(b.range, true, false)) {
            warn(
              'BreakpointsMixin: overlapping '
              + property + ' breakpoints '
              + a.name + ' (' + a.range.join(', ') + ') and '
              + b.name + ' (' + b.range.join(', ') + ').'
            );
          }
        }
      }

    }
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
        if (range(breakpoints[name]).contains(value)) {
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
