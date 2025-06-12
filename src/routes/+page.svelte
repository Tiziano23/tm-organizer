<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "$lib/user.svelte";
  import { firestore } from "$lib/firebase";
  import { collection, query, where, onSnapshot } from "firebase/firestore";

  let groups = $state<App.Group[]>([]);

  onMount(() => {
    if (!$user) return;

    const q = query(
      collection(firestore, "groups"),
      where("users", "array-contains", $user.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      groups = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    });

    return unsubscribe;
  });
</script>

<div class="flex justify-between items-center mb-6">
  <h1 class="text-4xl font-bold mb-3">Your groups</h1>
  <a href={`/groups/new`} class="btn btn-primary">New group</a>
</div>

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
