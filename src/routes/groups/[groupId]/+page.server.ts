import type { EntryGenerator } from "./$types";
import { firestoreAdmin } from "$lib/firebaseAdmin";

// Used for ssr. Instructs Svelte with the URLs to prerender.
export const entries: EntryGenerator = async () => {
  const groupsSnapshot = await firestoreAdmin.collection("groups").get();
  return groupsSnapshot.docs.map((doc) => {
    return { groupId: doc.id };
  });
};