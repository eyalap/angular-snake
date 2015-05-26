
module.exports = {

  // set the context (optional)
  context: __dirname + '/src',
  entry: './app/app.js',

  // enable loading modules relatively
  resolve: {
    root: [__dirname + "/src"]
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader:"babel-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.json$/, loader: "json-loader" },

      // load fonts and images
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file-loader" },
      { test: /\.woff(2)?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"}
    ]
  },

  // support source maps
  devtool: "#inline-source-map"

};
