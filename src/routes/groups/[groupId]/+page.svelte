<script lang="ts">
  import type { PageProps } from "./$types";

  import Activity from "$lib/components/EventComponent.svelte";
  import { useUser } from "$lib/user.svelte";
  import {
    Bytes,
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";
  import { firestore } from "$lib/firebase";
  import { goto } from "$app/navigation";

  let { data }: PageProps = $props();

  const userState = useUser();
  const user = $derived(userState.value);

  let activities = $state<App.Activity[]>([]);

  onSnapshot(
    collection(firestore, `groups/${data.id}/activities`),
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
                return URL.createObjectURL(new Blob([byteArr.toUint8Array()]));
              }),
            };
          } else {
            activities.push({
              ...(s.doc.data() as App.Activity),
              id: s.doc.id,
              groupId: data.id,
              schedule: s.doc.get("schedule").toDate(),
              images: (s.doc.get("images") as Bytes[]).map((byteArr) => {
                return URL.createObjectURL(new Blob([byteArr.toUint8Array()]));
              }),
            });
          }
        }
      });
    }
  );
</script>

<h1 class="text-4xl font-bold mb-2">{data.name}</h1>

<div class="bg-slate-100 rounded-md p-4">
  <div class="flex justify-between">
    <h2 class="text-3xl font-semibold">Scheduled activities</h2>
    <a href="/groups/{data.id}/events/new" class="btn btn-primary">New event</a>
  </div>
  <div>
    {#each activities as activity}
      <Activity {...activity} />
    {/each}
  </div>
</div>
