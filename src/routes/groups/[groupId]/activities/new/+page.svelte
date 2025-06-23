<script lang="ts">
  import { goto } from "$app/navigation";
  import { user } from "$lib/user.svelte";

  import { firestore } from "$lib/firebase";
  import { addDoc, Bytes, collection, Timestamp } from "firebase/firestore";

  const { data } = $props();

  let title = $state("");
  let description = $state("");
  let schedule = $state("");
  let minParticipants = $state(0);
  let maxParticipants = $state(0);
  let imageFiles = $state<FileList>();

  let errorMessage = $state("");

  async function createActivity(event: Event) {
    event.preventDefault();

    if (!title || !description || !schedule) {
      errorMessage = "Please fill out all fields.";
      return;
    }

    if (!$user) {
      errorMessage = "You must be logged in to create an event.";
      return;
    }

    try {
      let imageData: Bytes[] = [];

      if (imageFiles) {
        for (let f of imageFiles) {
          imageData.push(Bytes.fromUint8Array(await f.bytes()));
        }
      }

      addDoc(collection(firestore, `groups/${data.groupId}/activities`), {
        createdBy: $user.uid,
        title: title,
        description: description,
        schedule: Timestamp.fromDate(new Date(schedule)),
        participants: {
          min: minParticipants,
          max: maxParticipants,
        },
        images: imageData,
        subscribers: [],
      });

      goto("../");
    } catch (error) {
      console.error(error);
      errorMessage = "Failed to create event. Please try again.";
    }
  }
</script>

<h1 class="text-2xl font-bold mb-6">Create New Event</h1>

<form onsubmit={createActivity} class="space-y-4">
  <div class="input-group">
    <label for="title">Event Title</label>
    <input
      type="text"
      id="title"
      bind:value={title}
      class="input input-bordered w-full"
    />
  </div>
  <div class="input-group">
    <label for="description">Description</label>
    <textarea
      id="description"
      bind:value={description}
      class="textarea textarea-bordered w-full"
    ></textarea>
  </div>
  <div>
    <label for="schedule">Schedule</label>
    <input
      type="datetime-local"
      id="schedule"
      bind:value={schedule}
      class="input input-bordered w-full"
    />
  </div>
  <div class="input-group">
    <h2 class="font-semibold">Participants</h2>
    <label for="minParticipants">Min:</label>
    <input
      type="number"
      id="minParticipants"
      bind:value={minParticipants}
      class="input input-bordered w-full"
    />
    <label for="minParticipants">Max:</label>
    <input
      type="number"
      id="maxParticipants"
      bind:value={maxParticipants}
      class="input input-bordered w-full"
    />
  </div>
  <div class="input-group">
    <label for="images">Images</label>
    <input
      type="file"
      id="images"
      bind:files={imageFiles}
      multiple
      accept="image/*"
    />
  </div>

  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}

  <button type="submit" class="btn btn-primary">Create Event</button>
  <button type="button" class="btn btn-secondary" onclick={() => goto("../")}
    >Back</button
  >
</form>
