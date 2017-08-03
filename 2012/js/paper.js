const $ = require("jquery")

// A Paper instance can be used to write plain text, possibly with a
// text prompt, to the DOM.
function Paper(element) {
  this.element = $(element)
}

// Write the given text to the DOM.
Paper.prototype.write = function(text) {
  this.element.append($("<div>", {text: text}))
}

// Write the given text to the DOM, followed by a text input, and call
// the given callback with the entered text and a DOM node that
// displays it when the user presses enter.
Paper.prototype.prompt = function(text, callback) {
  var input = $("<input>")
  this.element.append($("<div>", {text: text + " "}).append(input))
  input.on("keydown", function(event) {
    if (event.keyCode == 13) {
      let replace = $("<span>", {text: input.val()})
      input.replaceWith(replace)
      callback(input.val(), replace[0])
    }
  })
  input.focus()
}

module.exports = Paper
