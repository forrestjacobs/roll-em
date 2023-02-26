import { sveltekit } from "@sveltejs/kit/vite";
import pegjs from "pegjs";
import type { UserConfig } from "vite";

const config: UserConfig = {
  define: {
    "process.env.BUILD_YEAR": `${new Date().getFullYear()}`,
  },
  plugins: [
    sveltekit(),
    {
      name: "PEG",
      transform(source: string, id: string): string | null {
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
};

export default config;
