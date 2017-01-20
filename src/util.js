module.exports = {
  // extend a object
  extend: function (src, defaults) {
    for (var k in defaults) {
      src[k] = src[k] || defaults[k];
    }
    return src;
  }
};
