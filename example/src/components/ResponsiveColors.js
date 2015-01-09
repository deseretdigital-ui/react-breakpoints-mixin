var React = require('react/addons');
var BreakpointsMixin = require('../../../src').BreakpointsMixin;


var ResonsiveColors = React.createClass({

  mixins: [BreakpointsMixin],

  propTypes: {
    width: React.PropTypes.string,
    height: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      width: null,
      height: null
    };
  },

  breakpoints: {
    width: {
      "small": [0, 400],
      "medium": [400, 600],
      "large": [600, Infinity]
    },
    height: {
      "short": [0, 100],
      "medium": [100, 200],
      "long": [200, Infinity]
    }
  },

  render: function () {
    return (
      <div className={this.getClasses()} style={this.getStyles()}>
        Click button or resize window.
      </div>
    );
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.shouldEvaluateBreakpoints(prevProps)) {
      this.breakpointsEvaluate();
    }
  },

  shouldEvaluateBreakpoints: function (prevProps) {
    return (
      this.props.width !== prevProps.width
      || this.props.height !== prevProps.height
    );
  },

  getClasses: function () {
    return React.addons.classSet(this.breakpointsClasses('responsive-colors'));
  },

  getStyles: function () {
    return {
      width: this.props.width,
      height: this.props.height
    };
  }

});

module.exports = ResonsiveColors;
