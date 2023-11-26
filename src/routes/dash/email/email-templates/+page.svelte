<script>
	let createEmailTemplateModalOpen = false;
</script>

<div class="flex gap-8 items-center p-4 border-b pb-8 mb-8">
	<p class="display text-xl">0 Email Templates</p>
	<button
		on:click={() => (createEmailTemplateModalOpen = true)}
		class="px-8 p-3 rounded-md bg-gray-800 text-gray-50"
	>
		Create Email Template
	</button>
</div>

<div class="grid place-items-center h-[100px]">
	<p class="italic text-gray-300">Nothing here (yet!)</p>
</div>

<!-- {#if createEmailTemplateModalOpen}
	<NewCreateEmailTemplateModal close={() => (createEmailTemplateModalOpen = false)} />
{/if} -->
