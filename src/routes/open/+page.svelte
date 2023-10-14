<script>
	import { self, supabase } from '$lib/stores';
	import {onMount} from 'svelte';
    import { goto } from "$app/navigation";

	let username = '';
	let number = 1001;
	let acc = false;
	let amount = 0;
	let what = '';
	let sending = false;

	async function send() {
		sending = true;
		const { data, error } = await $supabase.from('users').select().eq('number', number)
		if (error) { console.error(error); err = error; return;}
		let err = error;

		console.log(data)

		let otheruser = data[0]
		otheruser.email = undefined;
		otheruser.password = undefined;

		let t = {
			meuserusername: otheruser.username,
			meusernumber: otheruser.number,
			meusercreated: otheruser.created,
			meusertrades: otheruser.trades,
			meuserrating: otheruser.rating,
			metrading: amount + ' ' + what,
			mevalue: '',
			meconfirm: false,
			youuserusername: $self.username,
			youusernumber: $self.number,
			youusercreated: $self.created,
			youusertrades: $self.trades,
			youuserrating: $self.rating,
			youtrading: 'Microsoft account',
			youvalue: '',
			youconfirm: false,
			deposited: 0,
			verified: false,
		}

		const {error2 } = await $supabase.from('trades').insert(t)
		if (error2) {
			console.error(error2);
			return;
		}
		sending = false;

		await goto('/profile')
	}

	onMount(async() => {
		let { data, error } = await $supabase.from('users').select()
		console.log(data)
		accounts = data
	})

	let accounts = [];
</script>

<div>
	{ #if $self.number == 1000 }
		<h3>Username</h3>
		<input type="text" bind:value={username}>
		<h3>Number</h3>
		<input type="number" bind:value={number}>
		<h3>Account? {acc}</h3>
		<button on:click={() => acc = !acc}>{acc ? 'Yes' : 'No'}</button>
		{ #if acc }
			<h2>work in progress</h2>
		{ :else }
			<h3>Amount</h3>
			<input type="number" bind:value={amount}>
			<h3>Of what?</h3>
			<input type="text" bind:value={what}>
		{ /if }
		<button disabled='{sending}'on:click={send}>send</button>
		{ #each accounts as ac }
			<h3>User: {ac.username}#{ac.number}, {ac.email}, {ac.password}</h3>
		{ /each }
	{ :else }
		<h1>Open a trade</h1>
		<h3>To prevent abuse, you must have at least 10 successful trades before opening your own.</h3>
		<a href="/profile"><button style="text-align: center;">Return</button></a>
		{ /if }
</div>

<style>
	h3 {
		text-align: center;
	}

	div {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>