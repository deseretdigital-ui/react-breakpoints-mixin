var event = {

  addListener: function (element, name, handler) {
    if (element.addEventListener) {
      element.addEventListener(name, handler);
    } else {
      element.attachEvent('on' + name, handler);
    }
  },

  removeListener: function (element, name, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(name, handler);
    } else {
      element.detachEvent('on' + name, handler);
    }
  }
};

module.exports = event;
