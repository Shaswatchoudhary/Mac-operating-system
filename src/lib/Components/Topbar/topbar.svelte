<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from '$app/environment';   

  let now = new Date(); 
  let timer;

  onMount(() => {
    timer = setInterval(() => (now = new Date()), 1000);
  });

  onDestroy(() => clearInterval(timer));

  let appleMenu = false;
  let finderMenu = false;
  let fileMenu = false;
  let editMenu = false;
  let viewMenu = false;
  let goMenu = false;
  let windowMenu = false;
  let helpMenu = false;
  let controlCenter = false;

  const appleItems = [
    "About This Mac",
    "App Store…",
    "Force Quit…",
    "Sleep",
    "Restart…",
    "Shut Down…",
    "Lock Screen",
    "Log Out User…"
  ];

  const finderItems = [
    "About Finder",
    "Preferences…",
    "Empty Trash",
    "Hide Finder",
    "Hide Others",
    "Show All",
    "Quit Finder"
  ];

  const fileItems = [
    "New Finder Window",
    "New Folder",
    "New Smart Folder",
    "New Tab",
    "Open",
    "Get Info",
    "Rename",
    "Tags…"
  ];

  const editItems = [
    "Undo",
    "Redo",
    "Cut",
    "Copy",
    "Paste",
    "Select All",
  ];

  const viewItems = [
    "as Icons",
    "as List",
    "as Columns",
    "as Gallery"
  ];

  const goItems = [
    "Back",
    "Forward",
    "Recents",
    "Home",
    "Computer",
    "AirDrop",
    "Go to Folder…",
  ];

  const windowItems = [
    "Minimize",
    "Zoom",
    "Desktop",
    "Downloads"
  ];

  const helpItems = [
    "Send Feedback",
    "Separator",
    "macOS Help"
  ];

  let menuItems = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"];

  function toggleApple(event) {
    appleMenu = !appleMenu;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleFinder(event) {
    finderMenu = !finderMenu;
    appleMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleFile(event) {
    fileMenu = !fileMenu;
    appleMenu = false;
    finderMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleEdit(event) {
    editMenu = !editMenu;
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleView(event) {
    viewMenu = !viewMenu;
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleGo(event) {
    goMenu = !goMenu;
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleWindow(event) {
    windowMenu = !windowMenu;
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    helpMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleHelp(event) {
    helpMenu = !helpMenu;
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    controlCenter = false;
    event.stopPropagation();
  }

  function toggleControlCenter(event) {
    controlCenter = !controlCenter;
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    event.stopPropagation();
  }

  function handleClickOutside() {
    appleMenu = false;
    finderMenu = false;
    fileMenu = false;
    editMenu = false;
    viewMenu = false;
    goMenu = false;
    windowMenu = false;
    helpMenu = false;
    controlCenter = false;
  }
  
  onMount(() => {
    if (browser) window.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    if (browser) window.removeEventListener('click', handleClickOutside);
  });

  let wifiEnabled = true;
  let bluetoothEnabled = false;
  let brightness = 75;
  let volume = 60;
</script>

<div class="fixed top-0 left-0 w-full h-8 bg-gray-900/50 backdrop-blur-lg text-white flex justify-between items-center px-4 z-50 font-sans text-sm">

  <div class="flex items-center gap-4 relative">
    <div class="relative">
      <button class="cursor-pointer rounded hover:bg-white/20 transition" on:click={toggleApple} aria-label="Apple menu" aria-expanded={appleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25" />
        </svg>
      </button>

      {#if appleMenu}
        <div class="absolute top-full left-0 mt-1 bg-gray-900/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[200px] z-50">
          {#each appleItems as ai}
            <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{ai}</button>
          {/each}
        </div>
      {/if}
    </div>

    {#each menuItems as item}
      <div class="relative">
        <button 
          class="cursor-pointer px-2 py-0.5 rounded hover:bg-white/20 transition"
          on:click={(event) => {
            if (item === "Finder") toggleFinder(event);
            if (item === "File") toggleFile(event);
            if (item === "Edit") toggleEdit(event);
            if (item === "View") toggleView(event);
            if (item === "Go") toggleGo(event);
            if (item === "Window") toggleWindow(event);
            if (item === "Help") toggleHelp(event);
          }}
          aria-label="{item} menu"
          aria-expanded={
            (item === "Finder" && finderMenu) ||
            (item === "File" && fileMenu) ||
            (item === "Edit" && editMenu) ||
            (item === "View" && viewMenu) ||
            (item === "Go" && goMenu) ||
            (item === "Window" && windowMenu) ||
            (item === "Help" && helpMenu)
          }
        >
          {item}
        </button>

        {#if finderMenu && item === "Finder"}
          <div class="absolute top-full left-0 mt-1 bg-gray-900/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each finderItems as fi}
              <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{fi}</button>
            {/each}
          </div>
        {/if}

        {#if fileMenu && item === "File"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each fileItems as fi}
              <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{fi}</button>
            {/each}
          </div>
        {/if}

        {#if editMenu && item === "Edit"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each editItems as ei}
              <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{ei}</button>
            {/each}
          </div>
        {/if}

        {#if viewMenu && item === "View"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each viewItems as vi}
              <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{vi}</button>
            {/each}
          </div>
        {/if}

        {#if goMenu && item === "Go"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each goItems as gi}
              <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{gi}</button>
            {/each}
          </div>
        {/if}

        {#if windowMenu && item === "Window"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each windowItems as wi}
              <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{wi}</button>
            {/each}
          </div>
        {/if}

        {#if helpMenu && item === "Help"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each helpItems as hi}
              {#if hi === "Separator"}
                <hr class="border-gray-700 my-1" />
              {:else}
                <button class="px-4 py-2 hover:bg-blue-500/50 cursor-pointer w-full text-left">{hi}</button>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="flex items-center gap-4">
    <div class="relative">
      <button class="cursor-pointer rounded hover:bg-white/20 transition" on:click={toggleControlCenter} aria-label="Control Center" aria-expanded={controlCenter}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path fill="currentColor" d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7zm7 6a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m-7-14a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m2.45 0A3.5 3.5 0 0 1 8 3.5A3.5 3.5 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7" />
        </svg>
      </button>

      {#if controlCenter}
        <div 
          class="absolute top-full right-0 mt-2 bg-gray-800/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl w-[280px] z-50 p-3" 
          on:click|stopPropagation
          on:keydown={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Control Center Panel"
          tabindex="-1"
        >
          
          <div class="grid grid-cols-2 gap-2 mb-3">
            <button 
              class="bg-{wifiEnabled ? 'blue-500/30' : 'gray-700/50'} hover:bg-{wifiEnabled ? 'blue-500/40' : 'gray-700/70'} rounded-xl p-3 cursor-pointer transition text-left"
              on:click={() => wifiEnabled = !wifiEnabled}
              aria-label="Wi-Fi {wifiEnabled ? 'enabled' : 'disabled'}"
              aria-pressed={wifiEnabled}
            >
              <div class="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                  <circle cx="12" cy="20" r="1"/>
                </svg>
                <span class="text-xs font-semibold">Wi-Fi</span>
              </div>
              <p class="text-xs text-gray-300">{wifiEnabled ? 'Home' : 'Off'}</p>
            </button>

            <button 
              class="bg-{bluetoothEnabled ? 'blue-500/30' : 'gray-700/50'} hover:bg-{bluetoothEnabled ? 'blue-500/40' : 'gray-700/70'} rounded-xl p-3 cursor-pointer transition text-left"
              on:click={() => bluetoothEnabled = !bluetoothEnabled}
              aria-label="Bluetooth {bluetoothEnabled ? 'enabled' : 'disabled'}"
              aria-pressed={bluetoothEnabled}
            >
              <div class="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.5 5.5L16 4l-1.5 1.5l1.5 1.5l1.5-1.5zm-5 5l-1.5 1.5l1.5 1.5l1.5-1.5l-1.5-1.5zM12 1l-1.5 1.5L12 4l1.5-1.5L12 1zm-5 5.5L5.5 5L4 6.5L5.5 8L7 6.5zM6.5 12L5 13.5L6.5 15L8 13.5L6.5 12zM12 23l1.5-1.5L12 20l-1.5 1.5L12 23zm6.5-11L17 13.5L18.5 15L20 13.5L18.5 12z"/>
                </svg>
                <span class="text-xs font-semibold">Bluetooth</span>
              </div>
              <p class="text-xs text-gray-300">{bluetoothEnabled ? 'On' : 'Off'}</p>
            </button>
          </div>

          <div class="bg-gray-700/50 rounded-xl p-3 mb-2">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <span class="text-xs font-semibold">Display</span>
              </div>
              <span class="text-xs text-gray-400">{brightness}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              bind:value={brightness}
              class="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
              aria-label="Display brightness"
            />
          </div>

          <div class="bg-gray-700/50 rounded-xl p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                <span class="text-xs font-semibold">Sound</span>
              </div>
              <span class="text-xs text-gray-400">{volume}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              bind:value={volume}
              class="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
              aria-label="Volume"
            />
          </div>

        </div>
      {/if}
    </div>

    <div class="ml-auto flex items-center gap-2 text-sm text-white/90 select-none" aria-live="polite">
      {#key now}
        <div>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        <div>
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
      {/key}
    </div>
  </div>
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
</style>