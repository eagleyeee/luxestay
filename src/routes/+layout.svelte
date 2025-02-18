<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import Sidebar from '$lib/components/layout/sidebar/Sidebar.svelte';
	import Header from '$lib/components/header/Header.svelte';

	import '$lib/styles/app.css';

	let { children } = $props();

	let isToggleSidebar = $state(false);

	const toggleSidebar = () => {
		isToggleSidebar = !isToggleSidebar;
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
		rel="stylesheet"
	/>
	<title>LuxeStay - Where Value Meets Elegance</title>
</svelte:head>

<div class="bg-base-200 text-base-content flex h-screen flex-row">
	<Sidebar isToggle={isToggleSidebar} />
	<div class="flex-auto">
		<Header>
			{#snippet sidebarToggleButton()}
				<button
					onclick={toggleSidebar}
					class="btn btn-ghost btn-square text-neutral"
					aria-label="sidebar-toggle"
				>
					<span
						transition:fade
						class="{isToggleSidebar === true
							? 'icon-[ri--close-circle-line]'
							: 'icon-[ri--menu-4-fill]'} size-6"
					></span>
				</button>
			{/snippet}
			{#snippet pageTitle()}
				<h2 class="text-neutral text-xl font-bold capitalize">{page.url.pathname.slice(1)}</h2>
			{/snippet}
		</Header>

		<main class="p-6">
			{@render children()}
		</main>
	</div>
</div>
