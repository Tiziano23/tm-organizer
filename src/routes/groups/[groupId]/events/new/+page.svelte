<script lang="ts">
  import { goto } from "$app/navigation";
  import { useUser } from "$lib/user.svelte";

  const { data } = $props();

  const userState = useUser();
  const user = $derived(userState.value);
</script>

<h1 class="text-4xl font-bold">Create new Event</h1>
<form method="POST" enctype="multipart/form-data">
  <div class="input-group">
    <label for="title">Title</label>
    <input type="text" name="title" id="title" />
  </div>
  <div class="input-group">
    <label for="description">Description</label>
    <input type="text" name="description" id="description" />
  </div>
  <div class="input-group">
    <label for="schedule">Schedule</label>
    <input type="datetime-local" name="schedule" id="schedule" />
  </div>
  <div class="input-group">
    <h2>Participants</h2>
    <label for="minParticipants">Min:</label>
    <input type="number" name="minParticipants" id="minParticipants" />
    <label for="minParticipants">Max:</label>
    <input type="number" name="maxParticipants" id="maxParticipants" />
  </div>
  <div class="input-group">
    <label for="images">Images</label>
    <input type="file" name="images" id="images" multiple accept="image/*" />
  </div>
  <input type="submit" value="Submit" class="btn btn-primary" />
  <input type="hidden" name="uid" value={user.uid} />
  <button onclick={() => goto(`/groups/${data.params.groupId}/`)} type="button" class="btn btn-secondary">Back</button>
</form>
