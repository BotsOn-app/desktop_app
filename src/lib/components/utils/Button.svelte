<script lang="ts">
	export let primary: boolean = false,
		secondary: boolean = false,
		lightPrimary: boolean = false,
		lightSecondary: boolean = false;
	export const href: string = '';
</script>

{#if href.length}
	<button
		class="text-white shadow-lg font-prompt p-3 pl-10 pr-10 rounded-xl mr-12 hover:bg-opacity-40 transition ease-in-out"
		class:primary
		class:secondary
		class:lightPrimary
		class:lightSecondary
	>
		<a {href} class="text-2xl">
			<slot />
		</a>
	</button>
{:else}
	<button
		class="text-white shadow-lg font-prompt p-3 pl-10 pr-10 rounded-xl mr-12 hover:bg-opacity-40 transition ease-in-out"
		class:primary
		class:secondary
		class:lightPrimary
		class:lightSecondary
	>
		<p class="text-2xl">
			<slot />
		</p>
	</button>
{/if}

<style>
	.primary {
		@apply bg-original-purple;
	}

	.secondary {
		@apply bg-original-gray;
	}

	.lightPrimary {
		@apply bg-original-light-purple;
	}

	.lightSecondary {
		@apply bg-original-light-gray;
	}
</style>
