<script lang="ts">
  import { useUser } from "$lib/user.svelte";
  import { toastNotification } from "./Toast.svelte";
  import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
  import { firestore } from "$lib/firebase";

  let props: App.Activity = $props();

  const userState = useUser();
  const user = $derived(userState.value);

  function share() {
    navigator.clipboard.writeText(
      window.location.host + `/groups/${props.groupId}/events/${props.id}`
    );
    toastNotification("Copied to clipboard!");
  }

  function subscribe() {
    updateDoc(
      doc(firestore, `groups/${props.groupId}/activities/${props.id}`),
      {
        subscribers: arrayUnion(user.uid),
      }
    ).then(() => {
      toastNotification("Subscribed!");
    });
  }

  function unsubscribe() {
    updateDoc(
      doc(firestore, `groups/${props.groupId}/activities/${props.id}`),
      {
        subscribers: arrayRemove(user.uid),
      }
    ).then(() => {
      toastNotification("Unsubscribed!");
    });
  }
</script>

<div class="bg-slate-50 p-2 my-2">
  <div class="flex justify-between">
    <p class="text-lg">
      <span class="font-semibold">Title:</span>
      {props.title}
    </p>
    <div>
      {#if user.uid}
        {#if !props.subscribers.includes(user.uid)}
          <button class="btn btn-primary" onclick={subscribe}>Subscribe</button>
        {:else}
          <button class="btn btn-primary" onclick={unsubscribe}>Unsubscribe</button>
        {/if}
      {/if}

      <button
        onclick={share}
        class="px-4 py-2 bg-cyan-50 underline rounded-md cursor-pointer"
        >Share</button
      >
    </div>
  </div>
  <p><span class="font-semibold">Description: </span> {props.description}</p>
  <p><span class="font-semibold">Schedule: </span> {props.schedule}</p>
  {#if props.images && props.images.length > 0}
    <p class="font-semibold">Images</p>
    <div>
      {#each props.images as image}
        <img src={image} alt="" />
      {/each}
    </div>
  {/if}
  {#if props.subscribers && props.subscribers.length > 0}
    <p>
      <span class="font-semibold">Subscribers:</span>
      {props.subscribers.length}
    </p>
  {/if}
</div>
