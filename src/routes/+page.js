import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { self } from '$lib/stores';

export const load = () => {
	if (get(self)) {
		throw redirect(307, '/profile');
	} else {
		throw redirect(307, '/login')
	}
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
