<script lang="ts">
	import SideBar from '$lib/components/SideBar.svelte';
	import '../app.css';
</script>

<div class="flex flex-row bg-original-dark">
	<SideBar />
	<slot />
</div>
