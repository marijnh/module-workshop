const odd = require("./odd.js")

exports.even = function(n) {
  return n == 0 ? true : odd.odd(n - 1)
}
