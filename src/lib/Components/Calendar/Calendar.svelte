<script lang="ts">
	import { onMount } from 'svelte';
	
	export let onClose = () => {};
	
	let isDragging = false;
	let position = { x: 150, y: 50 };
	let dragStart = { x: 0, y: 0 };
	let currentView = 'Month';
	
	const handleClose = () => {
		onClose();
	};
	
	const handleMouseDown = (e) => {
		if (e.target.closest('.window-controls') || e.target.closest('button')) return;
		isDragging = true;
		dragStart = {
			x: e.clientX - position.x,
			y: e.clientY - position.y
		};
	};
	
	const handleMouseMove = (e) => {
		if (!isDragging) return;
		position = {
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y
		};
	};
	
	const handleMouseUp = () => {
		isDragging = false;
	};
	
	// Get current date - updates in real-time
	let now = new Date();
	let currentMonth = now.getMonth();
	let currentYear = now.getFullYear();
	let today = now.getDate();
	let currentDay = now.getDay();
	
	// Update time every second for real-time
	setInterval(() => {
		now = new Date();
		today = now.getDate();
		currentDay = now.getDay();
	}, 1000);
	
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];
	
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	
	// Empty events array - no dummy data
	const events = [];
	
	function getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}
	
	function getFirstDayOfMonth(month, year) {
		return new Date(year, month, 1).getDay();
	}
	
	function generateCalendar() {
		const daysInMonth = getDaysInMonth(currentMonth, currentYear);
		const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
		const calendar = [];
		
		// Previous month days
		const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
		for (let i = firstDay - 1; i >= 0; i--) {
			calendar.push({ day: prevMonthDays - i, isCurrentMonth: false });
		}
		
		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			calendar.push({ day: i, isCurrentMonth: true });
		}
		
		// Next month days to fill grid
		const remainingDays = 42 - calendar.length;
		for (let i = 1; i <= remainingDays; i++) {
			calendar.push({ day: i, isCurrentMonth: false });
		}
		
		return calendar;
	}
	
	function getEventsForDay(day) {
		return events.filter(e => e.date === day);
	}
	
	function goToPreviousMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}
	
	function goToNextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}
	
	function goToToday() {
		const now = new Date();
		currentMonth = now.getMonth();
		currentYear = now.getFullYear();
	}
	
	$: calendarDays = generateCalendar();
	$: isCurrentMonthAndYear = currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
	
	onMount(() => {
		if (typeof window.lucide === 'object') {
			window.lucide.createIcons();
		}
		
		const interval = setInterval(() => {
			if (typeof window.lucide === 'object') {
				window.lucide.createIcons();
			}
		}, 100);
		
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<script src="https://unpkg.com/lucide@latest"></script>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="calendar-window" style="left: {position.x}px; top: {position.y}px;">
	<!-- Window Header -->
	<div class="window-header" on:mousedown={handleMouseDown}>
		<div class="window-controls">
			<div class="control close" on:click={handleClose}></div>
			<div class="control minimize"></div>
			<div class="control maximize"></div>
		</div>
		
		<div class="header-actions">
			<button class="icon-btn">
				<i data-lucide="calendar-days" style="width: 16px; height: 16px;"></i>
			</button>
			<button class="icon-btn">
				<i data-lucide="inbox" style="width: 16px; height: 16px;"></i>
			</button>
			<button class="icon-btn plus-btn">
				<i data-lucide="plus" style="width: 18px; height: 18px;"></i>
			</button>
		</div>
		
		<div class="view-switcher">
			<button class={currentView === 'Day' ? 'active' : ''} on:click={() => currentView = 'Day'}>Day</button>
			<button class={currentView === 'Week' ? 'active' : ''} on:click={() => currentView = 'Week'}>Week</button>
			<button class={currentView === 'Month' ? 'active' : ''} on:click={() => currentView = 'Month'}>Month</button>
			<button class={currentView === 'Year' ? 'active' : ''} on:click={() => currentView = 'Year'}>Year</button>
		</div>
		
		<div class="search-btn">
			<button class="icon-btn">
				<i data-lucide="search" style="width: 16px; height: 16px;"></i>
			</button>
		</div>
	</div>
	
	<!-- Calendar Content -->
	<div class="calendar-content">
		<div class="calendar-header">
			<h1>{monthNames[currentMonth]} {currentYear}</h1>
			<div class="navigation">
				<button class="nav-btn" on:click={goToPreviousMonth}>
					<i data-lucide="chevron-left" style="width: 20px; height: 20px;"></i>
				</button>
				<button class="today-btn" on:click={goToToday}>Today</button>
				<button class="nav-btn" on:click={goToNextMonth}>
					<i data-lucide="chevron-right" style="width: 20px; height: 20px;"></i>
				</button>
			</div>
		</div>
		
		<div class="calendar-grid">
			<!-- Day names -->
			{#each dayNames as dayName}
				<div class="day-name">{dayName}</div>
			{/each}
			
			<!-- Calendar days -->
			{#each calendarDays as { day, isCurrentMonth }, i}
				<div class="calendar-day {isCurrentMonth ? 'current-month' : 'other-month'} {isCurrentMonth && day === today && isCurrentMonthAndYear ? 'today' : ''}">
					<div class="day-number">{day}</div>
					<div class="events">
						{#each getEventsForDay(day) as event, idx}
							{#if idx < 2}
								<div class="event {event.color} {event.type}">
									{#if event.type === 'calendar'}
										<i data-lucide="calendar" class="event-icon"></i>
									{:else if event.type === 'reminder'}
										<i data-lucide="bell" class="event-icon"></i>
									{:else if event.type === 'holiday'}
										<i data-lucide="party-popper" class="event-icon"></i>
									{/if}
									<span class="event-title">{event.title}</span>
								</div>
							{/if}
						{/each}
						{#if getEventsForDay(day).length > 2}
							<div class="more-events">+{getEventsForDay(day).length - 2} more</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.calendar-window {
		position: fixed;
		width: 1300px;
		height: 800px;
		background: #1c1c1e;
		border-radius: 12px;
		box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
		user-select: none;
		display: flex;
		flex-direction: column;
	}
	
	.window-header {
		background: rgba(30, 30, 30, 0.95);
		backdrop-filter: blur(40px);
		cursor: move;
		cursor: grab;
		padding: 12px 20px;
		display: flex;
		align-items: center;
		gap: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
	
	.header-actions {
		display: flex;
		gap: 8px;
	}
	
	.icon-btn {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 6px 10px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
		transition: background 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.15);
	}
	
	.plus-btn {
		padding: 6px 8px;
	}
	
	.view-switcher {
		flex: 1;
		display: flex;
		justify-content: center;
		gap: 4px;
		background: rgba(255, 255, 255, 0.05);
		padding: 4px;
		border-radius: 8px;
		max-width: 400px;
		margin: 0 auto;
	}
	
	.view-switcher button {
		background: transparent;
		border: none;
		color: #999;
		padding: 6px 20px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		transition: all 0.2s;
	}
	
	.view-switcher button.active {
		background: rgba(255, 255, 255, 0.15);
		color: white;
	}
	
	.view-switcher button:hover {
		color: white;
	}
	
	.search-btn {
		margin-left: auto;
	}
	
	.calendar-content {
		flex: 1;
		padding: 30px;
		overflow-y: auto;
		background: #1c1c1e;
	}
	
	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}
	
	.calendar-header h1 {
		color: white;
		font-size: 32px;
		font-weight: 600;
		margin: 0;
	}
	
	.navigation {
		display: flex;
		gap: 12px;
		align-items: center;
	}
	
	.nav-btn, .today-btn {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 8px 16px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 18px;
		transition: background 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.nav-btn {
		padding: 8px 12px;
	}
	
	.nav-btn:hover, .today-btn:hover {
		background: rgba(255, 255, 255, 0.15);
	}
	
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}
	
	.day-name {
		background: #2c2c2e;
		color: #999;
		text-align: center;
		padding: 12px;
		font-size: 13px;
		font-weight: 600;
	}
	
	.calendar-day {
		background: #2c2c2e;
		min-height: 100px;
		padding: 8px;
		position: relative;
	}
	
	.calendar-day.other-month {
		opacity: 0.3;
	}
	
	.calendar-day.today {
		background: #3a3a3c;
	}
	
	.calendar-day.today .day-number {
		background: #ff3b30;
		color: white;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}
	
	.day-number {
		color: white;
		font-size: 14px;
		margin-bottom: 6px;
	}
	
	.events {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	
	.event {
		font-size: 11px;
		padding: 3px 6px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		gap: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.event.green {
		background: rgba(52, 199, 89, 0.3);
		color: #34c759;
	}
	
	.event.blue {
		background: rgba(10, 132, 255, 0.3);
		color: #0a84ff;
	}
	
	.event.cyan {
		background: rgba(100, 210, 255, 0.3);
		color: #64d2ff;
	}
	
	.event-icon {
		width: 10px;
		height: 10px;
		flex-shrink: 0;
	}
	
	.event-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.more-events {
		color: #999;
		font-size: 10px;
		margin-top: 2px;
		padding-left: 6px;
	}
	
	/* Scrollbar Styling */
	.calendar-content::-webkit-scrollbar {
		width: 8px;
	}
	
	.calendar-content::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.calendar-content::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 4px;
	}
	
	.calendar-content::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}
</style>