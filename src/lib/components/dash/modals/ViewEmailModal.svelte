<script lang="ts">
	import type { employees, generated_emails } from '@prisma/client';
	import ModalBase from './ModalBase.svelte';

	export let close: () => void;
	export let email: generated_emails & { employee: employees };
</script>

<ModalBase width={600} title={`Email Details`} {close}>
	<p class="display text-xl font-semibold">{email.subject}</p>
	<div class="mt-4 flex items-center gap-4">
		<p>{'To:'}</p>
		<div class="flex items-center gap-2">
			<p class="text-lg">{email.employee.name}</p>
			{#each email.employee.roles || [] as role}
				<p class="rounded-sm bg-gray-400 p-1 px-2 text-sm text-gray-50">{role}</p>
			{/each}
		</div>
	</div>
	<div class="relative mt-8 whitespace-pre-wrap rounded-sm bg-gray-100 p-4">
		<p
			style={`font-size: 60px`}
			class="absolute left-[5px] top-[10px] -translate-x-1/2 -translate-y-1/2 text-gray-500 opacity-10"
		>
			<i class="bi bi-quote"></i>
		</p>
		<p>{email.body}</p>
	</div>
	<button on:click={close} class="btn mt-8"> Close </button>
</ModalBase>
