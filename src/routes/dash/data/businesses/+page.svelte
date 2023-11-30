<script lang="ts">
	import UploadBusinessesModal from '$lib/components/dash/modals/UploadBusinessesModal.svelte';
	import ViewBusinessModal from '$lib/components/dash/modals/ViewBusinessModal.svelte';
	import type { businesses, employees } from '@prisma/client';

	export let data;

	let uploadBusinessesJsonModalOpen = false;
	let viewBusinessModalOpen = false;
	let viewBusiness: (businesses & { employees: employees[] }) | undefined = undefined;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">
		{data.businesses.length} Businesses
	</p>
	<button on:click={() => (uploadBusinessesJsonModalOpen = true)} class="btn-wide"
		>Upload Business JSON</button
	>
</div>

<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
	{#each data.businesses as business}
		<button
			on:click={() => {
				viewBusinessModalOpen = true;
				// @ts-ignore
				viewBusiness = business;
			}}
			class="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white p-4 text-left"
		>
			<div class="mb-2">
				<h3 class="text-lg font-semibold">{business.name}</h3>
				<p class="text-sm text-gray-500">{business.address}</p>
			</div>
			<div class="flex-1"></div>
			<div class="flex w-full justify-between">
				<div class="flex items-center">
					<span
						class={`bi ${
							business.employeeCount > 0 ? 'bi-check-lg text-emerald-500' : 'bi-x-lg text-red-500'
						}`}
					></span>
					<span class="ml-2 text-sm"
						>{business.employeeCount > 0 ? 'Contacts Available' : 'No Contacts'}</span
					>
				</div>
				<div
					class={`rounded-md p-1 px-3 text-xs font-bold text-gray-50  ${
						business.status === 'NO DRAFTS'
							? 'bg-yellow-500'
							: business.status === 'DRAFT READY'
							  ? 'bg-blue-500'
							  : 'bg-green-500'
					}`}
				>
					{business.status}
				</div>
			</div>
		</button>
	{/each}
</div>

{#if uploadBusinessesJsonModalOpen}
	<UploadBusinessesModal close={() => (uploadBusinessesJsonModalOpen = false)} />
{/if}

{#if viewBusinessModalOpen && viewBusiness}
	<ViewBusinessModal business={viewBusiness} close={() => (viewBusinessModalOpen = false)} />
{/if}
