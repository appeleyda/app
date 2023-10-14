<script>
	import { supabase, self, trade } from '$lib/stores';
    import { dataset_dev } from 'svelte/internal';
	import { onMount  } from 'svelte';

	export let data;

	async function load () {
		const {data, error } = await $supabase.from('users').select().eq('username', data.slug);
		userdata = data[0];
		loaded = true;
	}

	let loaded = false;
	onMount(load);
</script>

<main>
	<h1><span style="color: var(--color-theme-1);">@{userdata.username}</span>'s profile</h1>
	{ #if loaded }
	<h3>Account created on {new Date(userdata.created).toLocaleString()}</h3>
			<h3>Successful trades: {userdata.trades}</h3>
			<h3>Rating: {userdata.rating}%</h3>
			{ :else }
			<div class="sideways">
					<img class="load" src={loading} alt="" />
					<p>Loading...<p>
				</div>
			{ /if }
</main>


<style>



	.sideways {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}
	</style>