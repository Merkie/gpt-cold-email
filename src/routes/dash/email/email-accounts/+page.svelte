<script>
	import NewEmailAccountModal from '$lib/components/dash/modals/NewEmailAccountModal.svelte';
	let newEmailAccountModalOpen = false;
</script>

<div class="flex gap-8 items-center p-4 border-b pb-8 mb-8">
	<p class="display text-xl">0 Email Accounts</p>
	<button
		on:click={() => (newEmailAccountModalOpen = true)}
		class="px-8 p-3 rounded-md bg-gray-800 text-gray-50"
	>
		Add Email Account
	</button>
</div>

<div class="grid place-items-center h-[100px]">
	<p class="italic text-gray-300">Nothing here (yet!)</p>
</div>

{#if newEmailAccountModalOpen}
	<NewEmailAccountModal close={() => (newEmailAccountModalOpen = false)} />
{/if}
