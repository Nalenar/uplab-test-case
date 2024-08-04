import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@styles": path.resolve("src/styles"),
      "@fonts": path.resolve("./fonts"),
      "@components": path.resolve("src/components"),
      "@images": path.resolve("./images"),
      "@utils": path.resolve("src/utils"),
      "@icons": path.resolve("src/assets/icons"),
    },
  },
});
