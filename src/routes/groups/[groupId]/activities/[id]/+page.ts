import type { PageLoad } from "./$types"

export const ssr = false;

// Pass down route params to .svelte
export const load: PageLoad = async ({ params }) => {
  return {
    ...params,
  };
};

