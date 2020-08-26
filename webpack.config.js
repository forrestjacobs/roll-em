const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const sveltePreprocess = require("svelte-preprocess");

module.exports = function (env, argv) {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      inlineSource: ".(js|css)$",
    }),
    new MiniCssExtractPlugin(),
  ];
  if (argv.mode === "production") {
    plugins.push(
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, "src/logo.svg"),
        prefix: "",
        favicons: {
          icons: {
            favicons: true,

            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            firefox: false,
            windows: false,
            yandex: false,
          },
        },
      })
    );
    plugins.push(new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin));
  }

  return {
    entry: "./src/index.ts",
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
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
              preprocess: sveltePreprocess({}),
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
};
