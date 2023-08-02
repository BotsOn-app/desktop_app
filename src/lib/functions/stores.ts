import { writable } from 'svelte/store';

export const pageSelector = writable<number>(0);

// TODO: Make the list of bots a writable