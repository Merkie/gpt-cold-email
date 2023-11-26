<script lang="ts">
	import CreateEmailTemplateModal from '$lib/components/dash/modals/CreateEmailTemplateModal.svelte';
	import DeleteTemplateModal from '$lib/components/dash/modals/DeleteTemplateModal.svelte';
	import type { email_templates } from '@prisma/client';

	export let data;

	let createEmailTemplateModalOpen = false;
	let deleteEmailTemplateModalOpen = false;
	let deleteEmailTemplate: email_templates | null = null;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">
		{data.templates.length} Email Template{data.templates.length === 1 ? '' : 's'}
	</p>
	<button
		on:click={() => (createEmailTemplateModalOpen = true)}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
	>
		Create Email Template
	</button>
</div>

{#if data.templates.length === 0}
	<div class="grid h-[100px] place-items-center">
		<p class="italic text-gray-300">Nothing here (yet!)</p>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.templates as template}
			<div class="group flex h-[500px] flex-col rounded-md border border-gray-200 bg-white p-4">
				<div class="mb-4 flex items-center">
					<p class="display flex-1 overflow-hidden text-ellipsis text-xl">{template.name}</p>
					<!-- <button class="mx-2 hidden px-2 group-hover:block">
						<i class="bi bi-pencil"></i>
					</button> -->
					<button
						on:click={() => {
							deleteEmailTemplate = template;
							deleteEmailTemplateModalOpen = true;
						}}
						class="hidden px-2 text-gray-400 hover:text-gray-600 group-hover:block"
					>
						<i class="bi bi-trash"></i>
					</button>
				</div>

				<p class="text-lg text-gray-500">{template.subject}</p>
				<p class="flex-1 overflow-y-auto whitespace-pre-wrap">
					{template.body}
				</p>
			</div>
		{/each}
	</div>
{/if}

{#if createEmailTemplateModalOpen}
	<CreateEmailTemplateModal close={() => (createEmailTemplateModalOpen = false)} />
{/if}

{#if deleteEmailTemplateModalOpen && deleteEmailTemplate}
	<DeleteTemplateModal
		close={() => {
			deleteEmailTemplateModalOpen = false;
			deleteEmailTemplate = null;
		}}
		template={deleteEmailTemplate}
	/>
{/if}
