<script lang="ts">
	import type { businesses, employees } from '@prisma/client';
	import ModalBase from './ModalBase.svelte';

	export let close: () => void;
	export let business: businesses & { employees: employees[] };
</script>

<ModalBase width={600} title={`Business Details`} {close}>
	<div class="flex flex-col">
		<p class="display text-2xl font-semibold">{business.name}</p>
		{#if business.links && business.links.length > 0}
			<div class="mt-1 flex gap-4 text-sm">
				{#each business.links as item}
					<a
						class="text-blue-500 hover:underline"
						target="_blank"
						href={item.startsWith('http') ? item : 'https://' + item}
						>{item.length > 50 ? item.slice(0, 50) + '...' : item}</a
					>
				{/each}
			</div>
		{/if}
		<p class="mt-1 text-sm">
			<i class="bi bi-geo"></i>
			{business.address}
		</p>
		{#if business.phones && business.phones.length > 0}
			<p class="mt-1 text-sm">
				<i class="bi bi-telephone"></i>
				{business.phones.join(', ')}
			</p>
		{/if}
		{#if business.emails && business.emails.length > 0}
			<p class="mt-1 text-sm">
				<i class="bi bi-telephone"></i>
				{business.emails.join(', ')}
			</p>
		{/if}

		<p class="display mb-5 mt-8 text-sm font-semibold">Summary</p>
		<div class="relative rounded-sm bg-gray-100 p-4">
			<p
				style={`font-size: 60px`}
				class="absolute left-[5px] top-[10px] -translate-x-1/2 -translate-y-1/2 text-gray-500 opacity-10"
			>
				<i class="bi bi-quote"></i>
			</p>
			<p>{business.summary}</p>
		</div>

		<p class="display mb-4 mt-8 text-sm font-semibold">Employees</p>
		<div class="flex flex-col gap-6">
			{#each business.employees as employee}
				<div class="flex flex-col flex-wrap gap-2">
					<div class="flex items-center gap-4">
						<p class="text-lg">{employee.name}</p>
						{#each employee.roles as role}
							<p class="rounded-sm bg-gray-400 p-1 px-2 text-sm text-gray-50">{role}</p>
						{/each}
					</div>
					{#if employee.links}
						<div class="flex gap-4">
							{#each employee.links as link}
								<a
									class="text-blue-500 hover:underline"
									target="_blank"
									href={link.startsWith('http') ? link : 'https://' + link}
									>{(() => {
										try {
											return new URL(link).hostname;
										} catch (e) {
											return link.length > 12 ? link.slice(0, 12) + '...' : link;
										}
									})()}</a
								>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<button on:click={close} class="btn mt-8"> Close </button>
</ModalBase>
