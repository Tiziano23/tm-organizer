import type { EntryGenerator } from "./$types";
import { firestoreAdmin } from "$lib/firebaseAdmin";

// Generate URLs for ssr prerendering
export const entries: EntryGenerator = async () => {
  const groupsSnapshot = await firestoreAdmin.collection("groups").get();

  const activityPromises = groupsSnapshot.docs.map((groupDoc) => {
    return firestoreAdmin.collection(`groups/${groupDoc.id}/activities`).get();
  });

  const activitySnapshotsByGroup = await Promise.all(activityPromises);

  const allActivities = groupsSnapshot.docs.flatMap((groupDoc, index) => {
    const activitiesForThisGroup = activitySnapshotsByGroup[index];
    return activitiesForThisGroup.docs.map((activityDoc) => ({
      groupId: groupDoc.id,
      id: activityDoc.id,
    }));
  });
  return allActivities;
};
