<script lang="ts">
	let display = '0';
	let currentValue = '0';
	let previousValue = '';
	let operator = '';
	let isVisible = true;
	
	// Window dragging state
	let isDragging = false;
	let position = { x: 80, y: 80 };
	let dragStart = { x: 0, y: 0 };
	
	// Start dragging - ignore if clicking controls
	const handleMouseDown = (e) => {
		if (e.target.closest('.window-controls')) return;
		isDragging = true;
		dragStart = { x: e.clientX - position.x, y: e.clientY - position.y };
	};
	
	// Update position while dragging
	const handleMouseMove = (e) => {
		if (!isDragging) return;
		position = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
	};
	
	// Handle button clicks
	const handleClick = (value: string) => {
		if (value >= '0' && value <= '9') {
			currentValue = currentValue === '0' ? value : currentValue + value;
		} else if (value === '.') {
			if (!currentValue.includes('.')) currentValue += '.';
		} else if (value === 'AC') {
			currentValue = '0';
			previousValue = '';
			operator = '';
		} else if (value === '+/−') {
			currentValue = String(parseFloat(currentValue) * -1);
		} else if (value === '%') {
			currentValue = String(parseFloat(currentValue) / 100);
		} else if (['+', '−', '×', '÷'].includes(value)) {
			if (previousValue && operator) calculate();
			previousValue = currentValue;
			operator = value;
			currentValue = '0';
		} else if (value === '=') {
			calculate();
			operator = '';
			previousValue = '';
		}
		display = currentValue;
	};
	
	// Perform calculation
	const calculate = () => {
		const prev = parseFloat(previousValue);
		const curr = parseFloat(currentValue);
		if (operator === '+') currentValue = String(prev + curr);
		else if (operator === '−') currentValue = String(prev - curr);
		else if (operator === '×') currentValue = String(prev * curr);
		else if (operator === '÷') currentValue = String(prev / curr);
	};
</script>

<!-- Global mouse event listeners for dragging -->
<svelte:window on:mousemove={handleMouseMove} on:mouseup={() => isDragging = false} />

{#if isVisible}
<div class="calculator-window" style="left: {position.x}px; top: {position.y}px;">
	<!-- Window header with macOS controls -->
	<div class="window-header" on:mousedown={handleMouseDown}>
		<div class="window-controls">
			<div class="control close" on:click={() => isVisible = false}></div>
			<div class="control minimize"></div>
			<div class="control maximize"></div>
		</div>
	</div>
	
	<div class="calculator-body">
		<!-- Display area -->
		<div class="display">{display}</div>
		
		<!-- Calculator buttons grid -->
		<div class="buttons">
			{#each ['AC', '+/−', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '='] as btn}
				<button 
					class="{btn >= '0' && btn <= '9' || btn === '.' ? 'number-btn' : ['+', '−', '×', '÷', '='].includes(btn) ? 'operator-btn' : 'function-btn'} {btn === '0' ? 'zero-btn' : ''}"
					on:click={() => handleClick(btn)}
				>
					{btn}
				</button>
			{/each}
		</div>
	</div>
</div>
{/if}

<style>
	.calculator-window {
		position: fixed;
		width: 248px;
		background: linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%);
		border-radius: 10px;
		box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
		user-select: none;
	}
	
	.window-header {
		cursor: grab;
		padding: 13px 0 0 11px;
		height: 40px;
	}
	
	.window-header:active { cursor: grabbing; }
	.window-controls { display: flex; gap: 8px; pointer-events: auto; }
	
	/* macOS-style window controls */
	.control {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		cursor: pointer;
		transition: opacity 0.2s;
	}
	
	.control:hover { opacity: 0.8; }
	.control:active { opacity: 0.6; }
	.control.close { background: #ff5f57; }
	.control.minimize { background: #febc2e; }
	.control.maximize { background: #28c840; }
	
	.calculator-body { padding: 0; }
	
	/* Display showing current value */
	.display {
		color: white;
		font-size: 68px;
		font-weight: 300;
		text-align: right;
		padding: 15px 20px 10px;
		min-height: 100px;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		line-height: 1;
		letter-spacing: -0.5px;
	}
	
	/* Button grid layout */
	.buttons {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
	}
	
	button {
		border: none;
		color: white;
		font-size: 28px;
		font-weight: 300;
		height: 62px;
		cursor: pointer;
		transition: brightness 0.1s;
		border-top: 0.5px solid rgba(0, 0, 0, 0.1);
		border-right: 0.5px solid rgba(0, 0, 0, 0.1);
	}
	
	button:active { filter: brightness(1.2); }
	.function-btn { background: #505050; font-size: 24px; }
	.number-btn { background: #5e5e5e; }
	.operator-btn { background: #ff9f0a; font-size: 32px; font-weight: 400; border-right: none; }
	
	/* Zero button spans 2 columns */
	.zero-btn {
		grid-column: span 2;
		text-align: left;
		padding-left: 30px;
		border-bottom-left-radius: 10px;
	}
	
	.operator-btn:last-child { border-bottom-right-radius: 10px; }
</style>