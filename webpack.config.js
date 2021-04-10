const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const svelteConfig = require("./svelte.config");

module.exports = function (env, argv) {
  const plugins = [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
    }),
    new MiniCssExtractPlugin(),
  ];
  if (argv.mode === "production") {
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            context: "static",
            from: "**/*.{ico,png}",
          },
        ],
      })
    );
  }

  return {
    entry: "./src/index.ts",
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin({})],
    },
    plugins,
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
              ...svelteConfig,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
              },
            },
          ],
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
};
