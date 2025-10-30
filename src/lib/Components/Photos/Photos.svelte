<script lang="ts">
	import { onMount } from 'svelte';
	
	export let onClose = () => {};
	
	// Window dragging state
	let isDragging = false;
	let position = { x: 100, y: 50 };
	let dragStart = { x: 0, y: 0 };
	
	// Start dragging - ignore if clicking controls or buttons
	const handleMouseDown = (e: MouseEvent) => {
		if ((e.target as HTMLElement).closest('.window-controls') || (e.target as HTMLElement).closest('button')) return;
		isDragging = true;
		dragStart = { x: e.clientX - position.x, y: e.clientY - position.y };
	};
	
	// Update position while dragging
	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;
		position = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
	};
	
	// Sample photos data - reduced to 8 items
	const photos = [
		{ id: 1, url: 'https://picsum.photos/200/300?random=1', duration: '0:21' },
		{ id: 2, url: 'https://picsum.photos/200/300?random=2', isRaw: true },
		{ id: 3, url: 'https://picsum.photos/200/300?random=3', isRaw: true },
		{ id: 4, url: 'https://picsum.photos/200/300?random=4', duration: '0:24' },
		{ id: 5, url: 'https://picsum.photos/200/300?random=5', isRaw: true },
		{ id: 6, url: 'https://picsum.photos/200/300?random=6', isRaw: true },
		{ id: 7, url: 'https://picsum.photos/200/300?random=7', isRaw: true },
		{ id: 8, url: 'https://picsum.photos/200/300?random=8', isRaw: true }
	];
	
	// Sidebar menu items
	const sidebarItems = [
		{ icon: 'library', label: 'Library', active: true },
		{ icon: 'folder', label: 'Collections', active: false },
		{ icon: 'heart', label: 'Favourites', active: false },
		{ icon: 'video', label: 'Videos', active: false },
		{ icon: 'camera', label: 'Screenshots', active: false }
	];
	
	let activeItem = 'Library';
	
	// Initialize Lucide icons
	onMount(() => {
		const interval = setInterval(() => {
			// @ts-ignore - lucide is loaded from CDN
			if (typeof window.lucide === 'object') {
				// @ts-ignore
				window.lucide.createIcons();
			}
		}, 100);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<script src="https://unpkg.com/lucide@latest"></script>
</svelte:head>

<!-- Global mouse event listeners for dragging -->
<svelte:window on:mousemove={handleMouseMove} on:mouseup={() => isDragging = false} />

<div class="photos-window" style="left: {position.x}px; top: {position.y}px;">
	<!-- Window Header -->
	<div class="window-header" on:mousedown={handleMouseDown} role="none">
		<div class="window-controls">
			<button class="control close" on:click={onClose} aria-label="Close"></button>
			<button class="control minimize" aria-label="Minimize"></button>
			<button class="control maximize" aria-label="Maximize"></button>
		</div>
		
		<div class="header-title">
			<h1>Library</h1>
			<p>19 Sep 2023–1 Sep 2024</p>
		</div>
		
		<div class="header-actions">
			<button class="icon-btn" aria-label="Zoom out">
				<i data-lucide="minus" style="width: 16px; height: 16px;"></i>
			</button>
			<button class="icon-btn" aria-label="Zoom in">
				<i data-lucide="plus" style="width: 16px; height: 16px;"></i>
			</button>
			<button class="dropdown-btn" aria-label="Filter photos">
				All Photos 
				<i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
			</button>
			<button class="icon-btn" aria-label="Search">
				<i data-lucide="search" style="width: 18px; height: 18px;"></i>
			</button>
		</div>
	</div>
	
	<!-- Main Content -->
	<div class="photos-content">
		<!-- Sidebar -->
		<nav class="sidebar" aria-label="Photo categories">
			{#each sidebarItems as item}
				<button 
					class="sidebar-item {item.label === activeItem ? 'active' : ''}"
					on:click={() => activeItem = item.label}
					aria-label="{item.label}"
					aria-current={item.label === activeItem ? 'page' : undefined}
				>
					<i data-lucide="{item.icon}" class="icon"></i>
					<span>{item.label}</span>
				</button>
			{/each}
		</nav>
		
		<!-- Photo Grid -->
		<main class="photo-grid" aria-label="Photo gallery">
			{#each photos as photo}
				<button class="photo-item" aria-label="Photo {photo.id}{photo.isRaw ? ', RAW format' : ''}{photo.duration ? ', Video ' + photo.duration : ''}">
					<img src={photo.url} alt="" />
					{#if photo.isRaw}
						<div class="badge raw" aria-hidden="true">RAW</div>
					{/if}
					{#if photo.duration}
						<div class="badge duration" aria-hidden="true">
							<i data-lucide="play" style="width: 10px; height: 10px;"></i>
							{photo.duration}
						</div>
					{/if}
				</button>
			{/each}
		</main>
	</div>
</div>

<style>
	.photos-window {
		position: fixed;
		width: 1200px;
		height: 700px;
		background: #1e1e1e;
		border-radius: 12px;
		box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
		user-select: none;
		display: flex;
		flex-direction: column;
		z-index: 100;
	}
	
	.window-header {
		background: rgba(30, 30, 30, 0.95);
		backdrop-filter: blur(40px);
		cursor: grab;
		padding: 12px 20px;
		display: flex;
		align-items: center;
		gap: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.window-header:active { cursor: grabbing; }
	.window-controls { display: flex; gap: 8px; }
	
	/* macOS-style window controls */
	.control {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		cursor: pointer;
		transition: opacity 0.2s;
		border: none;
		padding: 0;
	}
	
	.control:hover { opacity: 0.8; }
	.control.close { background: #ff5f57; }
	.control.minimize { background: #febc2e; }
	.control.maximize { background: #28c840; }
	
	.header-title {
		flex: 1;
		text-align: center;
		color: white;
	}
	
	.header-title h1 { font-size: 13px; font-weight: 600; margin: 0; }
	.header-title p { font-size: 11px; color: #999; margin: 2px 0 0 0; }
	
	.header-actions { display: flex; gap: 8px; align-items: center; }
	
	.icon-btn, .dropdown-btn {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 6px 12px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 13px;
		transition: background 0.2s;
		display: flex;
		align-items: center;
		gap: 4px;
	}
	
	.icon-btn:hover, .dropdown-btn:hover { background: rgba(255, 255, 255, 0.15); }
	
	.photos-content { display: flex; flex: 1; overflow: hidden; }
	
	/* Sidebar styling */
	.sidebar {
		width: 240px;
		background: rgba(30, 30, 30, 0.6);
		backdrop-filter: blur(40px);
		padding: 16px 0;
		overflow-y: auto;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.sidebar-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 6px 20px;
		color: white;
		font-size: 13px;
		cursor: pointer;
		transition: background 0.2s;
		width: 100%;
		border: none;
		background: transparent;
		text-align: left;
	}
	
	.sidebar-item:hover { background: rgba(255, 255, 255, 0.1); }
	.sidebar-item.active { background: rgba(255, 60, 120, 0.3); color: #ff3c78; }
	.sidebar-item .icon { width: 18px; height: 18px; flex-shrink: 0; }
	
	/* Photo grid layout */
	.photo-grid {
		flex: 1;
		padding: 20px;
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 8px;
		align-content: start;
	}
	
	.photo-item {
		position: relative;
		aspect-ratio: 3/4;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		transition: transform 0.2s;
		border: none;
		padding: 0;
		background: transparent;
	}
	
	.photo-item:hover { transform: scale(1.02); }
	.photo-item:focus {
		outline: 2px solid #ff3c78;
		outline-offset: 2px;
	}
	.photo-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
	
	/* Badge styling for RAW and duration */
	.badge {
		position: absolute;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);
		color: white;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 4px;
		pointer-events: none;
	}
	
	.badge.raw { top: 8px; left: 8px; }
	.badge.duration { bottom: 8px; left: 8px; }
	
	/* Scrollbar styling */
	.sidebar::-webkit-scrollbar, .photo-grid::-webkit-scrollbar { width: 8px; }
	.sidebar::-webkit-scrollbar-track, .photo-grid::-webkit-scrollbar-track { background: transparent; }
	.sidebar::-webkit-scrollbar-thumb, .photo-grid::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
	.sidebar::-webkit-scrollbar-thumb:hover, .photo-grid::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
</style>