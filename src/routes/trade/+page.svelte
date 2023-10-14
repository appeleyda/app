<script>
	import { self, trade, supabase } from '$lib/stores';
    import { goto } from "$app/navigation";
    import { onMount } from 'svelte';
  import Null from '../Null.svelte';
	import copy from '$lib/images/copy.svg'
	import loading from '$lib/images/loading.svg'

	let me = $self.username;
	let you = $trade.you.user.username;

	$: confMe = $trade?.me?.confirm;
	$: confYou = $trade?.you?.confirm

	async function gettrade() {
		const { data, error } = await $supabase.from('trades').select().eq('id', $trade.id)
		let t = data[0]
		let u = {
			user: {
			username: t.youuserusername,
			number: t.youusernumber,
			created: t.youusercreated,
			trades: t.youusertrades,
			rating: t.youuserrating
			},
			trading: t.youtrading,
			value: t.youvalue,
			confirm: t.youconfirm
		}
		$trade.you = u;
		$trade.deposited = t.deposited
		$trade.verified = t.verified
	}

	$: if ($trade.me.confirm == true && $trade.you.confirm == true) {
		goto('/trade/done')
	}

	let caddress = 'Loading address...'

	const confirmtrade = () =>{
		if (confMe == 0) {
			confMe = true;
			$trade.me.confirm = true;
			$trade.me = $trade.me;

		} else {
			confMe = false;
			$trade.me.confirm = false;
			$trade.me = $trade.me;
		}
	}

	const settrade = async () => {
		const { error } = await $supabase.from('trades').update({
			meconfirm: $trade.me.confirm
		}).eq('meusernumber', $self.number)

		if (error ) console.error(error)
	}

	$: $trade.me, settrade();

	const setaddress = async () => {
		const { data, error } = await $supabase.from('address').select()
	
		if (error) {
			console.error(error);
		}
		
		data.sort((a, b) => a.inserted_at - b.inserted_at);

		caddress = data[data.length - 1].address;
	}

	onMount(async () => {
		setInterval(gettrade, 1000)
		await setaddress()});
</script>

<svelte:head>
	<title>Trading with @{you}</title>
	<meta name="description" content="TradeUp Instance" />
</svelte:head>

<div class="everything">
	{ #if me }
		<div class="info">
			<h1>You're currently trading with <a href="/trade/info/{you}"><span style="color: var(--color-theme-1);">@{you}</span></a>:</h1>
			<h3>Your <span style="color: var(--color-theme-1);">{$trade?.me?.trading}</span> for their <span style="color: var(--color-theme-1);">{$trade.you.trading}</span>.</h3>
			<h3>Be sure to read our <a href="/safety">important information and tips</a> before trading</h3>
		</div>
		<div class="trade">
			{ #if $trade?.me?.trading != 'account' }
			<div class="me">
				<h1><span>@{$self.username}</span></h1>
				<h2><span style="color: {confMe ? 'lightgreen' : 'red'};">asdf {confMe ? 'Confirmed' : 'Unconfirmed'}</span></h2>
				<h3>This trade is for <span style="color: var(--color-theme-1);">{$trade.me.trading}</span>.</h3>
				<h3>Copy this address to deposit into escrow:</h3>
				<div class="sideways">
					<div class="address"><p>{caddress}</p></div>
					<button class="copy" on:click={() => copy}>
						<img class="icon" src={copy} alt="Copy" />
					</button>
				</div>
				<h3><span style="color: var(--color-theme-1);">@{you}</span> won't have access to these coins until the trade has been completed.</h3>
				{ #if $trade.deposited == $trade.me.trading.split(" ")[0] }
				<p>Deposit for {$trade.me.trading} has been verified.</p>
				{ :else }
				<div class="sideways">
					<img class="load" src={loading} alt="" />
					<p>Waiting for deposit...</p>
				</div>
				{ /if }
			</div>
				<div class="you">
					<h1><span>@{$trade.you.user.username}</span></h1>
					<h2><span style="color: {confYou ? 'lightgreen' : 'red'};">{confYou ? 'Confirmed' : 'Unconfirmed'}</span></h2>
					{ #if $trade.verified }
					<p>Microsoft account linked to <span style="color: var(--color-theme-1);">rg4tv</span> has been verified and locked @{$trade.you.user.username} no longer has access to the account.</p>
				{ :else }
				<div class="sideways">
					<img class="load" src={loading} alt="" />
					<p>Verifying account information...<p>
				</div>
				{ /if }
				</div>
			{ :else }
				<div class="me">
					<h1><span>@{$self.username}</span></h1>
					<h2><span style="color: {confMe ? 'lightgreen' : 'red'};">{confMe ? 'Confirmed' : 'Unconfirmed'}</span></h2>
					<textarea name="Type your input" id="" cols="25" rows="8" bind:value={$trade.me.value}></textarea>
				</div>
				<div class="you">
					<h1><span>@{$trade.user.username}</span></h1>
					<h2><span style="color: {confYou ? 'lightgreen' : 'red'};">{confYou ? 'Confirmed' : 'Unconfirmed'}</span></h2>
					<textarea class="disabled" name="Type your input" id="" cols="25" rows="8" bind:value={$trade.you.value}></textarea>
				</div>
			{ /if }
		</div>
	{ :else }
		<Null />
	{ /if }
	</div>
	<button style="width: 140px; position: absolute; bottom: 2rem; margin-left: auto; margin-right: auto; right: 0; left: 0; cursor:{$trade.deposited == $trade.me.trading.split(' ')[0] ? "pointer" : "not-allowed"}"on:click={() => {if ($trade.deposited == $trade.me.trading.split(' ')[0]) confirmtrade();}}>{confMe == 0 ? 'Confirm' : 'Unconfirm'}</button>

<style>
	.everything {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	h3 {
		text-align: center;
	}
	.me {
		width: 50%;
		text-align: center;
	}

	.you {
		width: 50%;
		text-align: center;
	}

	p {
		margin: 0;
	}

	button {
		padding: 8px;
	}

	.icon {
		width: 24px;
	}

	.address {
		width: 150px;
		text-align: left;
		overflow-x: scroll;
	}


	.sideways {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}

	textarea {
		background: none;
		padding: 10px;
		border: 3px solid var(--color-theme-1);
		color: var(--text-color-0);
		font-size: 20px;
		border-radius: 13px;
		resize: none;
	}

	.trade {
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>