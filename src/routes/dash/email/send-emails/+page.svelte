<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { employees, generated_emails } from '@prisma/client';
	import pLimit from 'p-limit';
	import { toast } from 'svelte-sonner';
	import ViewEmailModal from '$lib/components/dash/modals/ViewEmailModal.svelte';

	export let data;

	let loading = false;

	let selectedAccountIndex = 0;

	let viewingEmailModalOpen = false;
	let viewingEmail: (generated_emails & { employee: employees }) | undefined = undefined;

	async function sendEmail(id: number) {
		const response = await fetch('/api/v1/email/account/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email_id: id,
				sender_id: data.email_accounts[selectedAccountIndex].id
			})
		}).then((res) => res.json());

		await invalidateAll();

		if (response.success) {
			toast.success('Email Sent Successfully', {
				class: 'display',
				descriptionClass: 'text',
				description: `Email sent to ${response.recipientAddress}`
			});
		} else if (response.error) {
			toast.error('Email Send Error', {
				class: 'display',
				descriptionClass: 'text',
				description: response.error
			});
		}
	}

	async function handleSendEmails() {
		if (loading) return;
		loading = true;

		const limit = pLimit(5);

		await Promise.all(data.emails.map((email) => limit(() => sendEmail(email.id))));

		loading = false;
	}
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">Send Emails</p>
	<button
		disabled={loading || data.emails.length === 0 || data.email_accounts.length === 0}
		on:click={handleSendEmails}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
		>{loading
			? 'Sending Emails...'
			: data.emails.length > 0
			  ? `Send Emails (${data.emails.length})`
			  : `All Emails Sent`}</button
	>
	<p>Email Account:</p>
	<select
		bind:value={selectedAccountIndex}
		class="w-[300px] rounded-md border border-gray-200 bg-white p-3 px-4"
	>
		{#each data.email_accounts as template, index}
			<option value={index}>{template.email}</option>
		{/each}
	</select>
</div>

{#if data.emails.length === 0}
	<div class="grid h-[100px] place-items-center">
		<p class="italic text-gray-300">Nothing here (yet!)</p>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.emails as email}
			<button
				on:click={() => {
					viewingEmailModalOpen = true;
					// @ts-ignore
					viewingEmail = email;
				}}
				class="group flex h-[200px] flex-col overflow-hidden rounded-md border border-gray-200 bg-white p-4 text-left"
			>
				<div class="flex items-center justify-between">
					<p class="overflow-hidden overflow-ellipsis whitespace-nowrap pr-4 text-lg font-semibold">
						{email.subject}
					</p>
					<p class="whitespace-nowrap text-sm text-gray-400">
						To: {email.employee.name}
					</p>
				</div>
				<p class="flex-1 text-sm text-gray-400">{email.body.slice(0, 300) + '...'}</p>
			</button>
		{/each}
	</div>
{/if}

{#if viewingEmailModalOpen && viewingEmail}
	<ViewEmailModal
		close={() => {
			viewingEmailModalOpen = false;
			viewingEmail = undefined;
		}}
		email={viewingEmail}
	/>
{/if}
