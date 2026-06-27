import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { figureCaptionPlugin } from "./src/lib/markdown-plugins.mjs";

export default defineConfig({
  site: "https://rplopes.com",
  prefetch: { prefetchAll: true },
  image: { layout: "constrained" },
  markdown: {
    processor: satteri({ hastPlugins: [figureCaptionPlugin] }),
    shikiConfig: {
      themes: { light: "gruvbox-light-hard", dark: "gruvbox-dark-medium" },
      langs: ["javascript", "xml", "plaintext"],
    },
  },
  integrations: [sitemap()],
});
