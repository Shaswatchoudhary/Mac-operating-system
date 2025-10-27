<script>

  let apps = [
    { name: "Finder", icon: "/Finder.png", active: true },
    { name: "Launchpad", icon: "/launchpad.png" },
    { name: "Photos", icon: "/photos.png" },
    { name: "Calculator", icon: "/calculator.png", active: true }, 
    { name: "Calendar", icon: "/calendar.png", active: true },
    { name: "VS Code", icon: "/vscode.png" },
    { name: "App Store", icon: "/Appstore.png" },
    { name: "Portfolio", icon: "/fox.png" },
    { name: "Wallpaper", icon: "/wallpaper.png" },
  ];

  let hoveredIndex = -1;

  // This function is used to get the scale of the icon (macOS Dock "magnification")
  function getScale(i) { 
    const dist = Math.abs(i - hoveredIndex);
    if (dist === 0) return 1.6;
    if (dist === 1) return 1.3;
    if (dist === 2) return 1.1;
    return 1.0;
  }
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
<!--
  on focus is used to get the index of the app that is focused means it tells which app is focused using hover index

  onblur is used to remove the focus from the app when it is not focused

  onmouseenter is used to get the index of the app that is hovered means it tells which app is hovered using hover index

  onmouseleave is used to remove the hover from the app when it is not hovered

  style="outline: none;" is used to remove the outline from the app when it is focused

  role="menuitem" is used to tell the app that it is a menu item

  aria-label= is used to tell the app that it is a menu item
-->
  {#each apps as app, i}
    <button
      type="button"
      class="relative transition-all duration-300 ease-out cursor-pointer flex items-end focus:outline-none"
      on:focus={() => (hoveredIndex = i)}  
     
      
      on:blur={() => (hoveredIndex = -1)}
      on:mouseenter={() => (hoveredIndex = i)}
      on:mouseleave={() => (hoveredIndex = -1)}
      style="outline: none;"
      role="menuitem"
      aria-label={app.name}
    >
    <!-- this is used to show the name of the app when it is hovered -->
      {#if hoveredIndex === i}
        <div
          class="absolute left-1/2 -translate-x-1/2 -top-12 
                 bg-gray-800 text-white text-sm font-semibold 
                 px-3 py-1.5 rounded-lg 
                 transition-opacity duration-200 whitespace-nowrap z-10"
        >
          {app.name} 
          <!-- this is used to show the name of the app when it is hovered -->  
        </div>
      {/if}

      <img
        src={app.icon}
        alt={app.name}
        draggable="false"
        class="w-14 h-14 rounded-xl transition-transform duration-200"
        style="transform: scale({getScale(i)});"
      />
      {#if app.active}
        <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
      {/if}
    </button>

    {#if i === 1 || i === 6}
      <div class="flex items-center self-center"> 
        <!-- this is used to add separator line after certain icons using flex items-center  -->
        <div class="w-px h-10 bg-black mx-2 self-center"></div>
      </div>
    {/if}
  {/each}
</div>

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