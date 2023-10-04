<script>
	import { self, trade } from '$lib/stores';
    import { dataset_dev } from 'svelte/internal';

	export let data;
</script>

<main>
	<h1><span style="color: var(--color-theme-1);">@{data.slug}</span>'s profile</h1>
</main>