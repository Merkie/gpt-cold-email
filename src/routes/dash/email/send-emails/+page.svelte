<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { employees, generated_emails } from '@prisma/client';
	import pLimit from 'p-limit';
	import { toast } from 'svelte-sonner';
	import ViewEmailModal from '$lib/components/dash/modals/ViewEmailModal.svelte';
	import EmailCard from '$lib/components/dash/email/EmailCard.svelte';

	export let data;

	let loading = false;
	let args = '';

	let selectedAccountIndex = 0;

	let viewingEmailModalOpen = false;
	let viewingEmail: (generated_emails & { employee: employees }) | undefined = undefined;

	$: sendableEmails = (() => {
		let emailList = data.emails;

		if (args.includes('limit:')) {
			const limit = parseInt(args.split('limit:')[1].split(' ')[0]);
			emailList = emailList.slice(0, limit);
		}

		return emailList;
	})();

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

		await Promise.all(sendableEmails.map((email) => limit(() => sendEmail(email.id))));

		loading = false;
	}
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">Send Emails</p>
	<button
		disabled={loading || sendableEmails.length === 0 || data.email_accounts.length === 0}
		on:click={handleSendEmails}
		class="btn-wide"
		>{loading
			? 'Sending Emails...'
			: sendableEmails.length > 0
			  ? `Send Emails (${sendableEmails.length})`
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
	<div class="flex-1"></div>
	<input
		bind:value={args}
		class="w-[300px] rounded-md border border-gray-200 bg-white p-3 px-4"
		type="text"
	/>
</div>

{#if data.emails.length === 0}
	<div class="grid h-[100px] place-items-center">
		<p class="italic text-gray-300">Nothing here (yet!)</p>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.emails as email}
			<EmailCard
				onClick={() => {
					viewingEmailModalOpen = true;
					// @ts-ignore
					viewingEmail = email;
				}}
				{email}
			/>
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
