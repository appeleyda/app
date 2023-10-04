import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { self } from '$lib/stores';

export const load = () => {
	if (!get(self)) {
		throw redirect(307, '/login');
	}
}