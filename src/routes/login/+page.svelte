<script>
	import { self, trade, supabase } from '$lib/stores'
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";

	let err, email, password;

	onMount(async () => {
		let go = 0;
		if (localStorage.self) {
			go = 1
			$self = JSON.parse(localStorage.self);
		}
		if (localStorage.trade) {
			go = 1
			$trade = JSON.parse(localStorage.trade);
		}
		console.log('going')
		if (go == 1) await goto('/profile')
	})

	let loading = false;

	const login = async () => {
		loading = true;
		const { data, error } = await $supabase.from('users').select().eq('email', email).eq('password', password)
		console.log(data)
		loading = false;
		if (data.length == 0) {
			err = "Incorrect email or password";
			return;
		}
		if (error) { console.error(error); err = error; return;}
		err = error;

		$self = data[0]
		$self.email = undefined;
		$self.password = undefined;

		localStorage.self = JSON.stringify($self);

		await goto('/profile');
	}
</script>

<div>
	{ #if err }
		<h3 style="color: red;" transition:slide>{err}</h3>
	{ /if }
	<h1>Log in</h1>
	<h3>Email</h3>
	<input type="email" bind:value={email}>
	<h3>Password</h3>
	<input type="password" bind:value={password}>
	<button disabled="{loading}" on:click={login}>Log in</button>
	<a href="/signup">Sign up</a>
</div>

<style>
	div {
		display: flex;
		gap: 1em;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	h3 {
		margin: 0;
	}
	input {
		background: none;
		font-size: 20px;
		color: var(--text-color-0);
		border: 3px solid var(--color-theme-1);
		padding: 10px;
		border-radius: 13px;
	}
</style>