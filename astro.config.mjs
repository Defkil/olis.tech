import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import rome from "astro-rome";
import critters from "astro-critters";
import compressor from "astro-compressor";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://olis.tech',
  output: 'static',
  integrations: [compress(), prefetch(), sitemap(), rome(), critters(), solidJs(), compressor()]
});
