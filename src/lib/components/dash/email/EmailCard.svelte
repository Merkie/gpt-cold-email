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
	class="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white p-4 text-left"
>
	<p class="display overflow-hidden overflow-ellipsis pr-4 text-lg font-semibold">
		{email.subject}
	</p>
	<p class="whitespace-nowrap text-sm text-gray-400">
		To: {email.employee.name}
	</p>
	<div class="flex-1"></div>
	<div class="relative mt-4 whitespace-pre-wrap rounded-sm bg-gray-100 p-2">
		<p>{email.body.slice(0, 100) + '...'}</p>
	</div>
</button>
