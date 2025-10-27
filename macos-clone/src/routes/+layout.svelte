<script>
  import '../app.css';
  import TopBar from '$lib/Components/Topbar/topbar.svelte';
  import favicon from '$lib/assets/favicon.svg';
  import Dock from '$lib/Components/Dock/Dock.svelte';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative min-h-screen overflow-hidden">
  <!-- TopBar is always visible -->
  <TopBar />

  <Dock />

  <!-- Render page-specific content here -->
  <slot />
</main>
