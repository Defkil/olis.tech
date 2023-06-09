import { defineConfig } from 'astro/config';
import compress from "astro-compress";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [compress(), prefetch()]
});