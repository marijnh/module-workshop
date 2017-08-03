// Exercise 1: find all instances of `require(someString)` in a file
function findRequires(code) {
  // Note that the regexp has to be global (`/g`) to make repeatedly
  // calling `exec` advance through the file.
  let re = /\brequire\s*\(\s*(['"][^'"]*['"])\s*\)/g
  let result = [], match
  // For each match
  while (match = re.exec(code)) {
    // Compute the start of the argument by searching the matched
    // string for the first quote (we're only matching calls with
    // quotes) and adding its position to `match.index`.
    let start = match.index + match[0].search(/['"]/)
    // `match[1]` holds the literal, to `start + match[1].length` is
    // its end. We can simply evaluate it, since it's only a string
    // literal.
    result.push({start, end: start + match[1].length, value: eval(match[1])})
  }
  return result
}

// Sort the ranges, inverted, by their start position, so that we can
// replace from back to front, which makes sure that start/end indices
// aren't disturbed by previous replaces. Then patch `text` for each
// replacment.
function replaceRanges(text, ranges) {
  ranges.sort((a, b) => b.start - a.start).forEach(({start, end, replacement}) => {
    text = text.slice(0, start) + replacement + text.slice(end)
  })
  return text
}

// This is the `resolve` package from NPM.  
const resolve = require("resolve")
const path = require("path")
const {readFileSync} = require("fs")

// The bundle header boilerplate code.
const header = `!function(modules) {
  var loaded = []
  function require(i) {
    if (!loaded[i]) {
      var mod = loaded[i] = {exports: {}}
      modules[i](mod.exports, require, mod)
    }
    return loaded[i].exports
  }
  require(0)
}([
`

// Produce the actual bundle.
function bundle(file) {
  // `files` holds the file names of the bundled files, `code` holds
  // the code strings for them in the output code.
  let files = [], code = []

  // Add a file to the bundle. Will scan it for dependencies and
  // recursively add those too. This will return the file's ID in the
  // bundle.
  function addDep(file) {
    let fileID = files.indexOf(file)
    // If already in the bundle, we're done.
    if (fileID > -1) return fileID

    // Add it to the set of files, so that subsequent calls find it,
    // even if we aren't done yet.
    fileID = files.length
    files[fileID] = file

    let text = readFileSync(file, "utf8")
    let deps = findRequires(text)
    // For each dependency, add it, and create a replacement range
    // that puts the dependency's ID here.
    let replace = deps.map(({start, end, value}) => {
      let depID = addDep(resolve.sync(value, {basedir: path.dirname(file)}))
      return {start, end, replacement: depID}
    })
    // Store the code for this file, including the CommonJS wrapper
    // function.
    code[fileID] = `function(exports, require, module) {${replaceRanges(text, replace)}}`
    return fileID
  }

  // Start with the entry script.
  addDep(file)

  // And put everything together into a working bundle.
  return header + code.join(",\n") + "\n]);"
}

console.log(bundle(path.resolve(process.argv[2])))
