<script lang="ts">
  import { useUser } from "$lib/user.svelte";
  import { collection, onSnapshot } from "firebase/firestore";
  import { firestore } from "$lib/firebase";
  import type { Unsubscribe } from "firebase/auth";

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
</script>

<h1 class="text-4xl font-bold mb-3">Your groups</h1>
<ul class="p-1">
  {#each groups as group}
    <li class="bg-slate-50 flex flex-col content-stretch">
      <a href="groups/{group.id}" class="p-3 flex justify-between group">
        <p class="group-hover:underline">{group.name}</p>
        <p>
          <i
            class="fa fa-chevron-right group-hover:translate-x-0.5 transition-transform"
          ></i>
        </p>
      </a>
    </li>
  {/each}
</ul>
