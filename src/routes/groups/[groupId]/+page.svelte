<script lang="ts">
  import type { PageProps } from "./$types";

  import { onMount } from "svelte";
  import { firestore } from "$lib/firebase";
  import { doc, onSnapshot, collection, query } from "firebase/firestore";
  import ActivityComponent from "$lib/components/ActivityComponent.svelte";

  const { data }: PageProps = $props();

  let group = $state<App.Group>();
  let activities = $state<App.Activity[]>([]);

  onMount(() => {
    const groupRef = doc(firestore, "groups", data.groupId);
    const unsubscribeGroup = onSnapshot(groupRef, (snapshot) => {
      if (snapshot.exists()) {
        group = { id: snapshot.id, ...snapshot.data() };
      }
    });

    const q = query(collection(groupRef, "activities"));
    const unsubscribeActivities = onSnapshot(q, (snapshot) => {
      activities = snapshot.docs.map((d) => {
        return { id: d.id, groupId: data.groupId, ...d.data() };
      });
    });

    return () => {
      unsubscribeGroup();
      unsubscribeActivities();
    };
  });
</script>

<div>
  {#if group}
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">{group.name}</h1>
      </div>
      <a href={`/groups/${group.id}/activities/new`} class="btn btn-primary"
        >New Event</a
      >
    </div>

    <div class="flex flex-col gap-3">
      {#each activities as activity}
        <ActivityComponent {...activity} />
      {/each}
    </div>
  {/if}
</div>
