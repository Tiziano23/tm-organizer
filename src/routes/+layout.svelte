<script lang="ts">
  let { children } = $props();

  import "../app.css";

  import { toast } from "../lib/components/Toast.svelte";
  import { loginWithGoogle, logOut, useUser } from "$lib/user.svelte";

  const userState = useUser();
  const user = $derived(userState.value);
</script>

<nav
  class="m-4 p-2 flex justify-between items-stretch bg-gray-100 border-2 border-gray-300 rounded-md"
>
  <ul class="flex items-center">
    <li><a href="/" class="hover:underline">Home</a></li>
  </ul>
  <div>
    {#if user.uid != null}
      <div class="flex items-center">
        <details class="relative inline-block">
          <summary
            class="cursor-pointer hover:underline"
            style="list-style:none"
          >
            <p>Hi, {user.fullName}</p>
          </summary>
          <div
            class="absolute mt-1 right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="profile-menu-btn"
          >
            <button
              class="block w-full px-4 py-2 rounded-md text-left text-sm cursor-pointer text-gray-700 hover:bg-slate-100"
              role="menuitem"
              id="menu-item-0"
              onclick={logOut}>Sign out</button
            >
          </div>
        </details>
      </div>
    {:else}
      <button class="cursor-pointer hover:underline" onclick={loginWithGoogle}>Log in</button>
    {/if}
  </div>
</nav>

<div class="mx-4">
  {@render children()}
</div>

{#if toast.active}
  <div
    class="fixed bottom-2 left-1/2 -translate-x-1/2 bg-slate-700 text-white shadow-2xl p-5 rounded-lg"
    class:animate-toast-in={toast.visible}
    class:animate-toast-out={!toast.visible}
  >
    <span class="mr-2">{toast.text}</span>
    <i class="fa fa-close"></i>
  </div>
{/if}
