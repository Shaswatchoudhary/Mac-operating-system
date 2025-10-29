<script>
  export let onClose = () => {};
  
  let searchQuery = '';
  import calculatorIcon from '$lib/assets/static/calculator.png';
  import calendarIcon from '$lib/assets/static/calendar.png';
  import vscodeIcon from '$lib/assets/static/vscode.png';
  import appstoreIcon from '$lib/assets/static/appstore.png';
  import musicIcon from '$lib/assets/static/music.png';
  import photosIcon from '$lib/assets/static/photos.png';
  import portfolioIcon from '$lib/assets/static/fox.png';
  
  const apps = [
    {   
      name: 'Photos', 
      src: photosIcon
    },
    { 
      name: 'Calculator', 
      src: calculatorIcon
    },
    { 
      name: 'Calendar', 
      src: calendarIcon
    },
    { 
      name: 'VS Code', 
      src: vscodeIcon
    },
    { 
      name: 'App Store', 
      src: appstoreIcon
    },
    { 
      name: 'Music', 
      src: musicIcon
    },
    {
      name:'Portfolio',
      src:portfolioIcon
    }
  ];
  
  $: filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleBackgroundClick() {
    onClose();
  }
</script>

<div class="launchpad" on:click={handleBackgroundClick} role="button" tabindex="0">
  <div class="launchpad-content" on:click|stopPropagation role="dialog">
    
    <!-- Search Bar -->
    <div class="search-bar">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input 
        type="text" 
        placeholder="Search" 
        class="search-input"
        bind:value={searchQuery}
        autofocus
      />
    </div>
    
    <!-- App Grid -->
    <div class="app-grid">
      {#each filteredApps as app}
        <div class="app-item">
          <div class="app-icon">
            <img src={app.src} alt={app.name} />
          </div>
          <div class="app-name">{app.name}</div>
        </div>
      {/each}
    </div>
    
    <!-- Page Dots -->
    <div class="page-dots">
      <div class="dot active"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    
  </div>
</div>

<style>
  .launchpad {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
    cursor: pointer;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .launchpad-content {
    width: 100%;
    max-width: 1200px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
  }
  
  .search-bar {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin-bottom: 60px;
  }
  
  .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
    pointer-events: none;
  }
  
  .search-input {
    width: 100%;
    padding: 16px 20px 16px 50px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    color: white;
    font-size: 18px;
    outline: none;
    transition: all 0.3s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  .search-input:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 40px;
    width: 100%;
    max-width: 1000px;
    padding: 20px;
  }
  
  .app-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .app-item:hover {
    transform: scale(1.05);
  }
  
  .app-item:active {
    transform: scale(0.95);
  }
  
  .app-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s;
  }
  
  .app-item:hover .app-icon {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
  
  .app-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 22px;
  }
  
  .app-name {
    color: white;
    font-size: 13px;
    text-align: center;
    font-weight: 500;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .page-dots {
    display: flex;
    gap: 8px;
    margin-top: 40px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s;
  }
  
  .dot.active {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }
  
  @media (max-width: 768px) {
    .app-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 30px;
    }
    
    .app-icon {
      width: 80px;
      height: 80px;
    }
    
    .launchpad-content {
      padding: 40px 20px;
    }
  }
</style>