<script>
  export let onSelect;
  export let onClose = () => {};

  let selectedWallpaper = 0;
  let isMaximized = false;

  import wallpaper1 from '$lib/assets/wallpaper/wallpaper1.png';
  import wallpaper2 from '$lib/assets/wallpaper/wallpaper2.png';
  import wallpaper3 from '$lib/assets/wallpaper/wallpaper3.png';
  import wallpaper4 from '$lib/assets/wallpaper/wallpaper4.png';
  
  // Wallpapers array - reduced to 4 for brevity
  let wallpapers = [
    { name: "Wallpaper 1", image: wallpaper1 },
    { name: "Wallpaper 2", image: wallpaper2 },
    { name: "Wallpaper 3", image: wallpaper3 },
    { name: "Wallpaper 4", image: wallpaper4 }
  ];

  // Select wallpaper and notify parent component
  function selectWallpaper(index) {
    selectedWallpaper = index;
    if (onSelect) onSelect(wallpapers[index].image);
  }
</script>

<!-- Removed blur effect from overlay -->
<div class="settings-overlay">
  <div class="settings-window {isMaximized ? 'maximized' : ''}">
    <!-- Window header with macOS controls -->
    <div class="window-header">
      <div class="window-controls">
        <button on:click={onClose} class="control close" />
        <button class="control minimize" />
        <button on:click={() => isMaximized = !isMaximized} class="control maximize" />
      </div>
      <div class="window-title">Desktop & Screen Saver</div>
      <div class="spacer" />
    </div>

    <div class="settings-content">
      <!-- Sidebar navigation -->
      <div class="sidebar">
        <div class="sidebar-label">Settings</div>
        <div class="sidebar-items">
          <div class="sidebar-item active">Desktop</div>
          <div class="sidebar-item">Screen Saver</div>
        </div>
      </div>

      <!-- Main content area -->
      <div class="main-content">
        <div class="content-header">
          <h2>Choose Your Desktop Picture</h2>
          <p>Select a wallpaper from the options below</p>
        </div>

        <!-- Wallpaper grid with selection -->
        <div class="wallpaper-grid">
          {#each wallpapers as wallpaper, index}
            <div
              on:click={() => selectWallpaper(index)}
              on:keypress={(e) => e.key === 'Enter' && selectWallpaper(index)}
              role="button"
              tabindex="0"
              class="wallpaper-item {selectedWallpaper === index ? 'selected' : ''}"
            >
              <img src={wallpaper.image} alt={wallpaper.name} />
              {#if selectedWallpaper === index}
                <div class="checkmark">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              {/if}
              <div class="wallpaper-label">
                <p>{wallpaper.name}</p>
              </div>
            </div>
          {/each}
        </div>

        <!-- Additional settings options -->
        <div class="settings-options">
          <div class="option-row">
            <label>Change picture:</label>
            <select>
              <option>Never</option>
              <option>Every 5 seconds</option>
              <option>Every minute</option>
              <option>Every hour</option>
            </select>
          </div>
          <label class="checkbox-label">
            <input type="checkbox" />
            Random order
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Overlay without blur effect */
  .settings-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .settings-window {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(40px);
    border-radius: 12px;
    box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
    overflow: hidden;
    width: 900px;
    height: 600px;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    transition: all 0.3s ease;
  }

  /* Maximized state - fills viewport */
  .settings-window.maximized {
    width: calc(100vw - 60px);
    height: calc(100vh - 60px);
  }

  .window-header {
    background: linear-gradient(to bottom, #f5f5f5, #e8e8e8);
    border-bottom: 1px solid #d1d1d1;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .window-controls { display: flex; gap: 8px; }
  
  /* macOS-style window controls */
  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .control:hover { opacity: 0.8; }
  .control.close { background: #ff5f57; }
  .control.minimize { background: #febc2e; }
  .control.maximize { background: #28c840; }
  .window-title { font-size: 14px; font-weight: 600; color: #333; }
  .spacer { width: 64px; }
  
  .settings-content { display: flex; flex: 1; overflow: hidden; }
  
  /* Sidebar styling */
  .sidebar {
    width: 192px;
    background: #f5f5f5;
    border-right: 1px solid #d1d1d1;
    padding: 16px;
  }

  .sidebar-label {
    font-size: 11px;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }

  .sidebar-items { display: flex; flex-direction: column; gap: 4px; }
  
  .sidebar-item {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
    transition: background 0.2s;
  }

  .sidebar-item:hover { background: #e0e0e0; }
  .sidebar-item.active { background: #007aff; color: white; font-weight: 500; }
  
  .main-content { flex: 1; padding: 24px; overflow-y: auto; }
  .content-header { margin-bottom: 24px; }
  .content-header h2 { font-size: 20px; font-weight: 600; color: #1d1d1f; margin: 0 0 8px 0; }
  .content-header p { font-size: 13px; color: #666; margin: 0; }
  
  /* Wallpaper grid - responsive */
  .wallpaper-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .wallpaper-item {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 3px solid transparent;
  }

  .wallpaper-item:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  /* Selected wallpaper highlighting */
  .wallpaper-item.selected {
    border-color: #007aff;
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 122, 255, 0.3);
  }

  .wallpaper-item img { width: 100%; height: 160px; object-fit: cover; display: block; }
  
  /* Checkmark indicator for selected wallpaper */
  .checkmark {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: #007aff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .wallpaper-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
    padding: 8px;
  }

  .wallpaper-label p { color: white; font-size: 12px; font-weight: 500; margin: 0; }
  .settings-options { padding-top: 24px; border-top: 1px solid #d1d1d1; }
  
  .option-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .option-row label { font-size: 13px; color: #333; }
  
  .option-row select {
    padding: 6px 12px;
    border: 1px solid #d1d1d1;
    border-radius: 6px;
    font-size: 13px;
    background: white;
    cursor: pointer;
  }

  .checkbox-label { display: flex; align-items: center; font-size: 13px; color: #333; cursor: pointer; }
  .checkbox-label input { margin-right: 8px; cursor: pointer; }
  
  /* Scrollbar styling */
  .main-content::-webkit-scrollbar { width: 8px; }
  .main-content::-webkit-scrollbar-track { background: transparent; }
  .main-content::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 4px; }
  .main-content::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.3); }
</style>