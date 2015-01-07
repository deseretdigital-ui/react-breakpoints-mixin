var React = require('react/addons');
var ResponsiveColors = require('./ResponsiveColors');
require('./SimpleExample.scss');


var SimpleExample = React.createClass({

  statics: {
    render: function (element) {
      React.render(<SimpleExample />, element);
    }
  },

  getInitialState: function () {
    return {
      width: 700,
      height: 50
    }
  },

  render: function () {
    var things = [];

    var limit = 1000;
    for (var i = 0; i <= limit; i++) {
      things.push(
        <ResponsiveColors width={this.getWidth()} height={this.getHeight()} key={'thing-' + i} />
      );
    }

    return (
      <div className="simple-example">

        <div>
          <label>Width</label>
          <input type="number" value={this.state.width} onChange={this.handleWidthChange} ref="width" />
          <input type="button" onClick={this.handleWidthButtonClick} value={300} />
          <input type="button" onClick={this.handleWidthButtonClick} value={400} />
          <input type="button" onClick={this.handleWidthButtonClick} value={600} />
        </div>

        <div>
          <label>Height</label>
          <input type="number" value={this.state.height} onChange={this.handleHeightChange} ref="height" />
          <input type="button" onClick={this.handleHeightButtonClick} value={50} />
          <input type="button" onClick={this.handleHeightButtonClick} value={100} />
          <input type="button" onClick={this.handleHeightButtonClick} value={200} />
        </div>

        {things}
      </div>
    );
  },

  handleWidthChange: function (event) {
    var value = this.refs.width.getDOMNode().value;
    this.setState({ width: value });
  },

  handleWidthButtonClick: function (event) {
    var value = event.target.value;
    this.setState({ width: value });
  },

  getWidth: function () {
    return this.state.width + 'px';
  },

  handleHeightChange: function (event) {
    var value = this.refs.height.getDOMNode().value;
    this.setState({ height: value });
  },

  handleHeightButtonClick: function (event) {
    var value = event.target.value;
    this.setState({ height: value });
  },

  getHeight: function () {
    return this.state.height + 'px';
  }

});

module.exports = SimpleExample;
