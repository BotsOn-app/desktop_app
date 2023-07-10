<script lang="ts">
	type ButtonStyle = 'danger' | 'info' | 'ok';
	let buttonStyleApplier: { [key: string]: string } = {
		danger: 'bg-original-red',
		info: 'bg-original-light-gray',
		ok: 'bg-original-purple',
	};

	export let buttonType: ButtonStyle;
	export let action: () => any;
</script>

<button
	on:click={action}
	class="flex justify-center items-center {buttonStyleApplier[
		buttonType
	]} h-12 w-12 rounded-xl hover:bg-opacity-50 transition ease-in-out"
>
	<slot />
</button>
