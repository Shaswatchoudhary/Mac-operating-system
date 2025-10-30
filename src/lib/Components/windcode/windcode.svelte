<script lang="ts">
	export let onClose = () => {};
	
	let isDragging = false;
	let position = { x: 100, y: 50 };
	let dragStart = { x: 0, y: 0 };
	let isMaximized = false;
	
	const GITHUB_REPO = 'Shaswatchoudhary/Mac-operating-system';
	const GITHUB_BRANCH = 'main';
	
	let fileTree = [];
	let currentFile = null;
	let fileContent = '';
	let loading = true;
	let error = null;
	let expandedFolders = new Set();
	
	const handleClose = () => {
		onClose();
	};
	
	const handleMaximize = () => {
		isMaximized = !isMaximized;
		if (isMaximized) {
			position = { x: 30, y: 30 };
		} else {
			position = { x: 100, y: 50 };
		}
	};
	
	const handleMouseDown = (e) => {
		if (isMaximized) return;
		if (e.target.closest('.window-controls') || e.target.closest('button')) return;
		isDragging = true;
		dragStart = {
			x: e.clientX - position.x,
			y: e.clientY - position.y
		};
	};
	
	const handleMouseMove = (e) => {
		if (!isDragging || isMaximized) return;
		position = {
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y
		};
	};
	
	const handleMouseUp = () => {
		isDragging = false;
	};
	
	async function fetchFileTree() {
		try {
			loading = true;
			error = null;
			
			const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`);
			
			if (!response.ok) {
				throw new Error(`Failed to fetch repository: ${response.status}`);
			}
			
			const data = await response.json();
			
			if (!data.tree || data.tree.length === 0) {
				throw new Error('Repository is empty or branch not found');
			}
			
			fileTree = buildFileTree(data.tree);
			loading = false;
			
			const readme = data.tree.find(item => 
				(item.path.toLowerCase() === 'readme.md' || 
				 item.path.toLowerCase() === 'readme.txt') && 
				item.type === 'blob'
			);
			if (readme) {
				await openFile(readme.path, readme.sha);
			}
		} catch (err) {
			console.error('Error fetching repository:', err);
			error = err.message;
			loading = false;
		}
	}
	
	function buildFileTree(items) {
		const tree = [];
		const folderMap = {};
		
		items.forEach(item => {
			if (item.type === 'tree') {
				folderMap[item.path] = {
					name: item.path.split('/').pop(),
					path: item.path,
					type: 'tree',
					children: []
				};
			}
		});
		
		items.forEach(item => {
			const parts = item.path.split('/');
			const fileName = parts[parts.length - 1];
			
			if (parts.length === 1) {
				if (item.type === 'tree') {
					tree.push(folderMap[item.path]);
				} else {
					tree.push({
						name: fileName,
						path: item.path,
						type: item.type,
						sha: item.sha
					});
				}
			} else {
				const parentPath = parts.slice(0, -1).join('/');
				const parent = folderMap[parentPath];
				
				if (parent) {
					if (item.type === 'tree') {
						parent.children.push(folderMap[item.path]);
					} else {
						parent.children.push({
							name: fileName,
							path: item.path,
							type: item.type,
							sha: item.sha
						});
					}
				}
			}
		});
		
		const sortItems = (items) => {
			items.sort((a, b) => {
				if (a.type === 'tree' && b.type !== 'tree') return -1;
				if (a.type !== 'tree' && b.type === 'tree') return 1;
				return a.name.localeCompare(b.name);
			});
			items.forEach(item => {
				if (item.children) {
					sortItems(item.children);
				}
			});
		};
		
		sortItems(tree);
		return tree;
	}
	
	async function openFile(path, sha) {
		try {
			currentFile = { path, sha };
			fileContent = 'Loading...';
			
			const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/blobs/${sha}`);
			
			if (!response.ok) {
				throw new Error(`Failed to load file: ${response.status}`);
			}
			
			const data = await response.json();
			
			try {
				fileContent = atob(data.content);
			} catch (e) {
				fileContent = 'Binary file - cannot display';
			}
		} catch (err) {
			console.error('Error loading file:', err);
			fileContent = `Error loading file: ${err.message}`;
		}
	}
	
	function toggleFolder(folderPath) {
		if (expandedFolders.has(folderPath)) {
			expandedFolders.delete(folderPath);
		} else {
			expandedFolders.add(folderPath);
		}
		expandedFolders = expandedFolders;
	}
	
	function getFileIcon(name) {
		const ext = name.split('.').pop().toLowerCase();
		const icons = {
			'js': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#F7DF1E"/><path d="M7.5 16.5c0 1 .5 1.5 1.5 1.5s1.5-.5 1.5-1.5v-5h2v5c0 2-1 3-3 3s-3-1-3-3v-5h2v5zm9-5h-2v5c0 .5.5 1 1 1h1c1.5 0 2.5-1 2.5-2.5v-1c0-1.5-1-2.5-2.5-2.5zm0 4h-1v-3h1c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1z" fill="#000"/></svg>`,
			'ts': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#3178C6"/><path d="M13 8h2v1h-2v7h-2v-7h-2v-1h4zm3 0h4v1h-1.5v7h-1v-7h-1.5v-1z" fill="white"/></svg>`,
			'jsx': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#61DAFB"/><circle cx="12" cy="12" r="2" fill="#000"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#000" fill="none"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#000" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#000" fill="none" transform="rotate(120 12 12)"/></svg>`,
			'tsx': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#61DAFB"/><circle cx="12" cy="12" r="2" fill="#000"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#000" fill="none"/></svg>`,
			'html': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 3l1.5 16.5 7.5 2 7.5-2L21 3H3z" fill="#E34F26"/><path d="M12 5v14l5-1.5L18 5h-6z" fill="#EF652A"/></svg>`,
			'css': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 3l1.5 16.5 7.5 2 7.5-2L21 3H3z" fill="#1572B6"/><path d="M12 5v14l5-1.5L18 5h-6z" fill="#33A9DC"/></svg>`,
			'json': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#555"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-family="monospace">{}</text></svg>`,
			'md': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#083FA1"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="14" font-family="monospace">M↓</text></svg>`,
			'py': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#3776AB"/><path d="M8 8h8v8H8z" fill="#FFD43B"/></svg>`,
			'svelte': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#FF3E00"/></svg>`,
			'folder': `<svg viewBox="0 0 24 24" fill="none"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#90CAF9"/></svg>`,
			'folder-open': `<svg viewBox="0 0 24 24" fill="none"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#64B5F6"/></svg>`,
			'default': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#666"/><path d="M6 2h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#999"/></svg>`
		};
		return icons[ext] || icons['default'];
	}
	
	function getFolderIcon(isOpen) {
		return isOpen ? getFileIcon('folder-open') : getFileIcon('folder');
	}
	
	function getLanguage(filename) {
		const ext = filename.split('.').pop().toLowerCase();
		const languages = {
			'js': 'javascript', 'ts': 'typescript', 'jsx': 'javascript',
			'tsx': 'typescript', 'html': 'html', 'css': 'css',
			'json': 'json', 'md': 'markdown', 'py': 'python',
			'svelte': 'svelte'
		};
		return languages[ext] || 'text';
	}
	
	fetchFileTree();
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div 
	class="vscode-window {isMaximized ? 'maximized' : ''}" 
	style="{isMaximized ? '' : `left: ${position.x}px; top: ${position.y}px;`}"
