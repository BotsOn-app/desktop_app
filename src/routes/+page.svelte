<script lang="ts">
	import BotCard from '$lib/components/home/BotCard.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import Text from '$lib/components/utils/Text.svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { getClient, ResponseType } from '@tauri-apps/api/http';

	export let data;

	let bots = data.bots


	const openNewBotDialog = async () => {

		
	};


	// We get an error here : this is totally normal. We can't make the fetch request as the provided token and clientId are bullshit.
	const handleForm = async (token: string, clientId: string) => {
		let client = await getClient();

		let response = await client.get<any>(`https://discord.com/api/v10/users/${clientId}`, {
			headers: {"Authorization": `Bot ${token.trim()}`},
			responseType: ResponseType.JSON
		});

		let bot = { token: token, clientId: clientId, name: response.data.username, avatarUrl: `https://cdn.discordapp.com/avatars/${clientId}/${response.data.avatar}.png?size=256` }
		
		// TODO: Need to handle error in a better way than just alerting it
		invoke('create_bot', bot).then((v) => bots = v).catch((e) => alert(e));
	};


</script> 

<!-- Kinda like the homepage -->
<main class="w-full p-16 ">
	<div>
		<Text class="text-4xl font-bold mb-2">Bonjour {data.username} 👋</Text>
		<Text class="text-xl mb-8">Sélectionnez votre bot :</Text>
	</div>
	<div class="mb-12">
		{#each bots as bot}
			<BotCard {bot} />
		{:else}
			<!-- TODO: Yea also need to handle when there is no bots :kappa: -->
			<p>You are doomed</p>
		{/each}
	</div>
	<!-- TODO: Issue with arrow that should be fatter and isn't aligned with the rest of the text -->
	<Button style="primary" action={() => handleForm("bot_token", "client_id")}>
		Ajoutez un bot <box-icon size="md" name="right-arrow-alt" color="white" />
	</Button>
</main>
