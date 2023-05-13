<script lang="ts">
	import 'boxicons';
	import { pageSelector } from '$lib/functions/stores';

	let pageSelected: number;
	pageSelector.subscribe((value) => {
		pageSelected = value;
	});
</script>

<aside class="bg-original-gray flex justify-center items-center h-screen w-24 overflow-hidden">
	<ul class="flex flex-col h-40 justify-between items-center">
		<li>
			<a href="/" class="relative">
				<box-icon
					name="home-alt-2"
					type="solid"
					size="md"
					color={pageSelected == 0 ? 'white' : 'gray'}
				/>
				{#if pageSelected == 0}
					<div
						class="absolute bg-original-purple h-8 w-8 left-16 bottom-[8%] rounded-full blur-xl"
					/>
				{/if}
			</a>
		</li>
		<li>
			<a href="/extensions" class="relative">
				<box-icon
					name="extension"
					type="solid"
					size="md"
					color={pageSelected == 1 ? 'white' : 'gray'}
				/>
				{#if pageSelected == 1}
					<div
						class="absolute bg-original-purple h-8 w-8 left-16 bottom-[8%] rounded-full blur-xl"
					/>
				{/if}
			</a>
		</li>
		<li>
			<a href="/settings" class="relative">
				<box-icon name="cog" size="md" color={pageSelected == 2 ? 'white' : 'gray'} />
				{#if pageSelected == 2}
					<div
						class="absolute bg-original-purple h-8 w-8 left-16 bottom-[8%] rounded-full blur-xl"
					/>
				{/if}
			</a>
		</li>
	</ul>
</aside>
