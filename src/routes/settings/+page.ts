import type { Load } from '@sveltejs/kit';
import { pageSelector } from '$lib/functions/stores';

export const load: Load = async ({ fetch }) => {
	pageSelector.update((n) => 2);
};
