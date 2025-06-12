import type { EntryGenerator } from "./$types";
import { firestoreAdmin } from "$lib/firebaseAdmin";

export const entries: EntryGenerator = async () => {
  const groupsSnapshot = await firestoreAdmin.collection("groups").get();
  return groupsSnapshot.docs.map((doc) => {
    return { groupId: doc.id };
  });
};