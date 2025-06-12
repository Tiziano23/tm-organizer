<script lang="ts">
  import { firestore } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";

  import { toastNotification } from "./Toast.svelte";

  import { user } from "$lib/user.svelte";

  const activity: App.Activity = $props();

  function onUserClick() {
    if (!$user) return;

    const isSubscribed = activity.subscribers?.includes($user.uid);

    updateDoc(
      doc(firestore, `groups/${activity.groupId}/activities/${activity.id}`),
      {
        subscribers: isSubscribed
          ? arrayRemove($user.uid)
          : arrayUnion($user.uid),
      }
    ).then(() => {
      toastNotification(isSubscribed ? "Unsubscribed!" : "Subscribed!");
    });
  }

  function deleteActivity() {
    deleteDoc(
      doc(firestore, `groups/${activity.groupId}/activities/${activity.id}`)
    )
      .then(() => {
        toastNotification("Deleted!");
      })
      .catch(() => {
        toastNotification("An error has occurred!");
      });
  }

  function share() {
    navigator.clipboard.writeText(
      `${window.location.origin}/groups/${activity.groupId}/activities/${activity.id}`
    );
    toastNotification("Copied to clipboard!");
  }
</script>

<div class="bg-slate-50 p-2 my-2">
  <div class="flex justify-between">
    <p class="text-lg">{activity.title}</p>
    <div>
      {#if $user && activity.subscribers}
        {#if !activity.subscribers.includes($user.uid)}
          <button
            class="btn btn-primary"
            onclick={onUserClick}
            disabled={activity.participants &&
              activity.participants.max != 0 &&
              activity.subscribers.length == activity.participants.max}
            >Subscribe</button
          >
        {:else}
          <button class="btn btn-primary" onclick={onUserClick}
            >Unsubscribe</button
          >
        {/if}
      {/if}
      <button
        onclick={share}
        class="btn btn-secondary"
        >Share</button
      >
      {#if $user?.uid == activity.createdBy}
        <button
          onclick={deleteActivity}
          class="btn btn-danger"
          >Remove</button
        >
      {/if}
    </div>
  </div>
  <p><span class="font-semibold">Description: </span> {activity.description}</p>
  <p>
    <span class="font-semibold">Schedule: </span>
    {activity.schedule?.toDate().toLocaleString()}
  </p>

  {#if activity.images && activity.images.length > 0}
    <p class="font-semibold">Images</p>
    <div class="flex h-24 gap-2 justify-start">
      {#each activity.images as image}
        <img src="data:image/png;base64,{image.toBase64()}" alt="" />
      {/each}
    </div>
  {/if}

  {#if activity.subscribers}
    <p>
      <span class="font-semibold">Subscribers:</span>
      {activity.subscribers.length}
      {activity.participants && activity.participants.max != 0
        ? "/ " + activity.participants.max
        : ""}
      {#if activity.participants && activity.participants.min != 0 && activity.subscribers.length >= activity.participants.min}
        <span class="fa fa-check text-green-500"></span>
      {/if}
    </p>
  {/if}
</div>
