<script lang="ts">
	import MainLogo from '$lib/assets/luxestay.png';
	import hotelHero from '$lib/assets/images/hotel-hero.png';

	import Loader from '$lib/components/shared/Loader.svelte';

	let { children } = $props();

	let isPageLoaded = $state(false);

	$effect(() => {
		setTimeout(() => {
			isPageLoaded = true;
		}, 1500);
	});
</script>

{#if !isPageLoaded}
	<Loader />
{:else}
	<div class="bg-base-200 text-base-content flex h-screen w-full flex-row">
		<div class="hidden xl:flex bg-neutral relative h-screen w-full xl:w-[65%] items-center justify-center align-middle">
			<img class="object-cover p-25 h-screen" alt="auth-background" src={hotelHero} />
		</div>
		<div
			class="relative flex w-full xl:w-[35%] flex-col items-center xl:items-stretch justify-center py-8 xl:px-28"
		>
		
			<div class="flex justify-center">
				<img src={MainLogo} alt="Logo" class="w-72" />
			</div>

			{@render children()}
		</div>
	</div>
{/if}
