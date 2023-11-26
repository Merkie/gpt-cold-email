<script lang="ts">
	import type { email_accounts } from '@prisma/client';
	import ModalBase from './ModalBase.svelte';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let close: () => void;
	export let account: email_accounts;

	let loading = false;

	async function handleEmailAccountDeletion() {
		if (loading) return;
		loading = true;
		const response = await fetch('/api/v1/email/account/delete', {
			method: 'POST',
			body: JSON.stringify({
				id: account.id
			})
		}).then((res) => res.json());
		loading = false;

		if (response.account) {
			toast.success('Email Account Deleted', {
				class: 'display',
				descriptionClass: 'text',
				description: `"${response.account.email}"`
			});

			await invalidateAll();
			close();
		} else if (response.error) {
			toast.error('Email Account Deletion Error', {
				class: 'display',
				descriptionClass: 'text',
				description: response.error
			});
		}
	}
</script>

<ModalBase width={600} title={'Delete Email Account'} {close}>
	<p>Are you sure you want to delete this email account? This action cannot be undone.</p>
	<div class="flex gap-4">
		<button
			disabled={loading}
			on:click={handleEmailAccountDeletion}
			class="mt-8 flex-1 whitespace-nowrap rounded-md bg-red-600 p-4 font-bold text-gray-50"
		>
			{loading ? 'Loading...' : `Delete "${account.email}"`}
		</button>
		<button on:click={close} class="mt-8 flex-1 rounded-md bg-gray-500 p-4 font-bold text-gray-50"
			>Nevermind</button
		>
	</div>
</ModalBase>
