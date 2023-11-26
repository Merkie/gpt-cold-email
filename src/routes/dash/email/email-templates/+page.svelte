<script>
	import CreateEmailTemplateModal from '$lib/components/dash/modals/CreateEmailTemplateModal.svelte';
	let createEmailTemplateModalOpen = false;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">0 Email Templates</p>
	<button
		on:click={() => (createEmailTemplateModalOpen = true)}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
	>
		Create Email Template
	</button>
</div>

<div class="grid h-[100px] place-items-center">
	<p class="italic text-gray-300">Nothing here (yet!)</p>
</div>

{#if createEmailTemplateModalOpen}
	<CreateEmailTemplateModal close={() => (createEmailTemplateModalOpen = false)} />
{/if}
