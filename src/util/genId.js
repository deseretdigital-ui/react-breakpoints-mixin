var genId = (function () {
  var next = 1;
  return function () {
    return next++;
  };
})();

module.exports = genId;
