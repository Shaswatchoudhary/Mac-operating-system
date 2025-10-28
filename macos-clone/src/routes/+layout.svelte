<script>
  import '../app.css';
  import TopBar from '$lib/Components/Topbar/topbar.svelte';
  import favicon from '$lib/assets/favicon.svg';
  import Dock from '$lib/Components/Dock/Dock.svelte';
  import Desktop from '$lib/Components/desktop/desktop.svelte';
  import Loadingscreen from '$lib/Components/loading/loadingscreen.svelte';
  
  let booted = false; 
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative min-h-screen overflow-hidden bg-black">
    {#if !booted}
    <Loadingscreen onFinish={() => (booted = true)} />
  {/if}
  
  {#if booted}
    <TopBar /> 
    <Desktop />
    <Dock />
    <slot />
  {/if}
</main>