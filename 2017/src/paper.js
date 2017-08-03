// A Paper instance can be used to write plain text, possibly with a
// text prompt, to the DOM.
export default class Paper {
  constructor(element) {
    this.element = element
  }

  // Write the given text to the DOM.
  write(text) {
    this.element.appendChild(document.createElement("div")).textContent = text
  }

  // Write the given text to the DOM, followed by a text input, and call
  // the given callback with the entered text and a DOM node that
  // displays it when the user presses enter.
  prompt(text, callback) {
    let wrap = this.element.appendChild(document.createElement("div"))
    wrap.textContent = text + " "
    let input = wrap.appendChild(document.createElement("input"))
    input.addEventListener("keydown", event => {
      if (event.keyCode == 13) {
        let replace = document.createElement("span")
        replace.textContent = input.value
        wrap.replaceChild(replace, input)
        callback(input.value, replace)
      }
    })
    input.focus()
  }
}
