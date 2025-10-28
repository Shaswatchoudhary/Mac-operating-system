<script>
  export let activeApp; 
  export let onSelect;  

  let selectedWallpaper = 0;
  let isMaximized = false;
  let isAppOpen = true;

  import wallpaper1 from '$lib/assets/wallpaper/wallpaper1.png';
  import wallpaper2 from '$lib/assets/wallpaper/wallpaper2.png';
  import wallpaper3 from '$lib/assets/wallpaper/wallpaper3.png';
  import wallpaper4 from '$lib/assets/wallpaper/wallpaper4.png';
  import wallpaper5 from '$lib/assets/wallpaper/wallpaper5.png';
  import wallpaper6 from '$lib/assets/wallpaper/wallpaper6.png';
  import wallpaper7 from '$lib/assets/wallpaper/wallpaper7.png';
  
  // Using placeholder images - replace with your actual wallpaper paths
  let wallpapers = [
    { name: "Wallpaper 1", image: wallpaper1 },
    { name: "Wallpaper 2", image: wallpaper2 },
    { name: "Wallpaper 3", image: wallpaper3 },
    { name: "Wallpaper 4", image: wallpaper4 },
    { name: "Wallpaper 5", image: wallpaper5 },
    { name: "Wallpaper 6", image: wallpaper6 },
    { name: "Wallpaper 7", image: wallpaper7 },
  ];

  function selectWallpaper(index) {
    selectedWallpaper = index;

    if (onSelect) {
      onSelect(wallpapers[index].image);
    }
  }

  function toggleMaximize() {
    isMaximized = !isMaximized;
  }

  function closeApp() {
    isAppOpen = false;
    activeApp = null; 
  }
</script>

{#if isAppOpen}
<div class="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-8">
  <div 
    class="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden transition-all duration-300 {isMaximized ? 'w-full h-full' : 'w-[900px] h-[600px]'} relative"
  >
    <div class="bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button 
          on:click={closeApp}
          class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
        <button class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
        <button 
          on:click={toggleMaximize}
          class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
        />
      </div>
      <div class="text-sm font-semibold text-gray-700">Desktop & Screen Saver</div>
      <div class="w-16" />
    </div>

   
    <div class="flex h-[calc(100%-52px)]">
   
      <div class="w-48 bg-gray-50 border-r border-gray-200 p-4">
        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Settings
        </div>
        <div class="space-y-1">
          <div class="px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium">
            Desktop
          </div>
          <div class="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md text-sm cursor-pointer">
            Screen Saver
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-6 overflow-y-auto">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Choose Your Desktop Picture</h2>
          <p class="text-sm text-gray-600">Select a wallpaper from the options below</p>
        </div>

        <div class="grid grid-cols-3 gap-4">
          {#each wallpapers as wallpaper, index}
            <div
              on:click={() => selectWallpaper(index)}
              on:keypress={(e) => e.key === 'Enter' && selectWallpaper(index)}
              role="button"
              tabindex="0"
              class="relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 {selectedWallpaper === index ? 'ring-4 ring-blue-500 shadow-lg scale-105' : 'hover:scale-102 hover:shadow-md'}"
            >
              <img
                src={wallpaper.image}
                alt={wallpaper.name}
                class="w-full h-40 object-cover"
              />
              <div class="absolute inset-0 border-2 rounded-lg pointer-events-none {selectedWallpaper === index ? 'border-blue-500' : 'border-transparent'}" />
              {#if selectedWallpaper === index}
                <div class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              {/if}
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p class="text-white text-xs font-medium">{wallpaper.name}</p>
              </div>
            </div>
          {/each}
        </div>

        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <label class="text-sm text-gray-700">Change picture:</label>
            <select class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
              <option>Never</option>
              <option>Every 5 seconds</option>
              <option>Every minute</option>
              <option>Every 5 minutes</option>
              <option>Every hour</option>
              <option>Every day</option>
            </select>
          </div>
          <label class="flex items-center text-sm text-gray-700">
            <input type="checkbox" class="mr-2 rounded" />
            Random order
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
  @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
</style>
