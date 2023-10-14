<script>
    import { goto } from "$app/navigation";
	import { self, supabase } from '$lib/stores'
    import { slide } from "svelte/transition";

let busy = false;
	let err;

	let username = '';
	let email, password, password2;

	const signup = async () => {
		busy = true;
		if (password != password2) {
			return;
		}

		if (email.substring(email.length - 10) != '@gmail.com') {
			err = 'To prevent abuse, you must use a gmail address.';
			return;
		}

		if (password.length < 8) {
			err = 'Password must be at least 8 characters';
			return;
		}

		const { error2 } = await $supabase.from('users').insert({
			username: username,
			number: Math.floor(Math.random() * 8999) + 1001,
			email: email,
			password: password,
			created: new Date(),
			trades: 0,
			rating: 100
		})

		if (error2) {
			console.error(error2); 
			err = error2;return
		}
		const { data, error } = await $supabase.from('users').select().eq('email', email).eq('password', password)
		if (error) { console.error(error);
		}
		err = error;

		$self = data[0]
		$self.email = undefined;
		$self.password = undefined;

busy = false;
		await goto('/profile');
	}

	$: if (password != password2) {
			err = 'Passwords don\'t match';
		} else {
			err = '';
		}
</script>

<div>
	{ #if err }
		<h3 style="color: red;" transition:slide>{err}</h3>
	{ /if }
	<h1>Sign up</h1>
	<h3>Email</h3>
	<input type="email" bind:value={email}>
	<h3>Password</h3>
	<input type="password" bind:value={password}>
	<h3>Confirm password</h3>
	<input type="password" bind:value={password2}>
	<h3>Username</h3>
	<input type="text" bind:value={username}>
	<button disabled="{busy}" style="margin: 1em;" on:click={() => {signup();}}>Sign up</button>
	<a href="/login">Log in</a>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	h3 {
		margin: 1em;
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