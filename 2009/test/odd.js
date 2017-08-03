const even = require("./even.js")

exports.odd = function(n) {
  return n == 0 ? false : even.even(n - 1)
}
