import { pageSelector } from '$lib/functions/stores';

export const load = async () => pageSelector.update((n) => 0);
