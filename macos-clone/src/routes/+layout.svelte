<script>
  import '../app.css';
  import TopBar from '$lib/Components/Topbar/topbar.svelte';
  import favicon from '$lib/assets/favicon.svg';
  import Dock from '$lib/Components/Dock/Dock.svelte';
  import Desktop from '$lib/Components/desktop/desktop.svelte';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative min-h-screen overflow-hidden">
  <!-- TopBar is always visible -->
  <TopBar /> 
  <Desktop />
   <Dock />

  <!-- Render page-specific content here -->
  <slot />
</main>
