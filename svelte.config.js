import { minify } from "html-minifier";
import adapter from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
export default {
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
    adapter: adapter(),
  },
};
