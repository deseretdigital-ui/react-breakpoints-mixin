var React = require('react');
var ResizeSensor = require('./ResizeSensor');
require('./ResponsiveElement.scss');


var ResponsiveElement = React.createClass({

  propTypes: {
    breakpoints: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return {
      breakpoints: {
        width: {},
        height: {}
      }
    };
  },

  getInitialState: function () {
    return {
      breakpointsMatched: {
        width: [],
        height: []
      }
    };
  },

  render: function () {
    var { breakpoints, className, ...props } = this.props;

    return (
      <div className={this.getClassName()} {...props}>
        {this.props.children}
        <ResizeSensor onResize={this.handleResize} />
      </div>
    );
  },

  getClassName: function () {
    var classes = {
      'responsive-element': true
    };

    return React.addons.classSet(classes) + ' ' + this.props.className;
  },

  handleResize: function () {
    this.evaluateBreakpoints();
  },

  evaluateBreakpoints: function () {

  },

  getWidth: function () {
    return this.getDOMNode().offsetWidth;
  },

  getHeight: function () {
    return this.getDOMNode().offsetHeight;
  }

});


module.exports = ResponsiveElement;
