<script>
	import { self, supabase } from '$lib/stores';
    import { onMount } from 'svelte';
	let confirmedloading = false;
	let verifyaccountloading = false;
	let verifydepositloading = false;

		let outgoing = [];
		let depositvalue = '';

	const update = async () => {
		const { data, error} = await $supabase.from('trades').select().eq('youusernumber', 1000)
		if (error) {
			console.error(error)
		}
		outgoing = [];
		console.log({ data })
		for (let i = 0; i < data.length; i++) {
			let t = {
				id: data[i].id,
				me: {
					user: {
						username: data[i].meuserusername,
						number: data[i].meusernumber,
						created: data[i].meusercreated,
						trades: data[i].meusertrades,
						rating: data[i].meuserrating
					},
					trading: data[i].metrading,
					value: data[i].mevalue,
					confirm: data[i].meconfirm,
				},
				you: {
					user: {
						username: data[i].youuserusername,
						number: data[i].youusernumber,
						created: data[i].youusercreated,
						trades: data[i].youusertrades,
						rating: data[i].youuserrating
					},
					trading: data[i].youtrading,
					value: data[i].youvalue,
					confirm: data[i].youconfirm
				},
				deposited: data[i].deposited,
				verified: data[i].verified,
			}
			outgoing.push(t);
		}
		outgoing = outgoing;
	}

	async function verify(i) {
		verifyaccountloading = true;
		i.verified = !i.verified;

		const {error} = await $supabase.from('trades').update({verified: i.verified}).eq('id', i.id);
		verifyaccountloading = false;
		if(error) {
		console.error(error);
		i.verified  =!i.verified;
		}
		verifyaccountloading = false;
	}

	async function deposit(i) {
		verifydepositloading = true;
		i.deposited = parseFloat(depositvalue);

		const {error} = await $supabase.from('trades').update({deposited: parseFloat(depositvalue)}).eq('id', i.id);

		verifydepositloading = false;
		if(error) {
		console.error(error);
		i.deposited = false;
		}
	}

	const confirm = async (i) => {
		confirmedloading = true;
		i.you.confirm = !i.you.confirm;

		const {error} = await $supabase.from('trades').update({youconfirm: i.you.confirm}).eq('id', i.id);
		confirmedloading = false;

		if(error) {
		console.error(error);
		i.you.confirm = !i.you.confirm;
		}
	}

	const del = async (i) => {
		const {error} = await $supabase.from('trades').delete().eq('id', i.id)
		if (error) {
			console.error(error);
		}
	}

	onMount(() => {setInterval(update, 1000); });
</script>

{ #if $self?.number == 1000 }
	<div>
		<h1>Admin panel</h1>
		{ #each outgoing as i }
		<div style="border: 2px solid var(--color-theme-1);">
			<h3>Trade with {i.me.user.username}#{i.me.user.number}:</h3>
			<div class="action">
			<button disabled='{verifyaccountloading}' style="" on:click={() => verify(i)}>Verify account</button>
			<input type="text" placeholder="deposit amount" bind:value={depositvalue}>
			<button disabled='{verifydepositloading}' on:click={() => deposit(i)}>Verify deposit</button>
			<button style="border: 3px solid lightgreen;"disabled='{confirmedloading || (!i.verified && i.you.confirm == false)}' on:click={() => confirm(i)}>CONFIRM TRADE</button>
			<button style="background: red; border: 2px solid red;" on:click={() => del(i)}>delete trade</button>
			</div>
		<h1>Confirmed?: {i.you.confirm}</h1>
		<h1>Account Verified?: {i.verified}</h1>
		<h1>Deposit Verified?: {i.deposited}</h1>
		</div>
		{ /each }
	</div>
{ :else }
	<main>
		<h1>You aren't authorized to access this page.</h1>
	</main>
{ /if }

<style>
	.action {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	input {
		padding: 20px;
		background: none;
		border: 3px solid var(--color-theme-1);
		font-size: 20px;
		color: var(--text-color-0);
		border-radius: 8px;
	}
</style>