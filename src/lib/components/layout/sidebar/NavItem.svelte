<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title: string;
		link: string;
		iconClass: string;
		isToggle: boolean;
		onHover: boolean;
	}
	let { title, link, iconClass, isToggle, onHover }: Props = $props();
</script>

<li class="">
	<a href={link} aria-label={title} aria-current={page.url.pathname === link}>
		<div
			class="{page.url.pathname === link
				? '!bg-neutral !text-neutral-content font-semibold'
				: 'text-neutral'} flex {isToggle === true || onHover === true
				? 'flex-row gap-3'
				: ''} rounded-box hover:bg-base-200 border-base-100 hover:border-base-300 border-2 p-1.5"
		>
			<span class="{iconClass} size-6 text-center transition-all duration-[0.2s] ease-in-out"
			></span>
			<p
				class="{isToggle === true || onHover === true
					? ''
					: 'hidden'} font-semibold transition-all duration-[0.2s] ease-in-out"
			>
				{title}
			</p>
		</div>
	</a>
</li>
