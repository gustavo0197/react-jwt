import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

export default defineConfig(() => {
  return {
    plugins: [dts()],
    build: {
      minify: true,
      lib: {
        entry: {
          index: "./src/index.ts"
        },
        name: "react-jwt"
      },
      rollupOptions: {
        external: [
          ...Object.keys(pkg.devDependencies), // don't bundle dependencies
          ...Object.keys(pkg.peerDependencies), // don't bundle peer dependencies
          /^node:.*/ // don't bundle built-in Node.js modules (use protocol imports!)
        ],
        output: {
          dir: "dist"
        }
      },
      target: "esnext"
    }
  };
});
