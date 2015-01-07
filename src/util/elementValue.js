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
