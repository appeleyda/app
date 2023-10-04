<script>
	import { self, supabase } from '$lib/stores'
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let err, email, password;

	onMount(async () => {
		if (localStorage.self) {
			$self = JSON.parse(localStorage.self);
			await goto('/profile')
		}
	})

	const login = async () => {
		const { data, error } = await $supabase.from('users').select().eq('email', email).eq('password', password)
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
		<h3>{err}</h3>
	{ /if }
	<h1>Log in</h1>
	<h3>Email</h3>
	<input type="email" bind:value={email}>
	<h3>Password</h3>
	<input type="password" bind:value={password}>
	<button on:click={login}>Log in</button>
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