import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { trade } from '$lib/stores';

export const load = ({ params }) => {
	try {
	if (get(trade).me.user.username != params.slug && get(trade).you.user.username != params.slug) {
		throw redirect(307, '/trade');
	}
} catch {
	throw redirect(307, '/trade');
}

    return params;
}