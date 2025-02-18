<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		sidebarToggleButton: Snippet;
		pageTitle: Snippet;
	}

	let { sidebarToggleButton, pageTitle }: Props = $props();
</script>

<header class="navbar z-999 h-[72px] p-4">
	<div class="navbar-start flex flex-row gap-3">
		{@render sidebarToggleButton()}
		{@render pageTitle()}
	</div>
	<div class="navbar-end gap-3">
		<!--
		<button class="btn btn-ghost btn-square text-neutral" aria-label="search">
			<span class="icon-[ri--search-line] size-6"></span>
		</button>
		-->
		<button class="btn btn-ghost btn-square text-neutral" aria-label="notification">
			<span class="icon-[ri--notification-3-line] size-6"></span>
		</button>
		<a href="/" class="avatar avatar-placeholder size-10">
			<!--
			<div class="rounded-box size-10">
				<img
					src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
					alt="user-avatar"
				/>
			</div>
			-->
			<div class="bg-neutral text-neutral-content rounded-box size-10">
				<span>SY</span>
			</div>
		</a>
	</div>
</header>
