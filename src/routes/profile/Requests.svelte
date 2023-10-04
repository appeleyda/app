<script>
	import { trade, supabase } from '$lib/stores'
  import { onMount } from "svelte";
	import { redirect } from '@sveltejs/kit'
    import { goto } from '$app/navigation';

	// sending request: sender: admin name, me: v's payment, you: my payment
	let rqs = [];

	const getrqs = async () => {
		const { data, error } = await $supabase.from('trades').select()
		if (error ) {
			console.error(error);
			return
		}
		rqs = [];

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
			rqs.push(t);
		}
		rqs = rqs;
	}

	const timer = async () => {
		return new Promise(resolve => setTimeout(resolve, 500))
	}

	onMount(() => {setInterval(getrqs, 5000);});

	const click = async (i, j) => {
		let t = await timer(); // await gettrade()

		$trade = rqs[j]
	await goto('/trade');
	}

	$: console.log(rqs)
</script>

<div>
	<h1>Trade requests</h1>
	<ul>
		{ #each rqs as i, j }
			<li>
				<h3><span>@{i.you.user.username}</span> requested to trade your <span class="color">{i.me.trading}</span> for their <span class="color">{i.you.trading}</span>. Click <a on:click={() => click(i, j)}>here</a> to accept.</h3>
			</li>
		{/each}
	</ul>
</div>

<style>
	span {color: var(--color-theme-1);
	}
</style>