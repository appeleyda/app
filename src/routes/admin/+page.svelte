<script>
	import { self, supabase } from '$lib/stores';
    import { onMount } from 'svelte';

		let outgoing = [];
		let depositvalue = '';

	const update = async () => {
		const { data, error} = await $supabase.from('trades').select().eq('youusernumber', 1000)
		if (error) {
			console.error(error)
		}
		outgoing = data;
	}

	async function verify(i) {
		i.verified = true;

		const {error} = await $supabase.from('trades').update({verified: true}).eq('id', i.id);
		if(error) {
		console.error(error);
		}
	}

	async function deposit(i) {
		i.deposited = parseFloat(depositvalue);

		const {error} = await $supabase.from('trades').update({deposited: parseFloat(depositvalue)}).eq('id', i.id);

		if(error) {
		console.error(error);
		}
	}

	const confirm = (i) => {
		i.you.confirm = !i.you.confirm;

		const {error} = await $supabase.from('trades').update({youconfirm: i.you.confirm}).eq('id', i.id);

		if(error) {
		console.error(error);
		}
	}

	onMount(() => {setInterval(update, 1000) });
</script>

{ #if $self.username != 'admin' && $self.number != 1000 }
	<div>
		<h1>Admin panel</h1>
		{ #each outgoing as i }
		<div style="border: 2px solid var(--color-theme-1);">
			<h3>Trade with {i.me.user.username}#{i.me.user.number}:</h3>
			<button on:click={() => verify(i)}>Verify account</button>
			<button on:click={() => deposit(i)}>Verify deposit</button>
			<button on:click={() => confirm(i)}>confirm deposit</button>
		<h1>Confirmed?: {i.you.confirm}</h1>
		</div>
		{ /each }
	</div>
{ :else }
	<main>
		<h1>You aren't authorized to access this page.</h1>
	</main>
{ /if }