<script>
  import FinderIcon from '$lib/assets/static/Finder.png';
  import LaunchpadIcon from '$lib/assets/static/launchpad.png';
  // import PhotosIcon from '$lib/assets/static/photos.png';
  // import CalculatorIcon from '$lib/assets/static/calculator.png';
  // import CalendarIcon from '$lib/assets/static/calendar.png';
  // import WindcodeIcon from '$lib/assets/static/vscode.png';
  // import AppstoreIcon from '$lib/assets/static/Appstore.png';
  import FoxIcon from '$lib/assets/static/fox.png';
  // import WallpaperIcon from '$lib/assets/static/wallpaper.png';

  import PortfolioApp from "../Portfolio/PortfolioApp.svelte";
  // import CalculatorApp from "../Calculator/calculator.svelte"; 
  // import PhotosApp from "../Photos/photos.svelte"; 
  // import CalendarApp from "../Calendar/Calendar.svelte"; 
  // import WindcodeApp from "../windcode/windcode.svelte";
  // import AppstoreApp from "../Appstore/Appstore.svelte";
  // import WallpaperApp from "../Wallpaper/wallpaper.svelte";
  // import LaunchpadApp from "../launchpad/launchpad.svelte";
  // import FinderApp from "../Finder/Finder.svelte";

  let apps = [
    // { name: "Finder", icon: FinderIcon },
    // { name: "Launchpad", icon: LaunchpadIcon },
    // { name: "Photos", icon: PhotosIcon },
    // { name: "Calculator", icon: CalculatorIcon },
    // { name: "Calendar", icon: CalendarIcon },
    // { name: "Windcode", icon: WindcodeIcon },
    // { name: "App Store", icon: AppstoreIcon },
    { name: "Portfolio", icon: FoxIcon }, 
    // { name: "Wallpaper", icon: WallpaperIcon }, 
  ];

  let hoveredIndex = -1;
  let openPortfolio = false;
  let portfolioKey = 0;
  // let openCalculator = false;
  // let calculatorKey = 0;
  // let openPhotos = false; 
  // let photosKey = 0; 
  // let openCalendar = false;
  // let calendarKey = 0;
  // let openWindcode = false;
  // let windcodeKey = 0;
  // let openAppstore = false;
  // let appstoreKey = 0;
  // let openWallpaper = false;
  // let wallpaperKey = 0;
  // let openFinder = false;
  // let finderKey = 0;
  // let openLaunchpad = false;
  // let launchpadKey = 0;

  function getScale(i) {
    const dist = Math.abs(i - hoveredIndex);
    if (dist === 0) return 1.6;
    if (dist === 1) return 1.3;
    if (dist === 2) return 1.1;
    return 1.0;
  }

  function handleAppClick(app) {
    if (app.name === "Portfolio") {
      openPortfolio = true;
      portfolioKey += 1;
    } 
    // else if (app.name === "Calculator") {
    //   openCalculator = true;
    //   calculatorKey += 1;
    // } else if (app.name === "Photos") {
    //   openPhotos = true;
    //   photosKey += 1;
    // }
    // else if (app.name === "Calendar") {
    //   openCalendar = true;
    //   calendarKey += 1;
    // }
    // else if (app.name === "Windcode") {
    //   openWindcode = true;
    //   windcodeKey += 1;
    // }
    // else if (app.name === "App Store") {
    //   openAppstore = true;
    //   appstoreKey += 1;
    // }
    // else if (app.name === "Wallpaper") {
    //   openWallpaper = true;
    //   wallpaperKey += 1;
    // }
    // else if (app.name === "Finder") {
    //   openFinder = true;
    //   finderKey += 1;
    // }
    // else if (app.name === "Launchpad") {
    //   openLaunchpad = true;
    //   launchpadKey += 1;
    // }
  }
</script>

<!-- 🧭 Dock Container -->
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
        </div>
      {/if}

      <img
        src={app.icon}
        alt={app.name}
        draggable="false"
        class="w-14 h-14 rounded-xl transition-transform duration-200"
        style="transform: scale({getScale(i)});"
      />
    </button>
  {/each}
</div>

<!-- opens Portfolio app when clicked -->
{#if openPortfolio}
  {#key portfolioKey}
    <PortfolioApp onClose={() => (openPortfolio = false)} />
  {/key}
{/if}

<!-- Commented out apps - uncomment when components are ready -->
<!-- 
{#if openCalculator}
  {#key calculatorKey}
    <CalculatorApp onClose={() => (openCalculator = false)} />
  {/key}
{/if}

{#if openPhotos}
  {#key photosKey}
    <PhotosApp onClose={() => (openPhotos = false)} />
  {/key}
{/if}

{#if openCalendar}
  {#key calendarKey}
    <CalendarApp onClose={() => (openCalendar = false)} />
  {/key}
{/if}

{#if openWindcode}
  {#key windcodeKey}
    <WindcodeApp onClose={() => (openWindcode = false)} />
  {/key}
{/if}

{#if openAppstore}
  {#key appstoreKey}
    <AppstoreApp onClose={() => (openAppstore = false)} />
  {/key}
{/if}

{#if openWallpaper}
  {#key wallpaperKey}
    <WallpaperApp onClose={() => (openWallpaper = false)} />
  {/key}
{/if}

{#if openFinder}
  {#key finderKey}
    <FinderApp onClose={() => (openFinder = false)} />
  {/key}
{/if}

{#if openLaunchpad}
  {#key launchpadKey}
    <LaunchpadApp onClose={() => (openLaunchpad = false)} />
  {/key}
{/if}
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