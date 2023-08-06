import { defineConfig } from "astro/config";
// import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
// import rome from "astro-rome";
// import critters from "astro-critters";
import compressor from "astro-compressor";
import { visualizer } from "rollup-plugin-visualizer";
import { SITE_LINK } from "./src/const/data";
import swup, { Theme } from "@swup/astro";

// https://astro.build/config
export default defineConfig({
  site: SITE_LINK,
  output: "static",
  integrations: [
    swup({
      theme: Theme.slide,
      smoothScrolling: false,
      globalInstance: true,
    }),
    sitemap(),
    // rome(),
    // critters(),
    compressor(),
    // compress({ css: false }),
  ],
  vite: {
    plugins: [visualizer({ filename: "./dist/_astro/stats.html", gzipSize: true, brotliSize: true }) as any],
    build: {
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks: (id: string): any => {
            if (id.includes("algolia")) {
              return "algolia";
            }
            if (id.includes("_astro/Swup")) {
              return "swup";
            }
          },
        },
      },
    },
  },
});
