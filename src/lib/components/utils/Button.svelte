<script lang="ts">
	type ButtonStyle = 'primary' | 'secondary' | 'lightPrimary' | 'lightSecondary';
	let styleMap: { [key: string]: string } = {
		primary: 'bg-original-purple',
		secondary: 'bg-original-gray',
		lightPrimary: 'bg-original-light-purple',
		lightSecondary: 'bg-original-light-gray',
	};

	export let action: () => any;
	export let style: ButtonStyle;
</script>

<button
	class="text-white font-bold shadow-lg font-prompt p-3 pl-10 pr-10 rounded-xl mr-12 hover:bg-opacity-40 transition ease-in-out text-2xl {styleMap[
		style
	]} flex justify-center items-center gap-1.5"
	on:click={action}
>
	<slot />
</button>
