<script lang="ts">
	export let data;
	const businesses = data.businesses;
</script>

<div class="rounded-md bg-gray-50 shadow-md">
	<p class="display border-b p-4 text-xl font-bold">Businesses</p>
	<div class="p-4">
		<table class="w-full border">
			<thead class="bg-gray-50">
				<tr>
					<th class="display border p-2 text-left">Business Name</th>
					<th class="display border p-2 text-left">Address</th>
					<th class="display border p-2 text-center">Contacts</th>
					<th class="display border p-2 text-center">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each businesses as business, i}
					<tr class={i % 2 !== 0 ? '' : 'bg-gray-100'}>
						<td class="border p-2">{business.title}</td>
						<td class="border p-2">{business.address}</td>
						<td class="border p-2">
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
						<td class="border p-2">
							<p
								class={`mx-auto w-fit rounded-md bg-yellow-400 p-1 px-3 text-xs font-bold text-gray-50`}
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
