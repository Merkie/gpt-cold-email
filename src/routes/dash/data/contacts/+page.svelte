<script lang="ts">
	let { data } = $props()
	const contacts = data.contacts
</script>

<div class="bg-gray-50 rounded-md shadow-md">
	<p class="display font-bold text-xl p-4 border-b">Contacts</p>
	<div class="p-4">
		<table class="border w-full">
			<thead class="bg-gray-50">
				<tr>
					<th class="text-left p-2 border display">Name</th>
					<th class="text-left p-2 border display">Roles</th>
					<th class="text-left p-2 border display">Employer</th>
					<!-- <th class="text-left p-2 border display">Status</th> -->
				</tr>
			</thead>
			<tbody>
				{#each contacts as contact, i}
					<tr class={i % 2 !== 0 ? '' : 'bg-gray-100'}>
						<td class="p-2 border">{contact.name}</td>
						<td class="p-2 border">{contact.roles.join(', ')}</td>
						<td class="p-2 border">
							{contact.business.title}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
