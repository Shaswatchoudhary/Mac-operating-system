<script>
  export let onClose = () => {};
  
  let isDragging = false;
  let position = { x: 100, y: 80 };
  let dragStart = { x: 0, y: 0 };
  let isMaximized = false;
  let currentView = 'icons';
  let selectedItems = new Set();
  let currentFolder = 'Desktop';
  
  const sidebarItems = [
    { section: 'Favorites', items: [
      { name: 'AirDrop', color: '#4A90E2' },
      { name: 'Recents', color: '#6C7A89' },
      { name: 'Applications', color: '#E74C3C' },
      { name: 'Desktop', color: '#3498DB' },
      { name: 'Documents', color: '#3498DB' },
      { name: 'Downloads', color: '#2ECC71' },
    ]},
    { section: 'iCloud', items: [
      { name: 'iCloud Drive', color: '#4A90E2' },
    ]},
  ];
  
  const files = [
    { name: 'Project Proposal.pdf', type: 'PDF', size: '2.4 MB', modified: 'Today', color: '#E74C3C' },
    { name: 'Vacation Photos', type: 'Folder', size: '--', modified: 'Yesterday', color: '#64B5F6' },
    { name: 'Budget 2024.xlsx', type: 'Excel', size: '1.2 MB', modified: 'Nov 15', color: '#4CAF50' },
    { name: 'Meeting Notes.txt', type: 'Text', size: '45 KB', modified: 'Nov 14', color: '#9E9E9E' },
    { name: 'Design.fig', type: 'Figma', size: '8.7 MB', modified: 'Nov 13', color: '#FF6B6B' },
    { name: 'Code Archive', type: 'Folder', size: '--', modified: 'Nov 10', color: '#64B5F6' },
  ];
  
  const handleMouseDown = (e) => {
    if (isMaximized || e.target.closest('.window-controls') || e.target.closest('button')) return;
    isDragging = true;
    dragStart = { x: e.clientX - position.x, y: e.clientY - position.y };
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return;
    position = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
  };
  
  const selectItem = (index) => {
    selectedItems.has(index) ? selectedItems.delete(index) : selectedItems.add(index);
    selectedItems = selectedItems;
  };
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={() => isDragging = false} />

<div 
  class="finder-window {isMaximized ? 'maximized' : ''}" 
  style="{isMaximized ? '' : `left: ${position.x}px; top: ${position.y}px;`}"
