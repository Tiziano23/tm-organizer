import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import AdapterStatic from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: AdapterStatic(),
    prerender: {
      entries: [
        "/",
        "/groups/new",
        "/groups/[groupId]/activities/new",
      ]
    },
    serviceWorker: {
      register: false,
    },
  }
};

export default config;
