<script>
	import { page } from '$app/stores';
	import { self, trade } from '$lib/stores';
	import profile from '$lib/images/profile.svg';
	import github from '$lib/images/github.svg';
	import { onMount } from 'svelte';

	onMount(() => {
		if (localStorage.self) $self = JSON.parse(localStorage.self);
		if (localStorage.trade) $trade = JSON.parse(localStorage.trade);
	})
</script>

<header>
	<div class="corner">
		<a href="https://github.com/">
			<img src={github} alt="GitHub" />
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/safety') ? 'page' : undefined}>
				<a href="/safety">Safety</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/trade') ? 'page' : undefined}>
				<a href="/trade">Trade</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<a href="/profile">
			<img src={profile} alt="Profile" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
