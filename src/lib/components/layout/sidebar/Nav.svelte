<script lang="ts">
	import NavItem from '$lib/components/layout/sidebar/NavItem.svelte';

	interface MenuItem {
		title: string;
		link: string;
		iconClass: string;
	}

	interface Props {
		isToggle: boolean;
		onHover: boolean;
		menus: MenuItem[];
	}
	let { isToggle, onHover, menus }: Props = $props();
</script>

<ul class="flex flex-col gap-1 p-4 text-left transition-all duration-[0.4s] ease-in-out">
	{#each menus as { title, link, iconClass }}
		<NavItem {title} {link} {iconClass} {isToggle} {onHover} />
	{/each}
</ul>
