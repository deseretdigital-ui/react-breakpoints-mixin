var event = require('./event');
var throttle = require('./throttle');


var windowResizeEvent = (function () {

  var handlers = [];


  var executeHandlers = function () {
    var limit = handlers.length;
    for (var i = 0; i < limit; i++) {
      handlers[i]();
    }
  };

  var handler = function () {
    throttle(executeHandlers);
  };


  event.addListener(window, 'resize', handler);


  return {
    addListener: function (handler) {
      handlers.push(handler);
    },
    removeListener: function (handler) {
      var index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.slice(index, 1);
      }
    }
  };

})();


module.exports = windowResizeEvent;
