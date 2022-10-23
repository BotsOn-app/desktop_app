import { redirect } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
	let userSessionTemporary: boolean = false;
	if (userSessionTemporary) throw redirect(302, '/home');
};
