<script>
  import '../app.css';
  import TopBar from '$lib/components/TopBar.svelte';
  import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative min-h-screen overflow-hidden">
  <!-- TopBar is always visible -->
  <TopBar />

  <!-- Render page-specific content here -->
  <slot />
</main>
