import type { PageLoad } from "./$types";

export const ssr = false;

// This just passes down the route parameters to the .svelte page
export const load: PageLoad = async ({ params }) => {
  return {
    ...params,
  };
};
