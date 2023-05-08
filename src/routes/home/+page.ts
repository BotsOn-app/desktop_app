import type { Load } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const load: Load = async ({ fetch }) => {
	let res = await fetch(`${env.PUBLIC_API_URL}`);
	let data = await res.json(); // For now data is useless as we don't need to fetch anything but it acts like a placeholder
	return {
		author: {
			name: 'Saimogu',
			extensions: [],
		},
	};
};
