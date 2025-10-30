<script lang="ts">
	import { onMount } from 'svelte';
	
	export let onClose = () => {};
	
	// Window dragging state
	let isDragging = false;
	let position = { x: 120, y: 60 };
	let dragStart = { x: 0, y: 0 };
	let isMaximized = false;
	let activeTab = 'Discover';
	
	// Toggle window maximized state and adjust position
	const handleMaximize = () => {
		isMaximized = !isMaximized;
		position = isMaximized ? { x: 30, y: 30 } : { x: 120, y: 60 };
	};
	
	// Start dragging window - only if not maximized and not clicking controls
	const handleMouseDown = (e: MouseEvent) => {
		if (isMaximized || (e.target as HTMLElement).closest('.window-controls') || (e.target as HTMLElement).closest('button')) return;
		isDragging = true;
		dragStart = { x: e.clientX - position.x, y: e.clientY - position.y };
	};
	
	// Update window position while dragging
	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging || isMaximized) return;
		position = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
	};
	
	// App data
	const featuredApps = [
		{ id: 1, name: 'Final Cut Pro', developer: 'Apple', price: '$299.99', rating: 4.5, reviews: '12K', icon: 'clapperboard', banner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', description: 'Revolutionary video editing' },
		{ id: 2, name: 'Logic Pro', developer: 'Apple', price: '$199.99', rating: 4.8, reviews: '8.5K', icon: 'music', banner: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', description: 'Professional music production' },
		{ id: 3, name: 'Affinity Designer', developer: 'Serif Labs', price: '$54.99', rating: 4.7, reviews: '15K', icon: 'paintbrush', banner: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', description: 'Professional graphic design' }
	];
	
	const popularApps = [
		{ name: 'Slack', developer: 'Slack Technologies', price: 'Free', rating: 4.6, icon: 'hash' },
		{ name: 'Notion', developer: 'Notion Labs', price: 'Free', rating: 4.8, icon: 'sticky-note' },
		{ name: 'Figma', developer: 'Figma Inc.', price: 'Free', rating: 4.9, icon: 'figma' },
		{ name: 'VS Code', developer: 'Microsoft', price: 'Free', rating: 4.8, icon: 'terminal' }
	];
	
	const categories = [
		{ name: 'Business', icon: 'briefcase', color: '#007aff' },
		{ name: 'Developer Tools', icon: 'code-xml', color: '#5856d6' },
		{ name: 'Graphics & Design', icon: 'paintbrush-2', color: '#ff2d55' },
		{ name: 'Music', icon: 'audio-lines', color: '#ff3b30' },
		{ name: 'Productivity', icon: 'list-checks', color: '#007aff' },
		{ name: 'Games', icon: 'joystick', color: '#af52de' }
	];
	
	// Initialize Lucide icons after component mounts
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

<!-- Listen for mouse events globally for smooth dragging -->
<svelte:window on:mousemove={handleMouseMove} on:mouseup={() => isDragging = false} />

<div class="appstore-window {isMaximized ? 'maximized' : ''}" style="{isMaximized ? '' : `left: ${position.x}px; top: ${position.y}px;`}">
	<!-- Window Header with macOS-style controls -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="window-header" on:mousedown={handleMouseDown} role="none">
		<div class="window-controls">
			<button class="control close" on:click={onClose} aria-label="Close"></button>
			<button class="control minimize" aria-label="Minimize"></button>
			<button class="control maximize" on:click={handleMaximize} aria-label="Maximize"></button>
		</div>
		<div class="header-title">
			<i data-lucide="package" style="width: 18px; height: 18px;"></i>
			<span>App Store</span>
		</div>
	</div>
	
	<div class="appstore-content">
		<!-- Sidebar Navigation -->
		<nav class="sidebar" aria-label="App categories">
			{#each ['Discover', 'Arcade', 'Create', 'Work', 'Categories', 'Updates'] as tab}
				<button class="sidebar-item {activeTab === tab ? 'active' : ''}" on:click={() => activeTab = tab}>
					<i data-lucide="{tab === 'Discover' ? 'compass' : tab === 'Arcade' ? 'gamepad-2' : tab === 'Create' ? 'palette' : tab === 'Work' ? 'briefcase' : tab === 'Categories' ? 'grid-3x3' : 'refresh-cw'}" class="sidebar-icon"></i>
					<span>{tab}</span>
				</button>
			{/each}
		</nav>
		
		<!-- Main Content Area -->
		<main class="main-content">
			<!-- Search Bar -->
			<div class="search-bar">
				<div class="search-input-wrapper">
					<i data-lucide="search" style="width: 18px; height: 18px; color: #86868b;"></i>
					<input type="text" placeholder="Search for apps, games, and more..." />
				</div>
			</div>
			
			<!-- Scrollable Content -->
			<div class="content-scroll">
				{#if activeTab === 'Discover'}
					<!-- Featured Apps Section -->
					<section class="section">
						<h2 class="section-title">Featured</h2>
						<div class="featured-grid">
							{#each featuredApps as app}
								<div 
									class="featured-card" 
									role="button"
									tabindex="0"
									aria-label="View {app.name}"
									on:click={() => console.log('Clicked:', app.name)}
									on:keydown={(e) => e.key === 'Enter' && console.log('Clicked:', app.name)}
								>
									<div class="app-icon">
										<i data-lucide="{app.icon}" style="width: 32px; height: 32px;"></i>
									</div>
									<div class="featured-info">
										<h3>{app.name}</h3>
										<p class="developer">{app.developer}</p>
										<p class="description">{app.description}</p>
										<div class="featured-footer">
											<div class="rating">
												<span class="stars">
													<i data-lucide="star" style="width: 14px; height: 14px; fill: #ff9500; color: #ff9500;"></i> 
													{app.rating}
												</span>
												<span class="reviews">{app.reviews}</span>
											</div>
											<button 
												class="get-btn" 
												on:click|stopPropagation={() => console.log('Get:', app.name)}
											>
												{app.price}
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>
					
					<!-- Popular Apps List -->
					<section class="section">
						<h2 class="section-title">Popular Apps</h2>
						<div class="app-list">
							{#each popularApps as app}
								<div 
									class="app-item"
									role="button"
									tabindex="0"
									aria-label="View {app.name}"
									on:click={() => console.log('Clicked:', app.name)}
									on:keydown={(e) => e.key === 'Enter' && console.log('Clicked:', app.name)}
								>
									<div class="app-icon-small">
										<i data-lucide="{app.icon}"></i>
									</div>
									<div class="app-info">
										<h4>{app.name}</h4>
										<p class="developer">{app.developer}</p>
									</div>
									<div class="app-actions">
										<div class="rating-small">
											<i data-lucide="star" style="width: 12px; height: 12px; fill: #ff9500; color: #ff9500;"></i> 
											{app.rating}
										</div>
										<button 
											class="get-btn-small"
											on:click|stopPropagation={() => console.log('Get:', app.name)}
										>
											{app.price}
										</button>
									</div>
								</div>
							{/each}
						</div>
					</section>
					
				{:else if activeTab === 'Categories'}
					<!-- Categories Grid -->
					<section class="section">
						<h2 class="section-title">All Categories</h2>
						<div class="categories-grid">
							{#each categories as category}
								<button 
									class="category-card" 
									style="--category-color: {category.color}" 
									aria-label="Browse {category.name}"
									on:click={() => console.log('Category:', category.name)}
								>
									<div class="category-icon">
										<i data-lucide="{category.icon}"></i>
									</div>
									<div class="category-name">{category.name}</div>
								</button>
							{/each}
						</div>
					</section>
					
				{:else}
					<!-- Empty State for other tabs -->
					<div class="empty-state">
						<i data-lucide="package" class="empty-icon"></i>
						<h3>{activeTab}</h3>
						<p>Explore amazing apps and games</p>
					</div>
				{/if}
			</div>
		</main>
	</div>
</div>

<style>
	.appstore-window {
		position: fixed;
		width: 1100px;
		height: 700px;
		background: #f5f5f7;
		border-radius: 12px;
		box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
		user-select: none;
		display: flex;
		flex-direction: column;
		z-index: 100;
	}
	
	/* Maximized state - full viewport */
	.appstore-window.maximized {
		top: 30px !important;
		left: 50% !important;
		transform: translateX(-50%);
		width: calc(100vw - 60px);
		height: calc(100vh - 90px);
	}
	
	.window-header {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(40px);
		cursor: grab;
		padding: 12px 20px;
		display: flex;
		align-items: center;
		gap: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.window-header:active { cursor: grabbing; }
	
	/* macOS-style window controls */
	.window-controls {
		display: flex;
		gap: 8px;
	}
	
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
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		color: #1d1d1f;
		font-size: 14px;
		font-weight: 600;
	}
	
	.appstore-content {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	
	/* Sidebar styling */
	.sidebar {
		width: 220px;
		background: rgba(255, 255, 255, 0.6);
		backdrop-filter: blur(40px);
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		padding: 20px 12px;
		overflow-y: auto;
	}
	
	.sidebar-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		margin-bottom: 4px;
		color: #1d1d1f;
		font-size: 14px;
		background: transparent;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		text-align: left;
	}
	
	.sidebar-item:hover { background: rgba(0, 0, 0, 0.05); }
	.sidebar-item.active { background: #007aff; color: white; }
	.sidebar-icon { width: 18px; height: 18px; flex-shrink: 0; }
	
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	.search-bar {
		padding: 20px 30px;
		background: white;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.search-input-wrapper {
		display: flex;
		align-items: center;
		gap: 10px;
		background: #f5f5f7;
		border-radius: 10px;
		padding: 10px 16px;
	}
	
	.search-input-wrapper input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 14px;
		color: #1d1d1f;
	}
	
	.search-input-wrapper input::placeholder { color: #86868b; }
	
	.content-scroll {
		flex: 1;
		overflow-y: auto;
		padding: 30px;
	}
	
	.section { margin-bottom: 50px; }
	.section-title { font-size: 24px; font-weight: 700; color: #1d1d1f; margin-bottom: 20px; }
	
	/* Featured apps grid */
	.featured-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 24px;
	}
	
	.featured-card {
		background: white;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s, box-shadow 0.3s;
		cursor: pointer;
		border: none;
		padding: 0;
		text-align: left;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.featured-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}
	
	.app-icon {
		height: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}
	
	.featured-info { padding: 20px; }
	.featured-info h3 { font-size: 20px; font-weight: 700; color: #1d1d1f; margin-bottom: 4px; }
	.developer { font-size: 13px; color: #86868b; margin-bottom: 8px; }
	.description { font-size: 14px; color: #1d1d1f; margin-bottom: 16px; line-height: 1.4; }
	.featured-footer { display: flex; justify-content: space-between; align-items: center; }
	.rating { display: flex; flex-direction: column; gap: 2px; }
	.stars { font-size: 13px; color: #1d1d1f; display: flex; align-items: center; gap: 4px; }
	.reviews { font-size: 12px; color: #86868b; }
	
	.get-btn {
		background: #007aff;
		color: white;
		border: none;
		padding: 8px 20px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}
	
	.get-btn:hover { background: #0051d5; }
	
	/* App list styling */
	.app-list { display: flex; flex-direction: column; gap: 16px; }
	
	.app-item {
		display: flex;
		align-items: center;
		gap: 16px;
		background: white;
		padding: 16px;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		transition: transform 0.2s;
		cursor: pointer;
		border: none;
		text-align: left;
		width: 100%;
	}
	
	.app-item:hover { transform: translateX(4px); }
	
	.app-icon-small {
		width: 50px;
		height: 50px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 12px;
		color: white;
	}
	
	.app-icon-small i { width: 28px; height: 28px; }
	.app-info { flex: 1; }
	.app-info h4 { font-size: 16px; font-weight: 600; color: #1d1d1f; margin-bottom: 4px; }
	.app-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
	.rating-small { font-size: 13px; color: #86868b; display: flex; align-items: center; gap: 4px; }
	
	.get-btn-small {
		background: #007aff;
		color: white;
		border: none;
		padding: 6px 16px;
		border-radius: 16px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
		min-width: 70px;
	}
	
	.get-btn-small:hover { background: #0051d5; }
	
	/* Categories grid */
	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 20px;
	}
	
	.category-card {
		background: white;
		padding: 30px 20px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		cursor: pointer;
		transition: all 0.3s;
		border-top: 4px solid var(--category-color);
		border-left: none;
		border-right: none;
		border-bottom: none;
		width: 100%;
	}
	
	.category-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}
	
	.category-icon { margin-bottom: 12px; color: var(--category-color); }
	.category-icon i { width: 50px; height: 50px; }
	.category-name { font-size: 14px; font-weight: 600; color: #1d1d1f; }
	
	/* Empty state */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 400px;
		text-align: center;
	}
	
	.empty-icon { width: 80px; height: 80px; opacity: 0.3; color: #86868b; margin-bottom: 20px; }
	.empty-state h3 { font-size: 28px; font-weight: 700; color: #1d1d1f; margin-bottom: 8px; }
	.empty-state p { font-size: 16px; color: #86868b; }
	
	/* Scrollbar styling */
	.content-scroll::-webkit-scrollbar, .sidebar::-webkit-scrollbar { width: 8px; }
	.content-scroll::-webkit-scrollbar-track, .sidebar::-webkit-scrollbar-track { background: transparent; }
	.content-scroll::-webkit-scrollbar-thumb, .sidebar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 4px; }
	.content-scroll::-webkit-scrollbar-thumb:hover, .sidebar::-webkit-scrollbar-hover { background: rgba(0, 0, 0, 0.3); }
</style>