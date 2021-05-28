module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: __dirname + "/src/public",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /.js$/,
        exclude: /node_modules/,
        // query: {
        //   presets: ["@babel/react", "@babel/es2015"],
        //   plugins: ["@babel/proposal-class-properties"],
        // },
      },
    ],
  },
};
