console.log("(loading preprocess.js)")

module.exports = function(string) {
  return string.split("").map((ch, i) => i % 2 ? ch : ch.toUpperCase()).join("")
}
