<script lang="ts">
	export let data;
	const businesses = data.businesses;
</script>

<div class="bg-gray-50 rounded-md shadow-md">
	<p class="display font-bold text-xl p-4 border-b">Businesses</p>
	<div class="p-4">
		<table class="border w-full">
			<thead class="bg-gray-50">
				<tr>
					<th class="text-left p-2 border display">Business Name</th>
					<th class="text-left p-2 border display">Address</th>
					<th class="text-center p-2 border display">Contacts</th>
					<th class="text-center p-2 border display">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each businesses as business, i}
					<tr class={i % 2 !== 0 ? '' : 'bg-gray-100'}>
						<td class="p-2 border">{business.title}</td>
						<td class="p-2 border">{business.address}</td>
						<td class="p-2 border">
							{#if business.employeeCount > 0}
								<p class="text-center">
									<i class="bi bi-check-lg text-emerald-500"></i>
								</p>
							{:else}
								<p class="text-center">
									<i class="bi bi-x-lg text-red-500"></i>
								</p>
							{/if}
						</td>
						<td class="p-2 border">
							<p
								class={`p-1 px-3 mx-auto text-xs rounded-md text-gray-50 font-bold w-fit bg-yellow-400`}
							>
								No Draft
							</p>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