>
	<div 
		class="window-header" 
		on:mousedown={handleMouseDown}
		on:keydown={() => {}}
		role="toolbar"
		aria-label="Window controls and title bar"
		tabindex="-1"
	>
		<div class="window-controls">
			<button class="control close" on:click={handleClose} aria-label="Close window"></button>
			<button class="control minimize" aria-label="Minimize window"></button>
			<button class="control maximize" on:click={handleMaximize} aria-label="Maximize window"></button>
		</div>
		
		<div class="header-title">
			<span class="repo-icon">{@html getFileIcon('folder')}</span>
			<span>{GITHUB_REPO.split('/')[1]}</span>
		</div>
	</div>
	
	<div class="vscode-content">
		<div class="sidebar">
			<div class="sidebar-header">
				<div class="sidebar-title">EXPLORER</div>
			</div>
			
			<div class="file-tree">
				{#if loading}
					<div class="loading">Loading repository...</div>
				{:else if error}
					<div class="error">Error: {error}</div>
				{:else}
					<div class="tree-section">
						<div class="section-header">{GITHUB_REPO.split('/')[1].toUpperCase()}</div>
						{#each fileTree as item}
							{#if item.type === 'tree'}
								<div class="tree-item">
									<button 
										class="folder-item" 
										on:click={() => toggleFolder(item.path)}
										aria-expanded={expandedFolders.has(item.path)}
									>
										<span class="folder-icon">{@html getFolderIcon(expandedFolders.has(item.path))}</span>
										<span>{item.name}</span>
									</button>
									{#if expandedFolders.has(item.path) && item.children}
										<div class="folder-contents">
											{#each item.children as child}
												{#if child.type === 'tree'}
													<button 
														class="folder-item nested" 
														on:click={() => toggleFolder(child.path)}
														aria-expanded={expandedFolders.has(child.path)}
													>
														<span class="folder-icon">{@html getFolderIcon(expandedFolders.has(child.path))}</span>
														<span>{child.name}</span>
													</button>
													{#if expandedFolders.has(child.path) && child.children}
														<div class="folder-contents">
															{#each child.children as subChild}
																<button 
																	class="file-item {currentFile?.path === subChild.path ? 'active' : ''}"
																	on:click={() => openFile(subChild.path, subChild.sha)}
																	aria-label="Open {subChild.name}"
																>
																	<span class="file-icon">{@html getFileIcon(subChild.name)}</span>
																	<span>{subChild.name}</span>
																</button>
															{/each}
														</div>
													{/if}
												{:else}
													<button 
														class="file-item {currentFile?.path === child.path ? 'active' : ''}"
														on:click={() => openFile(child.path, child.sha)}
														aria-label="Open {child.name}"
													>
														<span class="file-icon">{@html getFileIcon(child.name)}</span>
														<span>{child.name}</span>
													</button>
												{/if}
											{/each}
										</div>
									{/if}
								</div>
							{:else}
								<button 
									class="file-item {currentFile?.path === item.path ? 'active' : ''}"
									on:click={() => openFile(item.path, item.sha)}
									aria-label="Open {item.name}"
								>
									<span class="file-icon">{@html getFileIcon(item.name)}</span>
									<span>{item.name}</span>
								</button>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>
		
		<div class="editor-area">
			{#if currentFile}
				<div class="tab-bar">
					<div class="tab active">
						<span class="tab-icon">{@html getFileIcon(currentFile.path)}</span>
						<span class="tab-name">{currentFile.path}</span>
					</div>
				</div>
				
				<div class="editor">
					<div class="code-container">
						<pre class="line-numbers">{#each fileContent.split('\n') as _, i}{i + 1}
{/each}</pre>
						<pre class="code-content"><code>{fileContent}</code></pre>
					</div>
				</div>
				
				<div class="status-bar">
					<div class="status-left">
						<span>🔗 {GITHUB_BRANCH}</span>
						<span>✓ {fileTree.length} files</span>
					</div>
					<div class="status-right">
						<span>{getLanguage(currentFile.path)}</span>
						<span>UTF-8</span>
						<span>LF</span>
						<span>Ln 1, Col 1</span>
					</div>
				</div>
			{:else}
				<div class="welcome-screen">
					<h1>Welcome to VS Code</h1>
					<p>Repository: <strong>{GITHUB_REPO}</strong></p>
					<p>Select a file from the explorer to start viewing</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.vscode-window {
		position: fixed;
		width: 1200px;
		height: 700px;
		background: #1e1e1e;
		border-radius: 12px;
		box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
		overflow: hidden;
		font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
		user-select: none;
		display: flex;
		flex-direction: column;
	}
	
	.vscode-window.maximized {
		top: 30px !important;
		left: 50% !important;
		transform: translateX(-50%);
		width: calc(100vw - 60px);
		height: calc(100vh - 90px);
	}
	
	.window-header {
		background: #323233;
		cursor: move;
		cursor: grab;
		padding: 12px 20px;
		display: flex;
		align-items: center;
		gap: 16px;
		border-bottom: 1px solid #252526;
		flex-shrink: 0;
	}
	
	.window-header:active {
		cursor: grabbing;
	}
	
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
	
	.control:hover {
		opacity: 0.8;
	}
	
	.control.close {
		background: #ff5f57;
	}
	
	.control.minimize {
		background: #febc2e;
	}
	
	.control.maximize {
		background: #28c840;
	}
	
	.header-title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		color: #cccccc;
		font-size: 13px;
	}
	
	.repo-icon {
		width: 16px;
		height: 16px;
		display: inline-flex;
	}
	
	.vscode-content {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	
	.sidebar {
		width: 280px;
		background: #252526;
		border-right: 1px solid #1e1e1e;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	.sidebar-header {
		padding: 12px 16px;
		border-bottom: 1px solid #1e1e1e;
	}
	
	.sidebar-title {
		color: #cccccc;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.5px;
	}
	
	.file-tree {
		flex: 1;
		overflow-y: auto;
		padding: 8px 0;
	}
	
	.loading, .error {
		color: #cccccc;
		padding: 16px;
		font-size: 12px;
	}
	
	.error {
		color: #f48771;
	}
	
	.tree-section {
		padding: 0 8px;
	}
	
	.section-header {
		color: #cccccc;
		font-size: 11px;
		font-weight: 600;
		padding: 8px 12px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.tree-item {
		margin: 2px 0;
	}
	
	.folder-item, .file-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 12px;
		color: #cccccc;
		font-size: 13px;
		cursor: pointer;
		border-radius: 4px;
		transition: background 0.2s;
		user-select: none;
		width: 100%;
		text-align: left;
		border: none;
		background: transparent;
		font-family: inherit;
	}
	
	.folder-item.nested {
		margin-left: 0;
	}
	
	.folder-item:hover, .file-item:hover {
		background: #2a2d2e;
	}
	
	.file-item.active {
		background: #37373d;
	}
	
	.folder-icon, .file-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	
	.folder-icon :global(svg), .file-icon :global(svg) {
		width: 16px;
		height: 16px;
	}
	
	.folder-contents {
		margin-left: 16px;
	}
	
	.editor-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: #1e1e1e;
	}
	
	.tab-bar {
		display: flex;
		background: #252526;
		border-bottom: 1px solid #1e1e1e;
	}
	
	.tab {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		background: #1e1e1e;
		border-right: 1px solid #252526;
		color: #cccccc;
		font-size: 13px;
		cursor: pointer;
		max-width: 300px;
	}
	
	.tab.active {
		border-top: 2px solid #007acc;
	}
	
	.tab-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		display: inline-flex;
	}
	
	.tab-icon :global(svg) {
		width: 16px;
		height: 16px;
	}
	
	.tab-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.editor {
		flex: 1;
		overflow: auto;
		background: #1e1e1e;
	}
	
	.code-container {
		display: flex;
		padding: 16px 0;
		min-height: 100%;
	}
	
	.line-numbers {
		color: #858585;
		text-align: right;
		padding: 0 16px;
		user-select: none;
		font-size: 13px;
		line-height: 1.6;
		min-width: 50px;
	}
	
	.code-content {
		flex: 1;
		color: #d4d4d4;
		font-size: 13px;
		line-height: 1.6;
		padding-right: 16px;
		white-space: pre;
		overflow-x: auto;
	}
	
	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 16px;
		background: #007acc;
		color: white;
		font-size: 12px;
	}
	
	.status-left, .status-right {
		display: flex;
		gap: 16px;
	}
	
	.welcome-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #cccccc;
		text-align: center;
		padding: 40px;
	}
	
	.welcome-screen h1 {
		font-size: 32px;
		margin-bottom: 16px;
		font-weight: 300;
	}
	
	.welcome-screen p {
		font-size: 14px;
		margin: 8px 0;
		color: #858585;
	}
	
	.welcome-screen strong {
		color: #cccccc;
	}
	
	.file-tree::-webkit-scrollbar,
	.editor::-webkit-scrollbar,
	.code-content::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	
	.file-tree::-webkit-scrollbar-track,
	.editor::-webkit-scrollbar-track,
	.code-content::-webkit-scrollbar-track {
		background: #1e1e1e;
	}
	
	.file-tree::-webkit-scrollbar-thumb,
	.editor::-webkit-scrollbar-thumb,
	.code-content::-webkit-scrollbar-thumb {
		background: #424242;
		border-radius: 5px;
	}
	
	.file-tree::-webkit-scrollbar-thumb:hover,
	.editor::-webkit-scrollbar-thumb:hover,
	.code-content::-webkit-scrollbar-thumb:hover {
		background: #4e4e4e;
	}
</style>