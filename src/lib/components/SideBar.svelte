<script lang="ts">
	import 'boxicons';
	import SideBarItem from './SideBar/SideBarItem.svelte';

	let items = [
		{
			iconName: 'home-alt-2',
			path: '/',
		},
		{
			iconName: 'extension',
			path: '/extensions',
		},
		{
			iconName: 'cog',
			path: '/settings',
		},
	];
</script>

<!-- We need to rewrite everything and maybe use a list of component or three different component with a "selected" state -->
<aside
	class="bg-original-gray flex justify-center items-center h-screen w-24 overflow-hidden min-w-[6rem]"
>
	<ul class="flex flex-col h-40 justify-between items-center">
		{#each items as item, i}
			<SideBarItem iconName={item.iconName} path={item.path} selectorId={i} />
		{/each}
	</ul>
</aside>
