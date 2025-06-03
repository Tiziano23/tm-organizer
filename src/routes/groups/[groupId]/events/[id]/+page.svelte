<script lang="ts">
  import type { PageProps } from "./$types";

  import Activity from "$lib/components/EventComponent.svelte";
  import { Bytes, doc, onSnapshot } from "firebase/firestore";
  import { firestore } from "$lib/firebase";

  let { data }: PageProps = $props();

  onSnapshot(
    doc(firestore, `groups/${data.id}/activities/${data.id}`),
    {},
    (snap) => {
      if (snap.exists()) {
        data = {
          ...data,
          ...snap.data(),
        };
        data.schedule = snap.get("schedule").toDate();
        let rawImages = snap.get("images") as Bytes[];
        data.images = rawImages.map((byteArr) => {
          return URL.createObjectURL(new Blob([byteArr.toUint8Array()]));
        });
      }
    }
  );
</script>

<Activity {...data} />
