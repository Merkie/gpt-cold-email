<script>
	import NewEmailAccountModal from '$lib/components/dash/modals/NewEmailAccountModal.svelte';
	let newEmailAccountModalOpen = false;
</script>

{#if newEmailAccountModalOpen}
	<NewEmailAccountModal close={() => (newEmailAccountModalOpen = false)} />
{/if}
