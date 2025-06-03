import {
  Bytes,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import type { PageLoad } from "./$types";
import { firestore } from "$lib/firebase";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  let group = await getDoc(doc(firestore, `groups/${params.groupId}/`));
  
  return {
    id: params.groupId,
    name: group.get("name").toString(),
  };
};
