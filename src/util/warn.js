var warn = (function () {
  return function () {
    if (!console) { return; }
    if (console.warn) {
      var args = Array.prototype.slice.call(arguments);
      console.warn.apply(console, args);
    } else {
      var args = Array.prototype.slice.call(arguments);
      console.warn.apply(console, args);
    }
  };
})();


module.exports = warn;
