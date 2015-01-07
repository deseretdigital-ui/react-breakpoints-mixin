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