>
  <!-- Header -->
  <div class="window-header" on:mousedown={handleMouseDown}>
    <div class="window-controls">
      <div class="control close" on:click={onClose}></div>
      <div class="control minimize"></div>
      <div class="control maximize" on:click={() => isMaximized = !isMaximized}></div>
    </div>
    <div class="header-title">{currentFolder}</div>
    <div class="window-controls-placeholder"></div>
  </div>
  
  <!-- Toolbar -->
  <div class="toolbar">
    <div class="toolbar-left">
      <button class="toolbar-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button class="toolbar-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      
      <div class="view-buttons">
        <button class="view-btn {currentView === 'icons' ? 'active' : ''}" on:click={() => currentView = 'icons'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>
        <button class="view-btn {currentView === 'list' ? 'active' : ''}" on:click={() => currentView = 'list'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="4" width="18" height="2" rx="1"/><rect x="3" y="11" width="18" height="2" rx="1"/>
            <rect x="3" y="18" width="18" height="2" rx="1"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Content -->
  <div class="finder-content">
    <!-- Sidebar -->
    <div class="sidebar">
      {#each sidebarItems as section}
        <div class="sidebar-section">
          <div class="sidebar-header">{section.section}</div>
          {#each section.items as item}
            <div class="sidebar-item {item.name === currentFolder ? 'active' : ''}" on:click={() => currentFolder = item.name}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="{item.color}">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
              </svg>
              <span>{item.name}</span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
    
    <!-- Files -->
    <div class="file-area">
      {#if currentView === 'icons'}
        <div class="icon-view">
          {#each files as file, i}
            <div class="file-icon {selectedItems.has(i) ? 'selected' : ''}" on:click={() => selectItem(i)}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="{file.color}">
                {#if file.type === 'Folder'}
                  <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                {:else}
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M14 2v6h6" fill="#fff"/>
                {/if}
              </svg>
              <div class="icon-name">{file.name}</div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="list-view">
          <div class="list-header">
            <div class="list-col-name">Name</div>
            <div class="list-col-modified">Modified</div>
            <div class="list-col-size">Size</div>
            <div class="list-col-kind">Kind</div>
          </div>
          {#each files as file, i}
            <div class="list-row {selectedItems.has(i) ? 'selected' : ''}" on:click={() => selectItem(i)}>
              <div class="list-col-name">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="{file.color}">
                  {#if file.type === 'Folder'}
                    <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                  {:else}
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  {/if}
                </svg>
                {file.name}
              </div>
              <div class="list-col-modified">{file.modified}</div>
              <div class="list-col-size">{file.size}</div>
              <div class="list-col-kind">{file.type}</div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Status Bar -->
  <div class="status-bar">
    <div>{files.length} items</div>
    <div>{selectedItems.size} selected</div>
  </div>
</div>

<style>
  .finder-window {
    position: fixed;
    width: 900px;
    height: 600px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 22px 70px 4px rgba(0,0,0,0.56);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    user-select: none;
    display: flex;
    flex-direction: column;
  }
  
  .finder-window.maximized {
    top: 40px !important;
    left: 50% !important;
    transform: translateX(-50%);
    width: calc(100vw - 60px);
    height: calc(100vh - 110px);
  }
  
  .window-header {
    background: linear-gradient(to bottom, #e8e8e8, #d5d5d5);
    cursor: grab;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #c0c0c0;
  }
  
  .window-header:active { cursor: grabbing; }
  
  .window-controls {
    display: flex;
    gap: 8px;
  }
  
  .window-controls-placeholder { width: 52px; }
  
  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .control.close { background: #ff5f57; }
  .control.minimize { background: #febc2e; }
  .control.maximize { background: #28c840; }
  
  .header-title {
    flex: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #4a4a4a;
  }
  
  .toolbar {
    background: #f6f6f6;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d0d0d0;
  }
  
  .toolbar-left {
    display: flex;
    gap: 12px;
  }
  
  .toolbar-btn, .view-btn {
    background: transparent;
    border: none;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #4a4a4a;
  }
  
  .toolbar-btn:hover, .view-btn:hover { background: #e0e0e0; }
  
  .view-buttons {
    display: flex;
    gap: 2px;
    background: #e8e8e8;
    padding: 2px;
    border-radius: 6px;
  }
  
  .view-btn.active {
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .finder-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  
  .sidebar {
    width: 180px;
    background: #f6f6f6;
    border-right: 1px solid #d0d0d0;
    overflow-y: auto;
    padding: 8px 0;
  }
  
  .sidebar-section { margin-bottom: 12px; }
  
  .sidebar-header {
    font-size: 11px;
    font-weight: 600;
    color: #8e8e93;
    padding: 4px 16px;
    text-transform: uppercase;
  }
  
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 16px;
    font-size: 13px;
    cursor: pointer;
  }
  
  .sidebar-item:hover { background: #e8e8e8; }
  .sidebar-item.active { background: #d0d0d0; font-weight: 500; }
  
  .file-area {
    flex: 1;
    overflow: auto;
    background: white;
  }
  
  .icon-view {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .file-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
  }
  
  .file-icon:hover { background: #f0f0f0; }
  .file-icon.selected { background: #0066cc; }
  .file-icon.selected .icon-name { color: white; }
  
  .icon-name {
    font-size: 12px;
    text-align: center;
    margin-top: 8px;
  }
  
  .list-view { display: flex; flex-direction: column; }
  
  .list-header {
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr 0.8fr;
    padding: 8px 16px;
    background: #f6f6f6;
    border-bottom: 1px solid #e0e0e0;
    font-size: 11px;
    font-weight: 600;
    color: #8e8e93;
  }
  
  .list-row {
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr 0.8fr;
    padding: 8px 16px;
    font-size: 13px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }
  
  .list-row:hover { background: #f6f6f6; }
  .list-row.selected { background: #0066cc; color: white; }
  
  .list-col-name {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .status-bar {
    background: #f6f6f6;
    padding: 6px 16px;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #8e8e93;
    border-top: 1px solid #d0d0d0;
  }
</style>