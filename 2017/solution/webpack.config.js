const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style-loader", "css-loader"]
    }]
  },
  plugins: [new BundleAnalyzerPlugin]
}
