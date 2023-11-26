<script lang="ts">
	let { data } = $props()
	const businesses = data.businesses
</script>

<div class="bg-gray-50 rounded-md shadow-md">
	<p class="display font-bold text-xl p-4 border-b">Businesses</p>
	<div class="p-4">
		<table class="border w-full">
			<thead class="bg-gray-50">
				<tr>
					<th class="text-left p-2 border display">Business Name</th>
					<th class="text-left p-2 border display">Address</th>
					<th class="text-left p-2 border display">Contacts</th>
					<th class="text-left p-2 border display">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each businesses as business, i}
					<tr class={i % 2 === 0 ? '' : 'bg-gray-50'}>
						<td class="p-2 border">{business.title}</td>
						<td class="p-2 border">{business.address}</td>
						<td class="p-2 border">
							<p
								class={`p-1 px-3 text-xs rounded-md text-gray-50 font-bold w-fit ${
									business.employeeCount > 0 ? 'bg-emerald-400' : 'bg-yellow-400'
								}`}>
								{business.employeeCount}
							</p>
						</td>
						<td class="p-2 border">
							<p class={`p-1 px-3 text-xs rounded-md text-gray-50 font-bold w-fit bg-yellow-400`}>
								No Draft
							</p>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
