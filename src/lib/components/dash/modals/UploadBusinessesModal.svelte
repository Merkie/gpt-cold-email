<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import { toast } from 'svelte-sonner';
	import { RecipientEmailForTestSends } from '$lib/stores/PersistentBrowserSettings';

	export let close: () => void;

	let loading = false;
	let textareaValue = '';

	async function handleUploadBusinesses() {
		if (loading) return;
		let taJson = undefined;
		try {
			taJson = JSON.parse(textareaValue.trim());
			console.log(textareaValue.trim());
		} catch (e) {
			toast.error('Invalid JSON', {
				class: 'display',
				descriptionClass: 'text',
				description: 'The JSON you provided is invalid.'
			});
			return;
		}

		if (!taJson) {
			toast.error('Invalid JSON', {
				class: 'display',
				descriptionClass: 'text',
				description: 'The JSON you provided is invalid.'
			});
			return;
		}

		loading = true;
		const response = await fetch('/api/v1/data/upload', {
			method: 'POST',
			body: JSON.stringify(taJson)
		}).then((res) => res.json());
		loading = false;

		if (response.success) {
			toast.success('Email Sent Successfully', {
				class: 'display',
				descriptionClass: 'text',
				description: `Check your inbox at ${$RecipientEmailForTestSends} to confirm it landed!`
			});
		} else if (response.error) {
			toast.error('Email Account Deletion Error', {
				class: 'display',
				descriptionClass: 'text',
				description: response.error
			});
		}
	}
</script>

<ModalBase width={600} title={'Upload Business JSON'} {close}>
	<textarea
		bind:value={textareaValue}
		class="mb-4 h-[500px] resize-y rounded-md border border-gray-200 bg-white p-2 px-4"
	></textarea>
	<button
		disabled={loading}
		on:click={handleUploadBusinesses}
		class="mt-8 rounded-md bg-gray-800 p-4 font-bold text-gray-50"
	>
		{loading ? 'Loading...' : 'Submit'}
	</button>
</ModalBase>
