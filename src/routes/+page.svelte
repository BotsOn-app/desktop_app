<script>
	import BotCard from '$lib/components/home/BotCard.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import Text from '$lib/components/utils/Text.svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	export let data;

	const openNewBotDialog = () => {
		invoke('create_bot', { token: 'data', clientId: 'data', guildId: 'data' });
	};
</script>

<!-- Kinda like the homepage -->
<main class="w-full p-16 ">
	<div>
		<Text class="text-4xl font-bold mb-2">Bonjour {data.username} 👋</Text>
		<Text class="text-xl mb-8">Sélectionnez votre bot :</Text>
	</div>
	<div class="mb-12">
		{#each data.bots as bot}
			<BotCard imgUrl={bot.imgUrl} name={bot.name} />
		{/each}
	</div>
	<!-- Issue with arrow that should be fatter and isn't aligned with the rest of the text -->
	<Button style="primary" action={() => openNewBotDialog()}>
		Ajoutez un bot <box-icon size="md" name="right-arrow-alt" color="white" />
	</Button>
</main>
