<script lang="ts">
	import type { employees, generated_emails } from '@prisma/client';

	export let onClick: () => void;
	export let email: {
		subject: string;
		body: string;
		employee: {
			name: string;
		};
	};
</script>

<button
	on:click={onClick}
	class="group flex h-[200px] flex-col overflow-hidden rounded-md border border-gray-200 bg-white p-4 text-left"
>
	<p class="overflow-hidden overflow-ellipsis pr-4 text-lg font-semibold">
		{email.subject}
	</p>
	<p class="whitespace-nowrap text-sm text-gray-400">
		To: {email.employee.name}
	</p>
	<p class="mt-4 flex-1 text-sm text-gray-400">{email.body.slice(0, 300) + '...'}</p>
</button>
