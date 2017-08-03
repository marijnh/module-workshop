# Solutions for the 2012 chapter

## Exercise 1: Rolling it up

Just doing

    node_modules/.bin/rollup src/app.js -o bundle.js

works. You might want to add `-f iife` to make the tool wrap the
output in a function.

## Exercise 2: Mapping it

You can do

    node_modules/.bin/rollup src/app.js -o bundle.js -m bundle.js.map

To generate a separate file `bundle.js.map` holding the source map,
and a comment in `bundle.js` pointing at that. Or you can do `-m
inline` instead to put the whole source map inline, which is
convenient during debugging, but would be wasteful in production.

Note that the source map contains both the plain text of the input
code, the corresponding filenames, and a bunch of obscure-looking data
that maps from the output code to the original input code.

## Exercise 3: Watch it

Add the `-w` flag to your command-line arguments.

I'm seeing recompilation times in the range of 20ms, but of course
these'll get bigger for bigger projects, since at the very least, the
whole bundle file has to be rebuilt and written to disk.

## Exercise 4: Algorithm

Something like this:

 - Create a list of top-level bindings, each of which has an origin
   module, a local name, an optional exported name, and an optional
   imported name + module.

 - Starting with the entry script, read modules and add their
   top-level bindings to the binding list. As long as there are any
   imported bindings whose source module hasn't been added, add that
   module as well.

 - Create a list of merged bindings, each of which has a name and a
   list of names and origin modules pointing at the original variables
   that were merged into it.

 - Go over the original binding list, merging imported bindings with
   their exports, and creating new names for bindings when their name
   is already taken (in the new list) or they didn't have a name yet
   (`export default`).

 - For each module, remove import statements, and change export
   statements to their non-exporting form. Replace `export default`
   with a `const` statement defining the binding's new name. If
   bindings in the module have been renamed, substitute the new name
   for the old one.

 - Dump the code from all the modules into one big file, sorted by
   dependency order, optionally wrapping it in an immediately invoked
   function expression.

## Exercise 5: Imported objects

Rollup generates module interface objects for modules that are
imported using the `* as` syntax, and binds the import's name to that
object.

In the bundler algorithm, some modules could be flagged as being
imported this way, and special binding records could be created for
those. When generating code, these bindings could then be written as
`const` statements binding the name to an object literal. The
`exports` for a module can be statically determined, allowing us to
find out which fields to add to that object and what to bind them to.
