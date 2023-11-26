<script lang="ts">
	import type { email_templates } from '@prisma/client';
	import ModalBase from './ModalBase.svelte';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let close: () => void;
	export let template: email_templates;

	let loading = false;

	async function handleTemplateDeletion() {
		if (loading) return;
		loading = true;
		const response = await fetch('/api/v1/email/template/delete', {
			method: 'POST',
			body: JSON.stringify({
				id: template.id
			})
		}).then((res) => res.json());
		loading = false;

		if (response.template) {
			toast.success('Template Deleted', {
				class: 'display',
				descriptionClass: 'text',
				description: `"${response.template.name}"`
			});

			await invalidateAll();
			close();
		} else if (response.error) {
			toast.error('Template Deletion Error', {
				class: 'display',
				descriptionClass: 'text',
				description: response.error
			});
		}
	}
</script>

<ModalBase width={600} title={'Delete Email Template'} {close}>
	<p>Are you sure you want to delete this template? This action cannot be undone.</p>
	<div class="flex gap-4">
		<button
			disabled={loading}
			on:click={handleTemplateDeletion}
			class="mt-8 flex-1 whitespace-nowrap rounded-md bg-red-600 p-4 font-bold text-gray-50"
		>
			{loading ? 'Loading...' : `Delete "${template.name}"`}
		</button>
		<button on:click={close} class="mt-8 flex-1 rounded-md bg-gray-500 p-4 font-bold text-gray-50"
			>Nevermind</button
		>
	</div>
</ModalBase>
