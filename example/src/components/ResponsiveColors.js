var React = require('react/addons');
var BreakpointsMixin = require('../../../src');


var ResonsiveColors = React.createClass({

  mixins: [BreakpointsMixin],

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
      <h1 className={this.getClasses()} style={this.getStyles()}>
        Simple Example
      </h1>
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
