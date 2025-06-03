<script lang="ts">
  import type { PageProps } from "./$types";

  import { onMount } from "svelte";
  import { useUser } from "$lib/user.svelte";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { firestore } from "$lib/firebase";

  const { data }: PageProps = $props();

  const userState = useUser();
  const user = $derived(userState.value);

  let items: { id: string; name: string }[] = $state([]);
</script>

{#if user.uid}
<h1 class="text-4xl font-bold mb-3">Your groups</h1>
<ul class="p-1">
  {#each items as item}
    <li class="bg-slate-50 flex flex-col content-stretch">
      <a href="groups/{item.id}" class="p-3 flex justify-between group">
        <p class="group-hover:underline">{item.name}</p>
        <p>
          <i
            class="fa fa-chevron-right group-hover:translate-x-0.5 transition-transform"
          ></i>
        </p>
      </a>
    </li>
  {/each}
</ul>
{:else}
<div class="text-center mt-25">
  <h1 class="text-5xl mb-6 font-bold">Activity Organizer</h1>
  <h2 class="text-sm text-slate-800">by Tiziano Marzocchella</h2>
</div>
{/if}
