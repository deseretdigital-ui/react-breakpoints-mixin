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
    var classes = {
      'responsive-color': true,
      'responsive-color--width-small': this.breakpointMatched('width', 'small'),
      'responsive-color--width-medium': this.breakpointMatched('width', 'medium'),
      'responsive-color--width-large': this.breakpointMatched('width', 'large'),
      'responsive-color--height-short': this.breakpointMatched('height', 'short'),
      'responsive-color--height-medium': this.breakpointMatched('height', 'medium'),
      'responsive-color--height-long': this.breakpointMatched('height', 'long')
    };

    return React.addons.classSet(classes);
  },

  getStyles: function () {
    return {
      width: this.props.width,
      height: this.props.height
    };
  }

});

module.exports = ResonsiveColors;
