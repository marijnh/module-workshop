# Exercises for the 2009 chapter

The `test` subdirectory contains a few example scripts to test your
code on.

## Exercise 1: Implement a pseudo-CommonJS loader

Write a minimal implementation of a CommonJS loader. That is, a
function that can load a main module, providing it with appropriate
`exports`, `require`, and `module` bindings, through which it can load
its dependencies and specify its exports.

Resolution can be very simple, just resolve the given path as relative
to the requiring module's own path. You don't even need to add the
`.js` extension.

Use your loader to load `test/main.js`, for example like this:

    require("./myloader")("./test/main.js")

Once it works, compare the output with what you get when you directly
run `node test/main.js`.

### If you're not familiar with node

These are some useful pieces of functionality that you might need:

You can run `node` to get a prompt where you can write JavaScript,
including expressions that use `require` to load modules. You can run
`node filename.js` to run the script in the given file.

The built-in `path` module provides ways to manipulate paths.
`resolve` to resolve relative paths, `basename` to go from a file name
to a directory name.

    const {resolve, basename} = require("path")
    console.log(resolve("/foo/bar/baz.js", "./bug.js"))
    "/foo/bar/baz.js/bug.js" // Oh no
    console.log(resolve(basename("/foo/bar/baz.js"), "./bug.js"))
    "/foo/bar/bug.js" // Better!

The `fs` module provides filesystem access. Specifically, a way to
read the modules that we need. The awkward `sync` in the function name
comes from the fact that, by default, everything in node happens
asynchronous, but we don't want to deal with that here.

     const {readFileSync} = require("fs")
     console.log(readFileSync("myfile", "utf8"))
     // And you get the content of myfile

By default, reading a file gives you a binary buffer object. The
`"utf8"` argument tells it to convert the file content to a string,
using UTF-8 encoding.

The value that loading your file (with `require`) produces can be
changed by assigning to `module.exports`.

To access command-line arguments, use `process.argv`, which is an
array of arguments. The first two are `node` and the name of the
script that was started, the ones starting from index 2 are the actual
arguments.

### Evaluating code

When you have a string of code you want to evaluate, you could just
call `eval` on it and that'd mostly work. But that will evaluate the
code in the local scope of your module loader, which is weird.
Instead, you can do a 'global eval' by making the call to `eval`
indirect somehow, for example by first storing it in a variable (this
is a weird historical accident):

    let indirectEval = eval
    console.log(indirectEval("1 + 2"))

Or you can use the function constructor, passing first a
comma-separated list of parameters and then the function body,
something like this:

    let func = new Function("arg1, arg2", "return arg1 + arg2")
    console.log(func(1, 2))

## Exercise 2: Shared and cyclic dependencies

The dependency graph of `main.js` looks something like this:

    main.js → hello.js
        ↘           ↘
        world.js → preprocess.js

`preprocess.js` is outputs something to the console when it is loaded.
Does that occur once or twice when you load the code with your loader?
If twice, your module caching is broken (or not implemented) and needs
more work.

Now try to load `test/even.js`, whose graph looks like this:

    even.js ←→ odd.js

For example by doing this:

    const {even} = require("./myloader")("test/even.js")
    console.log(even(11))

What happens depends on how, exactly, you wrote your loader. If it
already works, great, you may consider this exercise to be to explain
_why_ it works. If not, continue.

Cyclic dependencies are usually not a great idea, but CommonJS allows
them, _if_ the modules leave their default `exports` object, instead
of replacing it with a new value, _and_ they don't actually read from
this object until both have finished loading. This is why the cyclic
example modules are written a bit awkwardly:

    const odd = require("./odd.js")
    exports.even = function(n) {
      return n == 0 ? true : odd.odd(n - 1)
    }

Rather than just doing `const {odd} = ...`, it stores the whole
exports object and only reads from it when it's actually called.

Can you fix your loader to allow this style of cyclic modules?
