<script>
  import Dock from '$lib/Components/Dock/Dock.svelte';
  import Wallpaper from '$lib/Components/wallpaper/wallpaper.svelte';
  import wallpaper1 from '$lib/assets/wallpaper/wallpaper6.png';

  let selectedWallpaper = wallpaper1;
  let showSettings = false;

  function handleWallpaperChange(newWallpaper) {
    selectedWallpaper = newWallpaper;
  }

  function openSettings() {
    showSettings = true;
  }

  function closeSettings() {
    showSettings = false;
  }
</script>

<div 
  class="desktop" 
  style="background-image: url({selectedWallpaper});"
>
  <Dock on:openSettings={openSettings} />
  
  {#if showSettings}
    <Wallpaper 
      onSelect={handleWallpaperChange}
      onClose={closeSettings}
    />
  {/if}
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden; 
  }

  .desktop {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background 0.3s ease-in-out;
  }
</style>