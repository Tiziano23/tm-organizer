<script lang="ts">
  import type { LayoutProps } from "./$types";

  import { pwaInfo } from "virtual:pwa-info";

  import { toast } from "../lib/components/Toast.svelte";
  import { user, loginWithGoogle, logOut } from "$lib/user.svelte";

  import "../app.css";

  let { children }: LayoutProps = $props();

  const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");
</script>

<svelte:head>
  {@html webManifest}
  <title>Activity Organizer</title>
</svelte:head>

<nav
  class="m-4 p-2 flex justify-between items-stretch bg-gray-100 border-2 border-gray-300 rounded-md"
>
  <ul class="flex items-center">
    <li><a href="/" class="hover:underline">Home</a></li>
  </ul>
  <div>
    {#if $user === undefined}
      <p>Loading...</p>
    {:else if $user}
      <div class="flex items-center">
        <details class="relative inline-block">
          <summary
            class="cursor-pointer hover:underline"
            style="list-style:none"
          >
            <p>Hi, {$user.displayName || $user.email}</p>
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
      <button class="cursor-pointer hover:underline" onclick={loginWithGoogle}
        >Log in</button
      >
    {/if}
  </div>
</nav>

<main class="mx-4">
  {#if $user}
    {@render children()}
  {:else}
    <div class="text-center mt-20">
      <h1 class="text-5xl mb-6 font-bold">Activity Organizer</h1>
      <h2 class="text-sm text-slate-800">by Tiziano Marzocchella</h2>
      <h3 class="text-xl mt-12">Please login.</h3>
    </div>
  {/if}
</main>

{#await import("$lib/components/ReloadPrompt.svelte") then { default: ReloadPrompt }}
  <ReloadPrompt />
{/await}

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
