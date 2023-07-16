<script lang="ts">
	import { pageSelector } from '$lib/functions/stores';

	export let iconName: string;
	export let selectorId: number;
	export let path: string;
</script>

<li>
	<a href={path} class="relative">
		<box-icon
			name={iconName}
			type={$pageSelector == selectorId ? 'solid' : 'regular'}
			size="md"
			color={$pageSelector == selectorId ? 'white' : 'gray'}
		/>
		{#if $pageSelector == selectorId}
			<div class="absolute bg-original-purple h-8 w-8 left-16 bottom-[8%] rounded-full blur-xl" />
		{/if}
	</a>
</li>
