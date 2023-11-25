<script>
	import '../app.css'
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.200);
		color: theme(colors.gray.800);
		font-family: FixelText, sans-serif;
	}
</style>
