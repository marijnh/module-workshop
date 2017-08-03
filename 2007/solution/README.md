# Solutions for the 2007 chapter

## Exercise 1: jQuery

To load jQuery, put the script tag for `js/jquery.js` somewhere before
the one for `paper.js`.

`exercises.js` is also using the global variable `$`, so this probably
broke your app. A good solution would be to wrap each module into an
'immediately invoked function expression', something like this:

    !function() {
      // Module code
      window.something = something // export to global scope
    }()

That way, local variable stay local to that function and you are less
likely to get conflicts.

## Exercise 2: Build system

Modules that go through the global scope to access each other can
simply be concatenated into one single file (using, for example, the
Unix utility `cat`), and they will still work.

The reason this is simpler than modern bundlers is that they do not
rely on any infrastructure that resolves module names to
interfaces—they simply 'know' the global that a given module will
create, and if that module has been evaluated, the global will be
present.

## Exercise 3: Dependency tree

There's a little node script in `build.js` that implements this. It
expects comments looking like this:

    // DEPENDS: ./jquery.js

And, starting from `process.argv[2]` (the first command-line
argument), it will read script files and continue to load dependencies
as long as it finds new ones (using an object to track file names of
already-seen dependencies).

To get the order right, the example solution makes sure to only output
a given script when all its dependencies have already been handled, so
that each module will appear after its dependencies in the output
file. (Algorithm nerds call this topological sorting.)

Congratulations, you've kind of written a bundler.
