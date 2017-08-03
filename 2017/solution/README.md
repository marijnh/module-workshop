# Solutions for the 2012 chapter

## Exercise 1: Splitting

Drop the `import` declaration for `"dom-confetti"` and wrap the call
to it like this:

    import("dom-confetti").then(domConfetti => {
      domConfetti.confetti(answerNode, {angle: 20, startVelocity: 20})
    })

You could add error handling if you wanted, in case the connection is
out by the time this is loaded, but since it's just a cosmetic
enhancement, failing silently is fine.

## Exercise 2: Importing CSS

These are the steps you need to take:

 - Move `dist/paper.css` to `src/paper.css`

 - Add `import "./paper.css"` to `src/paper.js`

 - Remove the `<link>` tag from `dist/index.html`

 - Add this property to the object in `webpack.config.js`:

        module: {
          loaders: [{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
          }]
        }

The addition to the configuration tells Webpack to, whenever it's
importing a `.css` file, to run it through the `style-loader` and
`css-loader` plugins. (The way I understand it is that `style-loader`
makes the dynamic insertion of styles possible, and `css-loader`
handles reading CSS files and putting them in your bundle, but I'm not
really sure.)

## Exercise 3: Seeing bundles

To enable the plugin, first import it:

    const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

And then add a `plugins` field to your exported object:

    plugins: [new BundleAnalyzerPlugin]

If everything went well, you get a browser window showing a bunch of
colored squares for bundles and the files inside of them. Their sizes
are proportional to the file sizes.

Somewhat unexpected is that stuff with names like `addStyles.js` and
`css-base.js` ended up in the bundle, and is bigger than our actual
code. I guess for real projects, that size is still negligible, but
for this one... we should maybe include the CSS the old-fashioned way.

## Exercise 4 (hard): Diamond splitting

The widely used solution in Webpack-land is a plugin called
[`CommonsChunkPlugin`][1], which creates a separate chunk for all the
code that would otherwise be required for multiple different bundles.
(You can further configure this plugin to put specific things in
separate bundles, to manually optimize things.)

[1]: https://webpack.js.org/plugins/commons-chunk-plugin/
