<script lang="ts">
	import { toast } from 'svelte-sonner';
	import ModalBase from './ModalBase.svelte';

	export let close: () => void;

	let templateName: string;
	let subject: string;
	let body: string;

	let loading = false;

	async function handleTemplateCreation() {
		if (loading) return;
		loading = true;
		const response = await fetch('/api/v1/email/template/create', {
			method: 'POST',
			body: JSON.stringify({
				name: templateName,
				subject,
				body
			})
		}).then((res) => res.json());
		loading = false;

		if (response.template) {
			toast.success('Template Created', {
				class: 'display',
				descriptionClass: 'text',
				description: `"${response.template.name}"`
			});
		} else if (response.error) {
			toast.error('Template Creation Error', {
				class: 'display',
				descriptionClass: 'text',
				description: response.error
			});
		}
	}
</script>

<ModalBase title={'Create Email Template'} width={600} {close}>
	<p class="mb-2">Template Name:</p>
	<input
		bind:value={templateName}
		type="text"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<p class="mb-2">Subject:</p>
	<input
		bind:value={subject}
		type="text"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<p class="mb-2">Body:</p>
	<textarea
		bind:value={body}
		class="mb-4 resize-y rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<button
		disabled={loading}
		on:click={handleTemplateCreation}
		class="mt-8 rounded-md bg-gray-800 p-4 font-bold text-gray-50"
	>
		{loading ? 'Loading...' : 'Submit'}
	</button>
</ModalBase>
