// A Paper instance can be used to write plain text, possibly with a
// text prompt, to the DOM.
function Paper(element) {
  this.element = element
}

// Write the given text to the DOM.
Paper.prototype.write = function(text) {
  this.element.appendChild(document.createElement("div")).textContent = text
}

// Write the given text to the DOM, followed by a text input, and call
// the given callback with the entered text and a DOM node that
// displays it when the user presses enter.
Paper.prototype.prompt = function(text, callback) {
  var wrap = this.element.appendChild(document.createElement("div"))
  wrap.textContent = text + " "
  var input = wrap.appendChild(document.createElement("input"))
  input.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
      var replace = document.createElement("span")
      replace.textContent = input.value
      wrap.replaceChild(replace, input)
      callback(input.value, replace)
    }
  })
  input.focus()
}
