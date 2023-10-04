import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { trade } from '$lib/stores';

export const load = () => {
	if (!get(trade).me) {
		throw redirect(307, '/profile');
	}
}