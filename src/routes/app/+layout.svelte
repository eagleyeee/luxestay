<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import Sidebar from '$lib/components/layout/sidebar/Sidebar.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Loader from '$lib/components/shared/Loader.svelte';

	let { children } = $props();

	let isToggleSidebar = $state(false);

	let isPageLoaded = $state(false);

	$effect(() => {
		setTimeout(() => {
			isPageLoaded = true;
		}, 1500);
	});

	const toggleSidebar = () => {
		isToggleSidebar = !isToggleSidebar;
	};
</script>

{#if !isPageLoaded}
	<Loader />
{:else}
	<div class="bg-base-200 text-base-content flex h-screen flex-row">
		<Sidebar isToggle={isToggleSidebar} />
		<div class="w-full flex-auto">
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
					<h2 class="text-neutral text-xl font-bold capitalize">{page.url.pathname.slice(5)}</h2>
				{/snippet}
			</Header>

			<main class="p-6">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
