const {readFileSync} = require("fs")
const {resolve, dirname} = require("path")

const visited = Object.create(null)

function visit(file) {
  if (visited[file]) return
  visited[file] = true
  let text = readFileSync(file, "utf8")
  let deps = /\/\/ DEPENDS: (.*)/.exec(text)
  if (deps) {
    let depRe = /\S+/g, match
    while (match = depRe.exec(deps[1]))
      visit(resolve(dirname(file), match[0]))
  }
  console.log(text)
}

visit(resolve(process.argv[2]))
