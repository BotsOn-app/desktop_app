<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import ActionButton from '../utils/ActionButton.svelte';
	import Text from '../utils/Text.svelte';
	import { FastAverageColor } from 'fast-average-color';

	export let bot: any;

	const getDominantColor = async () => {
		const fac = new FastAverageColor();

		let _color = await fac.getColorAsync(bot.avatarUrl);
		return _color.hex;
	};

	const deleteBot = () => invoke('delete_bot', { token: bot.token })

	
</script>

<div
	class="w-full p-3 flex justify-between items-center bg-original-gray rounded-xl overflow-hidden mb-4"
>
	<div class="flex flex-row justify-center items-center">
		<!-- Bot picture -->
		{#await getDominantColor() then color}
			<div class="relative">
				<div class="absolute blur-2xl h-12 w-12 top-0 left-0" style="background-color: {color};" />
				<img src={bot.avatarUrl} alt="" class="relative h-12 w-12 bg-red-600 mr-4 rounded-full z-10" />
			</div>
		{/await}
		<!-- Bot Name -->
		<Text class="font-bold">{bot.name}</Text>
	</div>
	<div class="flex flex-row justify-around items-center w-44">
		<ActionButton buttonType="danger" action={() => deleteBot()}>
			<box-icon type="solid" name="trash" color="white" />
		</ActionButton>
		<ActionButton buttonType="info" action={() => {}}>
			<box-icon name="info-circle" type="solid" color="white" />
		</ActionButton>
		<ActionButton buttonType="ok" action={() => {}}>
			<box-icon name="right-arrow-alt" color="white" />
		</ActionButton>
	</div>
</div>
