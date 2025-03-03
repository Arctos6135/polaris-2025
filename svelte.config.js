import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    assets: `https://${arctos6135.github.io/polaris-2025}`
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
