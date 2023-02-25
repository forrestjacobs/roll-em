import { sveltekit } from "@sveltejs/kit/vite";
import pegjs from "pegjs";

/** @type {import("vite").UserConfig} */
const config = {
  define: {
    "process.env.BUILD_YEAR": `${new Date().getFullYear()}`,
  },
  plugins: [
    sveltekit(),
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
  server: {
    hmr: {
      // Set this to your dev environment's proxy port
      clientPort: process.env.VITE_CLIENT_PORT,
    },
  },
};

export default config;
