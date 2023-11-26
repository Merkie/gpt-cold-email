<script lang="ts">
	import NewEmailAccountModal from '$lib/components/dash/modals/NewEmailAccountModal.svelte';
	import DeleteEmailAccountModal from '$lib/components/dash/modals/DeleteEmailAccountModal.svelte';
	import type { email_accounts } from '@prisma/client';

	export let data;

	let newEmailAccountModalOpen = false;
	let deleteEmailAccountModalOpen = false;
	let deleteEmailAccount: email_accounts | null = null;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">
		{data.accounts.length} Email Account{data.accounts.length === 1 ? '' : 's'}
	</p>
	<button
		on:click={() => (newEmailAccountModalOpen = true)}
		class="rounded-md bg-gray-800 p-3 px-8 text-gray-50"
	>
		Add Email Account
	</button>
</div>

{#if data.accounts.length === 0}
	<div class="grid h-[100px] place-items-center">
		<p class="italic text-gray-300">Nothing here (yet!)</p>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.accounts as account}
			<div class="group rounded-md border border-gray-200 bg-white p-4">
				<div class="flex items-center gap-4">
					<img width={20} src="/gmail-logo-sm.png" alt="Gmail logo" />
					<p>{account.email}</p>
					<div class="flex-1"></div>
					<!-- <button class="hidden px-2 text-gray-400 hover:text-gray-600 group-hover:block">
						<i class="bi bi-pencil"></i>
					</button> -->
					<button
						on:click={() => {
							deleteEmailAccount = account;
							deleteEmailAccountModalOpen = true;
						}}
						class="hidden px-2 text-gray-400 hover:text-gray-600 group-hover:block"
					>
						<i class="bi bi-trash"></i>
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}

{#if newEmailAccountModalOpen}
	<NewEmailAccountModal close={() => (newEmailAccountModalOpen = false)} />
{/if}

{#if deleteEmailAccountModalOpen && deleteEmailAccount}
	<DeleteEmailAccountModal
		close={() => {
			deleteEmailAccountModalOpen = false;
			deleteEmailAccount = null;
		}}
		account={deleteEmailAccount}
	/>
{/if}
