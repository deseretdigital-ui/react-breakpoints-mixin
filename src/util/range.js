var Range = function (min, max) {
  this.min = min;
  this.max = max;
};

Range.prototype = {
  contains: function (value, includeMin, includeMax) {
    includeMin = includeMin !== undefined ? includeMin : true;
    includeMax = includeMax !== undefined ? includeMax : true;
    var gtMin = includeMin ? value >= this.min : value > this.min;
    var ltMax = includeMax ? value <= this.max : value < this.max;
    return gtMin && ltMax;
  },

  overlaps: function (that, includeMin, includeMax) {
    that = (that instanceof Range) ? that : new Range(that[0], that[1]);
    includeMin = includeMin !== undefined ? includeMin : true;
    includeMax = includeMax !== undefined ? includeMax : true;
    var minInRange = that.contains(this.min, includeMin, includeMax);
    var maxInRange = that.contains(this.max, (includeMax ? includeMin : false), includeMax);
    var overlaps = minInRange || maxInRange;
    return overlaps;
  }
};

var range = function (arr) {
  return new Range(arr[0], arr[1]);
};

module.exports = range;
