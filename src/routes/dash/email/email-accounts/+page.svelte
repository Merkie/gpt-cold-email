<script>
	import NewEmailAccountModal from '$lib/components/dash/modals/NewEmailAccountModal.svelte';
	let newEmailAccountModalOpen = false;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">0 Email Accounts</p>
	<button
		on:click={() => (newEmailAccountModalOpen = true)}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
	>
		Add Email Account
	</button>
</div>

<div class="grid h-[100px] place-items-center">
	<p class="italic text-gray-300">Nothing here (yet!)</p>
</div>

{#if newEmailAccountModalOpen}
	<NewEmailAccountModal close={() => (newEmailAccountModalOpen = false)} />
{/if}
