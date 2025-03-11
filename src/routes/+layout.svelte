<script lang="ts">
	import '$lib/styles/app.css';

	import { goto } from '$app/navigation';

	import Loader from '$lib/components/shared/Loader.svelte';

	import { invalidate } from '$app/navigation';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	let isPageLoaded = $state(false);

	$effect(() => {
		setTimeout(() => {
			isPageLoaded = true;
		}, 1500);
	});

	$effect(() => {
		/*
		const { data } = supabase.auth.onAuthStateChange(async (_, newSession) => {
			const { data, error } = await supabase.auth.getUser();

			if (error || !data.user) {
				invalidate('supabase:auth');
				return;
			}

			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
		*/
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				setTimeout(() => {
					goto('/auth/login', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
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

{#if !isPageLoaded}
	<Loader />
{:else}
	{@render children()}
{/if}
