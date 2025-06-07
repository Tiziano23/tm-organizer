<script lang="ts">
  import { toastNotification } from "$lib/components/Toast.svelte";
  import { firestore } from "$lib/firebase";
  import { useUser } from "$lib/user.svelte";
  import type { Unsubscribe } from "firebase/auth";
  import {
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";

  const userState = useUser();
  const user = $derived(userState.value);

  let groups = $state<App.Group[]>([]);

  let unsub: Unsubscribe | null = null;

  $effect(() => {
    if (unsub) unsub();
    if (user.uid) {
      unsub = onSnapshot(collection(firestore, "groups"), {}, (snap) => {
        groups = snap.docs.map((r) => {
          return {
            id: r.id,
            name: r.get("name"),
            users: r.get("users"),
          };
        });
      });
    }
  });

  function join(gid: string) {
    updateDoc(doc(firestore, `groups/${gid}`), {
      users: arrayUnion(user.uid),
    }).then(() => {
      toastNotification("Joined!");
    });
  }
  function leave(gid: string) {
    updateDoc(doc(firestore, `groups/${gid}`), {
      users: arrayUnion(user.uid),
    }).then(() => {
      toastNotification("Left!");
    });
  }
</script>

<div>
  {#each groups as group}
    <div
      class="p-4 flex flex-row items-center justify-between bg-slate-200 rounded-md"
    >
      <p>{group.name}</p>
      {#if !group.users.includes(user.uid || "")}
        <button class="btn btn-primary" onclick={() => join(group.id)}
          >Join</button
        >
      {:else}
        <button class="btn btn-primary" onclick={() => leave(group.id)}
          >Leave</button
        >
      {/if}
    </div>
  {/each}
</div>
