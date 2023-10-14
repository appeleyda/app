<script>
	import { self } from '$lib/stores';
	import Null from '../Null.svelte';
	import Requests from './Requests.svelte';
	import plus from '$lib/images/plus.svg';

	console.log($self, $self.username)

	let me = $self.username;
</script>

<main>
	{ #if me }
		<div>
			<h1>Your profile</h1>
			<h1><span style="color: var(--color-theme-1);">{me}</span>#{$self.number}</h1>
			<h3>Account created on {new Date($self.created).toLocaleString()}</h3>
			<h3>Successful trades: {$self.trades}</h3>
			<h3>Rating: {$self.rating}%</h3>
			<Requests />
		</div>
	{ :else }
		<Null />
	{ /if }
</main>
<a href="/open">
	<div class="open">
		<img src={plus} alt="GitHub" />
	</div>
</a>

<style>
	.open {
		width: 48px;
		height: 48px;
		position: absolute;
		bottom: 48px;
		right: 48px;
		border-radius: 24px;
		border: 3px solid var(--color-theme-1);
	}
</style>