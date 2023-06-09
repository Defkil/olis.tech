import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

import rome from "astro-rome";

// https://astro.build/config
export default defineConfig({
  site: 'https://olis.tech',
  output: 'static',
  integrations: [compress(), prefetch(), sitemap(), rome()]
});