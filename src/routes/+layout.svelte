<script>
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
</script>

<slot />
<Toaster />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
		color: theme(colors.gray.800);
		font-family: FixelText, sans-serif;
	}
</style>
