<script lang="ts">
  import { goto } from "$app/navigation";

  import { user } from "$lib/user.svelte";

  import { firestore } from "$lib/firebase";
  import { addDoc, collection } from "firebase/firestore";

  let name = $state("");
  let errorMessage = $state("");

  async function createGroup() {
    if (!$user) return;

    try {
      addDoc(collection(firestore, `groups`), {
        name: name,
        users: [$user.uid],
      });
    } catch (error) {
      console.log(error);
      errorMessage = "Failed to create event. Please try again.";
    }
  }
</script>

<h1 class="text-2xl font-bold mb-6">Create New group</h1>

<form onsubmit={createGroup} class="space-y-4">
  <div class="input-group">
    <label for="name">Group name</label>
    <input type="text" id="name" bind:value={name} />
  </div>

  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}

  <button type="submit" class="btn btn-primary">Create group</button>
  <button type="button" class="btn btn-secondary" onclick={() => goto("../")}
    >Back</button
  >
</form>
