<script>
	import { supabase, self, trade } from '$lib/stores';
    import { dataset_dev } from 'svelte/internal';
	import { onMount  } from 'svelte';
	import loading from "$lib/images/loading.svg";

	export let data;
	let youme;
	let userdata;

	function load () {
		if (data.slug == $trade.you.user.username) youme = $trade.you.user;
		else {
			youme= $trade.me.user
		}
		loaded = true;
	}

	let loaded = false;
	onMount(load);
</script>

<main>
	<h1><span style="color: var(--color-theme-1);">@{data.slug}</span>'s profile</h1>
	{ #if loaded }
	<h3>Account created on {new Date(youme.created).toLocaleString()}</h3>
			<h3>Successful trades: {youme.trades}</h3>
			<h3>Rating: {youme.rating}%</h3>
	{ #if youme.trades > 50}
		<h1>This user has <span style="color: lightgreen;">more than 50 trades</span>. It's probably safe to trade with them.</h1>
	{ :else }
		<h1>This user has less than 50 trades. Be careful when trading with them.</h1>
	{ /if }
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