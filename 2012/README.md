# Exercises for the 2012 chapter

This directory contains a copy of the example web app with its modules
converted to CommonJS-style. The app doesn't run yet, because your
browser doesn't do CommonJS. It also has a `package.json` file
declaring some dependencies, which are pre-installed under
`node_modules`.

## Exercise 1: Finding require calls

Write a function `findRequires` that, given a file that contains
JavaScript code, find everything that looks like a require call with a
string literal as argument, and return an array of `{start, end,
value}` object. `start` and `end` are the string offsets directly
before and after the call's argument, and `value` is the value of that
argument.

If you were doing this 'for real', you'd need to parse the code, and
go through its syntax tree, keeping track of local variables so that
you can distinguish calls to the global `require` from calls to local
variables called `require`.

But since this is just an exercise, you can use a regular expression.

HINT: To get the value out of the string literal code, you can either
assume it doesn't contain any backslash escapes and just strip off the
code (who has escapes in their module names?), or run it through
`eval`.

HINT: Regular expressions' `exec` method will, when successful, return
an array-like value with first the whole match, and then any
parenthesized groups in the regular expression. This object will also
have an `index` property containing the index of the start of the
match. This is useful for figuring out where, exactly, the require's
argument starts and ends.

## Exercise 2: Modifying code

We will want to change the code before we dump it into the bundle, by
replacing the arguments to `require` with numbers that point at the
module's position in the bundle.

Write a function `replaceRanges(text, ranges)`, which takes a string
and an array of `{start, end, replacement}` objects, and replaces the
ranges indicated by each object with the string in their `replacement`
property. It should return the modified string.

The ranges may not overlap.

HINT: The order in which you do the replacements matter. It may be
easiest to sort the ranges before you apply them.

## Exercise 3: Putting the bundler together

Write a node script that takes its first command-line argument
(`process.argv[2]`) to be the starting script, and bundles that script
with all its dependencies into a bundle file. The output file might
look something like this:

    !function(modules) {
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
      function(exports, require, module) { ... }
      function(exports, require, module) { ... }
    ])

This will involve reading code files, finding their dependencies,
resolving those, and replacing their names with the number you assign
them in the bundle.

This time, use the `resolve` module from NPM (it is installed here) to
resolve modules, so that node's full resolution algorithm is used and
we can, for example, use jQuery from the `node_modules` directory.

    const resolve = require("resolve")
    console.log(resolve.sync("jquery", {basedir: __dirname}))

## Exercise 4: Confetti

As a bonus, let's use NPM to do what it does best: using obscure,
weird packages from the internet.

I've pre-installed a package called `dom-confetti`. Read its README.md
file to figure out what it does and how to use it. Set up `app.js` to
fire off a shot of confetti every time the user enters a correct
answer. Bundle the file, and test it out.
