import { minify } from "html-minifier";
import adapter from "@sveltejs/adapter-node";
import sveltePreprocess from "svelte-preprocess";
import pegjs from "pegjs";

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

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#app",

    vite: {
      define: {
        "process.env.BUILD_YEAR": `${new Date().getFullYear()}`,
      },
      plugins: [
        {
          transform(source, id) {
            if (!id.endsWith(".pegjs")) {
              return null;
            }
            return pegjs
              .generate(source, {
                format: "commonjs",
                output: "source",
              })
              .replace("module.exports", "export const { SyntaxError, parse }");
          },
        },
      ],
    },
  },
};
