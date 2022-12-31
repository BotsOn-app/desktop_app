<script lang="ts">
	let className = '';
	export { className as class };
</script>

<p class="font-prompt text-white {className}">
	<slot />
</p>
