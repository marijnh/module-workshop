const {resolve, dirname} = require("path")
const {readFileSync} = require("fs")

// Map from filenames to Module objects for modules that have been
// loaded (or are in the process of loading)
const loaded = Object.create(null)

// Minimal module class
class Module {
  constructor(path) {
    this.path = path
    this.exports = {}
  }
}

// Create a `require` function for the given module. Uses the module's
// base path to resolve modules required from it.
function requireFor(module) {
  return function(name) {
    let file = resolve(module.path, name)
    if (!loaded[file]) loadModule(file)
    return loaded[file].exports
  }
}

// Load a module, reading it from disk, wrapping it in a function, and
// calling it with its own module and require values.
function loadModule(file) {
  let module = loaded[file] = new Module(dirname(file))
  let text = readFileSync(file, "utf8")
  let func = new Function("exports, require, module", text)
  func(module.exports, requireFor(module), module)
}

// The exported value is a require in the context of the program's
// working directory, which can be used to start loading modules
// through this module loader.
module.exports = requireFor(new Module(resolve(".")))
