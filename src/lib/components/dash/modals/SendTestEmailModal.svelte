<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import { toast } from 'svelte-sonner';
	import { RecipientEmailForTestSends } from '$lib/stores/PersistentBrowserSettings';

	export let close: () => void;
	export let sender_id: number;

	let loading = false;

	async function handleSendTestEmail() {
		if (loading) return;
		loading = true;
		const response = await fetch('/api/v1/email/account/test-send', {
			method: 'POST',
			body: JSON.stringify({
				sender_id,
				recipient: $RecipientEmailForTestSends
			})
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

<ModalBase title={'Send Test Email'} {close}>
	<p class="mb-2">Recipient Email Address:</p>
	<input
		bind:value={$RecipientEmailForTestSends}
		type="email"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<button disabled={loading} on:click={handleSendTestEmail} class="btn mt-8">
		{loading ? 'Loading...' : 'Submit'}
	</button>
</ModalBase>
