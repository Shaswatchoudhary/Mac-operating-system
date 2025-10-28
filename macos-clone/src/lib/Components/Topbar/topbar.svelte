<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from '$app/environment';   

  let now = new Date(); 
  let timer;

  onMount(() => {
    timer = setInterval(() => (now = new Date()), 1000); // every second update the time
  });

  onDestroy(() => clearInterval(timer));

  let finderMenu = false;
  let fileMenu = false;

  const finderItems = [
    "About Finder",
    "Preferences…",
    "Empty Trash",
    "Hide Finder",
    "Quit Finder"
  ];

  const fileItems = [
    "New Finder Window",
    "New File",
    "New Folder",
    "New Smart Folder",
    "New Tab",
    "Close",
    "Quit"
  ];

  let menuItems = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"];

  function toggleFinder(event) {
    finderMenu = !finderMenu;
    fileMenu = false; // close file menu if open
    event.stopPropagation(); // Prevent click from propagating to window
  }

  function toggleFile(event) {
    fileMenu = !fileMenu;
    finderMenu = false; // close finder menu if open
    event.stopPropagation();
  }

  function handleClickOutside() {
    finderMenu = false;
    fileMenu = false;
  }
  onMount(() => {
    if (browser) window.addEventListener('click', handleClickOutside);
  });  //mount means when component is mounted we usedit becz we want to add event listener when component is mounted means when we click outside the dropdown it should close

  onDestroy(() => {
    if (browser) window.removeEventListener('click', handleClickOutside);
  }); //destroy means when component is destroyed we usedit becz we want to remove event listener when component is destroyed means when we click outside the dropdown it should close
</script>

<div class="fixed top-0 left-0 w-full h-8 bg-gray-900/50 backdrop-blur-lg text-white flex justify-between items-center px-4 z-50 font-sans text-sm">

  <!-- Left side -->
  <div class="flex items-center gap-4 relative">
    <!-- Apple icon -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         class="cursor-pointer rounded hover:bg-white/20 transition">
      <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25" />
    </svg>

    <!-- Menu items -->
    {#each menuItems as item}
      <div class="cursor-pointer px-2 py-0.5 rounded hover:bg-white/20 transition relative"
           on:click={(event) => {
             if (item === "Finder") toggleFinder(event);
             if (item === "File") toggleFile(event);
           }}>
        {item}

        <!-- Dropdown for Finder -->
        {#if finderMenu && item === "Finder"}
          <div class="absolute top-full left-0 mt-1 bg-gray-900/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each finderItems as fi}
              <div class="px-4 py-2 hover:bg-gray-900/20 cursor-pointer">{fi}</div>
            {/each}
          </div>
        {/if}

        <!-- Dropdown for File -->
        {#if fileMenu && item === "File"}
          <div class="absolute top-full left-0 mt-1 bg-gray-800/50 backdrop-blur-lg text-white rounded shadow-lg min-w-[180px] z-50">
            {#each fileItems as fi}
              {#if fi === "Separator"}
                <hr class="border-gray-700 my-1" />
              {:else}
                <div class="px-4 py-2 hover:bg-gray-900/20 cursor-pointer">{fi}</div>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Right side -->
  <div class="flex items-center gap-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
         class="cursor-pointer rounded hover:bg-white/20 transition">
      <path fill="currentColor" d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7zm7 6a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m-7-14a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m2.45 0A3.5 3.5 0 0 1 8 3.5A3.5 3.5 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7" />
    </svg>

  <div class="ml-auto flex items-center gap-2 text-sm text-white/90 select-none">
  {#key now} <!-- #key is used to update the time every second in svelte it is a built in function -->
    <div>
      {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
    <!-- this is used to get the date in the format of day, date, month and long format is used to get the date in the format of day, date, month and year -->
    </div>
    <div>
      {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
    </div>
  {/key} <!-- /key wrapped around the time and date to update the time every second -->
</div>
</div>

</div>
