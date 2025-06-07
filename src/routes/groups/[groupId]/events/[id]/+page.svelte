<script lang="ts">
  import type { PageProps } from "./$types";

  import Activity from "$lib/components/EventComponent.svelte";
  import { Bytes, doc, onSnapshot } from "firebase/firestore";
  import { firestore } from "$lib/firebase";
  import { useUser } from "$lib/user.svelte";
  import type { Unsubscribe } from "firebase/auth";

  const { data }: PageProps = $props();

  const userState = useUser();
  const user = $derived(userState.value);

  let activityData = $state<App.Activity>({
    id: null,
    groupId: null,
    subscribers: [],
  });

  let unsub: Unsubscribe | null = null;

  $effect(() => {
    if (unsub) unsub();
    if (user.uid) {
      unsub = onSnapshot(
        doc(firestore, `groups/${data.groupId}/activities/${data.id}`),
        {},
        (snap) => {
          if (user.uid) {
            if (snap.exists()) {
              activityData = {
                ...(snap.data() as App.Activity),
                id: snap.id,
                groupId: data.groupId,
                schedule: snap.get("schedule").toDate(),
                images: (snap.get("images") as Bytes[]).map((byteArr) => {
                  return URL.createObjectURL(
                    new Blob([byteArr.toUint8Array()])
                  );
                }),
              };
            }
          }
        }
      );
    }
  });
</script>

{#if activityData.id}
  <h1 class="text-2xl text-center mt-8 mb-4">
    You've been invited to join this activity!
  </h1>
  <Activity {...activityData} />
{/if}
