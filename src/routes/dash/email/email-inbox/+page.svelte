<script lang="ts">
	export let data;
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">Email Inbox</p>
</div>

<div class="rounded-md bg-gray-50 shadow-md">
	<p class="display border-b p-4 text-xl font-bold">Emails</p>
	<div class="p-4">
		<table class="w-full border">
			<thead class="bg-gray-50">
				<tr>
					<th class="display border p-2 text-left">From</th>
					<th class="display border p-2 text-left">Subject</th>
					<th class="display border p-2 text-center">To</th>
				</tr>
			</thead>
			<tbody>
				{#each data.emails as email, i}
					<tr class={i % 2 !== 0 ? '' : 'bg-gray-100'}>
						<td class="border p-2">{email.from}</td>
						<td class="border p-2">{email.subject}</td>
						<td class="border p-2">{email.to}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
