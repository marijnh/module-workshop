# Exercises for the 2012 chapter

This directory contains a copy the example web again, slightly
restructured to use a `dist` directory for the actual web-accessible
files. It comes with Webpack pre-installed, and a `webpack.config.js`
file that configures Webpack, when run without arguments (from
`node_modules/.bin/webpack`), to build the bundle and put it in
`dist/`.

## Exercise 1: Splitting

This instance of the app uses `dom-confetti` to show confetti again.
Imagine for a moment that that library is _huuuge_ (it's not), and we
want to delay loading it until necessary—until the user entered a
correct answer—to improve load time.

Use a dynamic import (`import(modulename)`, returning a promise),
which Webpack supports, to delay loading `dom-confetti`. Look at
network activity in your browser's dev tools to verify that there is a
second bundle being loaded when you enter a correct answer.

HINT: Make sure to also remove the static import for `dom-confetti`,
or it will just end up in the main bundle.

## Exercise 2: Importing CSS

Currently, `paper.css` is a regular static file under `dist/`. When
working with multiple modules, each of which needs its own CSS,
managing `<link>` tags can be as cumbersome as manually managing
`<script>` tags. With the right plugins, Webpack allows you to
'import' CSS files from your scripts, automatically making their
content available in the page when you load your bundle.

These plugins, `style-loader` and `css-loader`, are pre-installed in
this directory. Move `paper.css` to `src/`, import it from
`src/paper.js`, and remove the `<link>` tag that includes it.

Next, set up Webpack to actually allow that kind of importing. The
readme file in `node_modules/style-loader/` is probably useful here.

## Exercise 3: Seeing bundles

With magic tools like Webpack, which do rather complicated things
under a convenient interface, it's easy to lose track of what actually
ends up in your bundle. Opening them in a text file is instructive,
but when you have a lot of stuff in there that becomes hard to see
through.

The `webpack-bundle-analyzer` plugin (pre-installed) can be very
helpful here. It's a plugin that, when enabled, opens up a browser
window with a visual representation of your bundle(s) and their
content.

Enable it for this project, using information from
`node_modules/webpack-bundle-analyzer/README.md`, and play around with
the visualization. Do you see anything unexpected?

## Exercise 4 (hard): Diamond splitting

If you dynamically import multiple modules, Webpack will create a
separate bundle for each of them. These bundles also include any
dependencies of the dynamically imported module that weren't already
part of the main bundle.

What happens if two dynamically imported modules share a (big)
dependency? Can you think of a solution that allows people to avoid
reloading the same code over and over without requiring a lot of
manual configuration?

NOTE: Webpack's solution here is far from perfect, so don't worry if
your solution doesn't solve all problems.
