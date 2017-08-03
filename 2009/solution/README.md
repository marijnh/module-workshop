# Solutions for the 2009 chapter

## Exercise 1: Implement a pseudo-CommonJS loader

The solution is implemented in `loader.js`, which contains comments
that explain it.

## Exercise 2: Shared and cyclic dependencies

The given solution gets this right. It uses the `loaded` object to
store a `Module` instance, which holds the module's exports, for each
module that it loads, and makes sure to use those when the same module
is asked for again.

The keys in the `loaded` object are full pathnames, so that requiring
the same module through two different relative paths still reuses the
already loaded module.

Cyclic dependencies are handled by storing the `Module` object
_before_ evaluating the module's code. At this point, `module.exports`
holds the original default `exports` object. If, while evaluating the
module, some _other_ module asks for this one again, it will get that
default object. This is why cyclic modules only work when using the
default exports—if you set `module.exports` to something else, there
is no way other modules could get access to that before it was set.
