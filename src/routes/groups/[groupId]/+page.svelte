<script lang="ts">
  import type { PageProps } from "./$types";

  import Activity from "$lib/components/EventComponent.svelte";
  import {
    Bytes,
    collection,
    doc,
    getDoc,
    onSnapshot,
  } from "firebase/firestore";
  import { firestore } from "$lib/firebase";
  import { useUser } from "$lib/user.svelte";
  import type { Unsubscribe } from "firebase/auth";

  const { data }: PageProps = $props();

  const userState = useUser();
  const user = $derived(userState.value);

  let groupName = $state("");
  let activities = $state<App.Activity[]>([]);

  let unsub: Unsubscribe | null = null;
  $effect(() => {
    if (unsub) unsub();
    if (user.uid) {
      unsub = onSnapshot(
        collection(firestore, `groups/${data.groupId}/activities`),
        {},
        (snap) => {
          snap.docChanges().forEach((s) => {
            if (s.doc.exists()) {
              if (s.newIndex == -1) {
                activities.splice(s.oldIndex, 1);
              } else if (s.oldIndex != -1) {
                activities[s.oldIndex] = {
                  ...activities[s.oldIndex],
                  ...s.doc.data(),
                  schedule: s.doc.get("schedule").toDate(),
                  images: (s.doc.get("images") as Bytes[]).map((byteArr) => {
                    return URL.createObjectURL(
                      new Blob([byteArr.toUint8Array()])
                    );
                  }),
                };
              } else {
                activities.push({
                  ...(s.doc.data() as App.Activity),
                  id: s.doc.id,
                  groupId: data.groupId,
                  schedule: s.doc.get("schedule").toDate(),
                  images: (s.doc.get("images") as Bytes[]).map((byteArr) => {
                    return URL.createObjectURL(
                      new Blob([byteArr.toUint8Array()])
                    );
                  }),
                });
              }
            }
          });
        }
      );

      getDoc(doc(firestore, `groups/${data.groupId}/`)).then((d) => {
        groupName = d.get("name");
      });
    }
  });
</script>

<h1 class="text-4xl font-bold mb-2">{groupName}</h1>

<div class="bg-slate-100 rounded-md p-4">
  <div class="flex justify-between">
    <h2 class="text-3xl font-semibold">Scheduled activities</h2>
    <a href="/groups/{data.groupId}/events/new" class="btn btn-primary"
      >New event</a
    >
  </div>
  <div>
    {#each activities as activity}
      <Activity {...activity} />
    {/each}
  </div>
</div>
