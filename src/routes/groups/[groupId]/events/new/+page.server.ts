import { redirect, type Actions } from "@sveltejs/kit";
import { addDoc, Bytes, collection, Timestamp } from "firebase/firestore";

import { firestore } from "$lib/firebase";

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    let groupId = params.groupId;
    let schedule = <string>data.get("schedule");

    let imageFiles = <File[]>data.getAll("images");

    let images: ArrayBuffer[] = [];

    if (imageFiles[0].size != 0) {
      images = await Promise.all(
        imageFiles.map((f) => f.arrayBuffer())
      );
    }

    addDoc(collection(firestore, `groups/${groupId}/activities`), {
      title: data.get("title"),
      description: data.get("description"),
      schedule: Timestamp.fromDate(new Date(schedule)),
      images: images.map((ab) => Bytes.fromUint8Array(new Uint8Array(ab))),
      createdBy: data.get("uid"),
      participants: {
        min: data.get("minParticipants"),
        max: data.get("maxParticipants")
      }
    });

    redirect(303, `/groups/${groupId}/`);
  },
} satisfies Actions;
