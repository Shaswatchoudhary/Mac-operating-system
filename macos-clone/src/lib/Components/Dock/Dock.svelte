<script>
import FinderIcon from '$lib/assets/static/Finder.png';
import LaunchpadIcon from '$lib/assets/static/launchpad.png';
import PhotosIcon from '$lib/assets/static/photos.png';
import CalculatorIcon from '$lib/assets/static/calculator.png';
import CalendarIcon from '$lib/assets/static/calendar.png';
import VSCodeIcon from '$lib/assets/static/vscode.png';
import AppstoreIcon from '$lib/assets/static/Appstore.png';
import FoxIcon from '$lib/assets/static/fox.png';
import WallpaperIcon from '$lib/assets/static/wallpaper.png';

import WallpaperApp from "../wallpaper/wallpaper.svelte";

let apps = [
  { name: "Finder", icon: FinderIcon, active: true },
  { name: "Launchpad", icon: LaunchpadIcon },
  { name: "Photos", icon: PhotosIcon },
  { name: "Calculator", icon: CalculatorIcon, active: true }, 
  { name: "Calendar", icon: CalendarIcon, active: true },
  { name: "VS Code", icon: VSCodeIcon },
  { name: "App Store", icon: AppstoreIcon },
  { name: "Portfolio", icon: FoxIcon },
  { name: "Wallpaper", icon: WallpaperIcon },
];

let hoveredIndex = -1;
let openWallpaper = false;
let wallpaperKey = 0; 

function getScale(i) { 
  const dist = Math.abs(i - hoveredIndex);
  if (dist === 0) return 1.6;
  if (dist === 1) return 1.3;
  if (dist === 2) return 1.1;
  return 1.0;
}

// function handleAppClick(app) {
//   if (app.name === "Wallpaper") {
//     openWallpaper = true;
//     wallpaperKey += 1; // ✅ force remount each time clicked
//   }
// }
</script>

<div
  class="fixed bottom-8 left-1/2 -translate-x-1/2
         flex items-end gap-5 px-8 py-4
         rounded-[2rem] 
         backdrop-blur-2xl bg-transparent shadow-2xl
         border border-white/20
         transition-all duration-300"
  style="min-width: 850px;"
  role="menubar"
>
<!-- Dock -->
  {#each apps as app, i}
    <button
      type="button"
      class="relative transition-all duration-300 ease-out cursor-pointer flex items-end focus:outline-none"
      on:focus={() => (hoveredIndex = i)}  
      on:blur={() => (hoveredIndex = -1)}
      on:mouseenter={() => (hoveredIndex = i)}
      on:mouseleave={() => (hoveredIndex = -1)}
      on:click={() => handleAppClick(app)} 
      style="outline: none;"
      role="menuitem"
      aria-label={app.name}
    >
      {#if hoveredIndex === i}
        <div
          class="absolute left-1/2 -translate-x-1/2 -top-12 
                 bg-gray-800 text-white text-sm font-semibold 
                 px-3 py-1.5 rounded-lg 
                 transition-opacity duration-200 whitespace-nowrap z-10"
        >
          {app.name}
          <!-- hover effect using this can see the names of the dock app  -->
        </div>
      {/if}

      <img
        src={app.icon}
        alt={app.name}
        draggable="false"
        class="w-14 h-14 rounded-xl transition-transform duration-200"
        style="transform: scale({getScale(i)});"
      /> 
      <!-- this is the active app indicator -->
      {#if app.active}
        <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
      {/if}
    </button>
    <!-- this is the separator means |  the line between the docks apps-->

    {#if i === 1 || i === 6}
      <div class="flex items-center self-center">
        <div class="w-px h-10 bg-black mx-2 self-center"></div>
      </div>
    {/if}
  {/each}
  <!-- this uses to showcase the app in the dock (visible it )-->
</div>
<!-- whenever wallpaperKey changes, remounts correctly on each click -->
<!-- {#if openWallpaper}
  {#key wallpaperKey}
    <WallpaperApp onClose={() => (openWallpaper = false)} />
  {/key}
{/if} 
becz of this the extra layer is doing problem so we hav to check for this 
--> 

<style> 
  img {
    transition: transform 0.2s ease-out;
    will-change: transform;
  }
  img:hover {
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4));
  }

  .backdrop-blur-2xl {
    backdrop-filter: blur(40px); 
  }
</style>
