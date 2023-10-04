import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { self } from '$lib/stores';

export const load = () => {
	if (get(self)?.number == 1000) {
		throw redirect(307, '/profile');
	}
}