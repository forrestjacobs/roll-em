const sveltePreprocess = require("svelte-preprocess");
const { minify } = require("html-minifier");

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
};
