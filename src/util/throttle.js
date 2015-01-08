var throttle = (function() {
  var throttle = null;

  if (window.requestAnimationFrame) {
    throttle = window.requestAnimationFrame;
  }

  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !throttle; ++x) {
    throttle = window[vendors[x]+'RequestAnimationFrame'];
  }

  if (!throttle) {
    var lastTime = 0;
    throttle = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  return throttle;
})();

module.exports = throttle;
