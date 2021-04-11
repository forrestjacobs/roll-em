const { minify } = require("html-minifier");
const pkg = require("./package.json");
const static = require("@sveltejs/adapter-static");
const sveltePreprocess = require("svelte-preprocess");
const { generate } = require("pegjs");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: [
    {
      markup({ content }) {
        // This is basically https://github.com/kim366/svelte-trim-whitespace-preprocessor
        // but with "trimCustomFragments" enabled
        return {
          code: minify(content, {
            ignoreCustomFragments: [/\{[#:/].+?\}/],
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            trimCustomFragments: true,
            keepClosingSlash: true,
            caseSensitive: true,
          }),
        };
      },
    },
    sveltePreprocess(),
  ],
  kit: {
    adapter: static(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#app",

    vite: {
      define: {
        BUILD_YEAR: `${new Date().getFullYear()}`,
      },
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
      plugins: [
        {
          transform(source, id) {
            if (!id.endsWith(".pegjs")) {
              return null;
            }
            return generate(source, {
              format: "commonjs",
              output: "source",
            }).replace("module.exports", "export const { SyntaxError, parse }");
          },
        },
      ],
    },
  },
};
