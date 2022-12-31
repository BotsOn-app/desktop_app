<script lang="ts">
	export const remove: boolean = true,
		info: boolean = true,
		navigate: boolean = true;
</script>

<button on:click class:remove class:info class:navigate />

<style>
	.remove {
		@apply bg-original-red;
	}
	.info {
		@apply bg-original-light-gray;
	}
	.navigate {
		@apply bg-original-purple;
	}
</style>
