const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.ts",
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Dice",
      inlineSource: ".(js|css)$",
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new MiniCssExtractPlugin(),
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.pegjs$/,
        exclude: /node_modules/,
        loader: "pegjs-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".ts", ".svelte", ".mjs", ".js"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
