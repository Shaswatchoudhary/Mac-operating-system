<script>
  import Dock from '$lib/Components/Dock/Dock.svelte';

  import wallpaper1 from '$lib/assets/wallpaper/wallpaper3.png';

  let selectedWallpaper = wallpaper1; 
</script>

<div 
  class="desktop" 
  style="background-image: url({selectedWallpaper}); background-size: cover; background-position: center; min-height: 100vh;"
>
  <Dock />
</div>

<style>
  .desktop {
    transition: background 0.3s ease-in-out;
  }
</style>
