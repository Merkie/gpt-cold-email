<script lang="ts">
	export let data;
	const contacts = data.contacts;
</script>

<div class="rounded-md bg-gray-50 shadow-md">
	<p class="display border-b p-4 text-xl font-bold">Contacts</p>
	<div class="p-4">
		<table class="w-full border">
			<thead class="bg-gray-50">
				<tr>
					<th class="display border p-2 text-left">Name</th>
					<th class="display border p-2 text-left">Roles</th>
					<th class="display border p-2 text-left">Employer</th>
					<!-- <th class="text-left p-2 border display">Status</th> -->
				</tr>
			</thead>
			<tbody>
				{#each contacts as contact, i}
					<tr class={i % 2 !== 0 ? '' : 'bg-gray-100'}>
						<td class="border p-2">{contact.name}</td>
						<td class="border p-2">{contact.roles.join(', ')}</td>
						<td class="border p-2">
							{contact.business.name}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
