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
		<div class="bg-neutral relative flex h-screen w-[65%] items-center justify-center align-middle">
			<img class="object-cover p-25" alt="auth-background" src={hotelHero} />
		</div>
		<div
			class="relative flex w-[35%] flex-col items-stretch justify-center px-12 py-8 md:px-24 lg:px-32"
		>
			<div class="flex justify-center">
				<img src={MainLogo} alt="Logo" class="w-72" />
			</div>

			{@render children()}
		</div>
	</div>
{/if}
