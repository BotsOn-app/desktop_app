import { pageSelector } from '$lib/functions/stores';
import { appDataDir, resolveResource } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs'

export const load = async () => {
	pageSelector.update((n) => 0);

	const newAppDataDir = await appDataDir();

	const path: string = newAppDataDir + "bots\\data.json"
	const json = JSON.parse(await readTextFile(path));
	return {
		bots: json,
		username: 'Nirbooze',
	};
};
