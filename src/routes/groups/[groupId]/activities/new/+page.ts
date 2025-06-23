import type { PageLoad } from "./$types";

export const ssr = false;

// Pass down route parameters to .svelte page
export const load: PageLoad = ({ params }) => {
  return { ...params };
};
