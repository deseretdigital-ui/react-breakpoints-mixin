var React = require('react');


var ResizeSensor = React.createClass({

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
      <iframe className="element-resize-sensor" style={this.getStyles()} />
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
