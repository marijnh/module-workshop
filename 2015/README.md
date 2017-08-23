# Exercises for the 2015 chapter

This directory contains a copy of the example web app written as ES
modules, and `rollup` installed under `node_modules`.

The `index.html` file refers to `src/app.js` using a script tag with
`type="module"`, which is supported on some browsers already, but may
not be supported on yours.

## Exercise 1: Rolling it up

Bundle the app with Rollup and change the HTML file to load the
bundle.

You can find the Rollup tool under `node_modules/.bin/rollup`. Use
`--help` to figure out how to use it.

Once it runs, look at the output and compare it to the original input
files. Did any new code get introduced? What happened to the `default`
export/import from `paper.js`? What if you rename the import? What if
you create a local variable that conflicts with another local variable
in another file?

## Exercise 2: Mapping it

Introduce a crash error somewhere in the code and look at the stack
trace and file locations in your browser's developer tools. They'll be
pointing at the bundle file.

Add the required command-line arguments for Rollup to make it generate
a source map, and see if that helps.

Once you have it right, look at the way the source map is represented
in the bundle.

## Exercise 3: Watch it

Set Rollup up to continuously recompile the code as you change it
('watch'), make some small changes and see how long it takes to
recreate the bundle.

## Exercise 4 (hard): Algorithm

Write pseudo-code that describes the algorithm Rollup might be using
to generate output like this. You can hand-wave over the
source-manipulation parts (such as finding and renaming top-level
variables, imports, and exports), and you may ignore imports like
`import * as X`.

HINT: Think in terms of _shared bindings_, rather than individual
variables.

## Exercise 5 (hard): Imported objects

Change the code to use the `import * as X from "./something.js"`
construct, which binds `X` to an object containing all the exports
from `something.js`. How does the output change?

If it doesn't change, the tool was still clever enough to see through
your added indirection, and removed it. Make it more indirect, to
force the tool to actually create an interface object.

How does this change the bundling algorithm?
