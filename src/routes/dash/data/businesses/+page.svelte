<script lang="ts">
	import UploadBusinessesModal from '$lib/components/dash/modals/UploadBusinessesModal.svelte';

	export let data;
	const businesses = data.businesses;

	let uploadBusinessesJsonModalOpen = false;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">
		{businesses.length} Businesses
	</p>
	<button
		on:click={() => (uploadBusinessesJsonModalOpen = true)}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50">Upload Business JSON</button
	>
</div>

<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
	{#each businesses as business}
		<div
			class="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white p-4 text-left shadow-md"
		>
			<div class="mb-2">
				<h3 class="text-lg font-semibold">{business.name}</h3>
				<p class="text-sm text-gray-500">{business.address}</p>
			</div>
			<div class="flex justify-between">
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
				<div class="mx-auto w-fit rounded-md bg-yellow-400 p-1 px-3 text-xs font-bold text-gray-50">
					No Draft
				</div>
			</div>
		</div>
	{/each}
</div>

{#if uploadBusinessesJsonModalOpen}
	<UploadBusinessesModal close={() => (uploadBusinessesJsonModalOpen = false)} />
{/if}
