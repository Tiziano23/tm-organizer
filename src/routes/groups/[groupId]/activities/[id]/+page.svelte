<script lang="ts">
  import type { PageProps } from "./$types";

  import { onMount } from "svelte";
  import { doc, onSnapshot } from "firebase/firestore";

  import { firestore } from "$lib/firebase";
  import ActivityComponent from "$lib/components/ActivityComponent.svelte";

  const { data }: PageProps = $props();

  let activityData = $state<App.Activity>();

  onMount(() => {
    const eventRef = doc(
      firestore,
      `groups/${data.groupId}/activities/${data.id}`
    );
    const unsubscribe = onSnapshot(eventRef, async (snap) => {
      if (snap.exists()) {
        activityData = { id: snap.id, groupId: data.groupId, ...snap.data() };
      } else {
        // TODO: Redirect
      }
    });
    return unsubscribe;
  });
</script>

{#if activityData}
  <h1 class="text-2xl text-center mt-8 mb-4">
    You've been invited to join this activity!
  </h1>
  <ActivityComponent {...activityData} />
{/if}
