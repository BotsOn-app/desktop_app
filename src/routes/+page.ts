const { pageSelector } = await import('$lib/functions/stores');


export const load = async () => {
	const { appDataDir} = await import('@tauri-apps/api/path');
	const { readTextFile, writeTextFile, exists } = await import('@tauri-apps/api/fs');

	pageSelector.update((n) => 0);

	const newAppDataDir = await appDataDir();

	const path: string = newAppDataDir + "bots\\data.json";

	if (!(await exists(path))) {
		await writeTextFile(path, '[]');
	}

	const json = JSON.parse(await readTextFile(path));
	return {
		bots: json,
		username: 'Nirbooze',
	};
};