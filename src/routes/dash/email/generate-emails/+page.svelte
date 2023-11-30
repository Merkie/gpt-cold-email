<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { businesses, employees, generated_emails } from '@prisma/client';
	import { toast } from 'svelte-sonner';
	import pLimit from 'p-limit';
	import ViewEmailModal from '$lib/components/dash/modals/ViewEmailModal.svelte';
	import EmailCard from '$lib/components/dash/email/EmailCard.svelte';

	export let data;

	let selectedTemplateIndex = 0;

	let loading = false;

	let viewingEmailModalOpen = false;
	let viewingEmail: (generated_emails & { employee: employees }) | undefined = undefined;

	async function generateEmailFromBusiness(business: businesses) {
		const determinationResponse = await fetch('/api/v1/email/determine-recipient', {
			method: 'POST',
			body: JSON.stringify({
				business_id: business.id
			})
		}).then((res) => res.json());

		if (!determinationResponse.employee) {
			toast.error('Email Generation Error', {
				class: 'display',
				descriptionClass: 'text',
				description: `Couldn't find an employee to send the email to for ${business.name}. Error: ${determinationResponse.error}`
			});
			return;
		}

		const emailGenResponse = await fetch('/api/v1/email/generate', {
			method: 'POST',
			body: JSON.stringify({
				template_id: data.templates[selectedTemplateIndex].id,
				employee_id: determinationResponse.employee.id,
				email: determinationResponse.employee.email,
				save: true
			})
		}).then((res) => res.json());

		if (emailGenResponse.error) {
			toast.error('Email Generation Error', {
				class: 'display',
				descriptionClass: 'text',
				description: `Couldn't generate email for ${business.name}. Error: ${emailGenResponse.error}`
			});
			return;
		}

		toast.success('Email Generated', {
			class: 'display',
			descriptionClass: 'text',
			description: `Successfully generated email for ${business.name}.`
		});

		await invalidateAll();
	}

	async function handleGenerateEmails() {
		if (loading) return;
		loading = true;

		const limit = pLimit(5);

		await Promise.all(
			data.businessesWithoutGeneratedEmails.map((business) =>
				limit(() => generateEmailFromBusiness(business))
			)
		);

		loading = false;
	}
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">Generate Emails</p>
	<button
		disabled={loading ||
			data.businessesWithoutGeneratedEmails.length === 0 ||
			data.templates.length === 0}
		on:click={handleGenerateEmails}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
		>{loading
			? 'Generating Emails...'
			: data.businessesWithoutGeneratedEmails.length > 0
			  ? `Generate Emails (${data.businessesWithoutGeneratedEmails.length})`
			  : `All Emails Generated`}</button
	>
	<p>Email Template:</p>
	<select
		bind:value={selectedTemplateIndex}
		class="w-[300px] rounded-md border border-gray-200 bg-white p-3 px-4"
	>
		{#each data.templates as template, index}
			<option value={index}>{template.name}</option>
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
