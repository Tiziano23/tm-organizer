import type { PageLoad } from "./$types";
import { Bytes, doc, getDoc } from "firebase/firestore";
import { firestore } from "$lib/firebase";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  const groupId = params.groupId;
  const eventId = params.id;

  const d = await getDoc(doc(firestore, `groups/${groupId}/activities/${eventId}`));

  let data = d.data() as App.Activity;
  let rawImages: Bytes[] = d.get("images");
  data.images = rawImages.map((byteArr) => {
    return URL.createObjectURL(new Blob([byteArr.toUint8Array()]));
  });
  data.schedule = d.get("schedule").toDate();
  data.id = d.id;
  data.groupId = params.groupId;

  return data;
};
