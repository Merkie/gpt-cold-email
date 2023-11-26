<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ModalBase from './ModalBase.svelte';
	import { toast } from 'svelte-sonner';

	export let close: () => void;

	let email: string;
	let password: string;

	let loading = false;

	async function handleEmailAccountCreation() {
		if (loading) return;
		loading = true;
		const response = await fetch('/api/v1/email/account/create', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		}).then((res) => res.json());
		loading = false;

		if (response.account) {
			toast.success('Email Account Created', {
				class: 'display',
				descriptionClass: 'text',
				description: `"${response.account.email}"`
			});
			await invalidateAll();
		} else if (response.error) {
			toast.error('Email Account Creation Error', {
				class: 'display',
				descriptionClass: 'text',
				description: response.error
			});
		}
	}
</script>

<ModalBase title={'Add Email Account'} {close}>
	<p class="mb-2">Provider:</p>
	<button class="mb-4 flex items-center gap-4 rounded-md border border-gray-200 bg-white p-2 px-4">
		<img width={20} src="/gmail-logo-sm.png" alt="Gmail logo" />
		<p>Google Workspace</p>
		<div class="flex-1"></div>
		<i class="bi bi-chevron-down"></i>
	</button>
	<p class="mb-2">Email:</p>
	<input
		bind:value={email}
		type="email"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<p class="mb-2">Password:</p>
	<input
		bind:value={password}
		type="password"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<button
		disabled={loading}
		on:click={handleEmailAccountCreation}
		class="mt-8 rounded-md bg-gray-800 p-4 font-bold text-gray-50"
	>
		{loading ? 'Loading...' : 'Submit'}
	</button>
</ModalBase>
