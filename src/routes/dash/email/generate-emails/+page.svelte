<script lang="ts">
	export let data;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">Generate Emails</p>
	<button class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
		>Generate Emails ({data.businessesWithoutGeneratedEmails.length})</button
	>
</div>

{#if data.emails.length === 0}
	<div class="grid h-[100px] place-items-center">
		<p class="italic text-gray-300">Nothing here (yet!)</p>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.emails as email}
			<button
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
