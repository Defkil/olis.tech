import {defineConfig} from 'astro/config';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import rome from 'astro-rome';
import critters from 'astro-critters';
import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://olis.tech',
  output: 'static',
  integrations: [sitemap(), rome(), critters(), compressor(), compress({css: false})]
});
