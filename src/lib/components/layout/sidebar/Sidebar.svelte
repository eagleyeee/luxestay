<script lang="ts">
	import { fade } from 'svelte/transition';

	import { enhance } from '$app/forms';

	import Nav from '$lib/components/layout/sidebar/Nav.svelte';

	import SqaureLogo from '$lib/assets/luxestay-square.png';
	import MainLogo from '$lib/assets/luxestay.png';

	interface Props {
		isToggle: boolean;
	}

	let logoutLoading = $state(false);

	let { isToggle }: Props = $props();

	let onHover = $state(false);

	const hoverOver = () => {
		onHover = true;
	};

	const hoverOut = () => {
		onHover = false;
	};

	let menus = [
		{ title: 'Dashboard', link: '/app/dashboard', iconClass: 'icon-[ri--dashboard-line]' },
		{
			title: 'Reservations',
			link: '/app/reservations',
			iconClass: 'icon-[ri--bookmark-3-line]'
		},
		{
			title: 'Guests',
			link: '/app/guests',
			iconClass: 'icon-[ri--user-5-line]'
		},
		{ title: 'Rooms', link: '/app/rooms', iconClass: 'icon-[ri--home-5-line]' }
	];
</script>

<nav
	class="{isToggle === true || onHover === true
		? 'w-58'
		: 'w-[75px]'} bg-base-100 border-base-300 z-1000 flex h-screen flex-col justify-between border-r-2 transition-all delay-[-0.25s] duration-[0.5s] ease-in-out"
	onmouseover={hoverOver}
	onfocus={hoverOver}
	onmouseout={hoverOut}
	onblur={hoverOut}
>
	<div class="relative flex flex-col gap-4">
		<div class="p-4">
			<a href="/">
				<img
					src={isToggle === true || onHover === true ? MainLogo : SqaureLogo}
					alt="logo"
					class="h-10 transition-all duration-[0.4s] ease-in-out"
				/>
			</a>
		</div>
		<Nav {isToggle} {onHover} {menus} />
	</div>
	<div
		class="border-base-300 flex h-18 flex-row items-center justify-between border-t-2 p-4 text-center"
	>
		<a href="/" class="flex w-full flex-row gap-2">
			<div class="avatar avatar-placeholder size-10">
				<!--
				<div class="rounded-box size-10">
					<img
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						alt="user-avatar"
					/>
				</div>
				-->

				<div class="bg-neutral text-neutral-content rounded-box size-10">
					<span>M</span>
				</div>
			</div>
			<div
				class="flex flex-col gap-0 {isToggle === true || onHover === true
					? ''
					: 'hidden'} transition-all duration-[0.2s] ease-in-out"
			>
				<p class="text-md">Mathew</p>
				<span class="text-left text-xs">Manager</span>
			</div>
		</a>

		<form
			action="/app/logout"
			method="POST"
			use:enhance={() => {
				logoutLoading = true;
				return async ({ update }) => {
					await update();
					logoutLoading = false;
				};
			}}
		>
			<button
				class="btn btn-ghost btn-square text-neutral transition-all duration-[0.2s] ease-in-out {isToggle ===
					true || onHover === true
					? ''
					: 'hidden'}"
				aria-label="logout"
				type="submit"
			>
				<span
					transition:fade
					class="{logoutLoading === true
						? 'icon-[ri--loader-3-line] animate-spin'
						: 'icon-[ri--logout-circle-r-line]'} size-6"
				></span>
			</button>
		</form>
	</div>
</nav>

<!--
<ul class="flex flex-col p-5">
		<li>
			<!-class="flex flex-row justify-between"->
			<a href="/">
				{#if isToggle === true || onHover === true}
					<div class="flex flex-row gap-2 transition-all duration-[0.4s] ease-in-out">
						<span class="icon-[ri--dashboard-line] size-5"></span>
						<p class="transition-all duration-[0.4s] ease-in-out">Dashboard</p>
					</div>
				{:else}
					<span class="icon-[ri--dashboard-line] size-5"></span>
				{/if}
			</a>
		</li>
	</ul>



<div
					class="{isToggle === true
						? 'flex flex-row gap-2'
						: onHover === true
							? 'flex flex-row gap-2'
							: ''} "
				>
					<span class="icon-[ri--dashboard-line] size-5"></span>
					{#if isToggle === true}
						<p class="transition-all duration-[0.4s] ease-in-out">Dashboard</p>
					{:else if onHover === true}
						<p class="transition-all duration-[0.4s] ease-in-out">Dashboard</p>
					{/if}
				</div>-->
