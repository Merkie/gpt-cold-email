<script lang="ts">
	export let data;

	let selectedTemplateIndex = 0;
	let selectedBusinessIndex = 0;
	let selectedEmployeeIndex = 0;

	let loading = false;

	async function functionHandleGenerate() {
		if (loading) return;
		loading = true;
		const response = await fetch('/api/v1/email/generate', {
			method: 'POST',
			body: JSON.stringify({
				template_id: data.templates[selectedTemplateIndex].id,
				employee_id: data.businesses[selectedBusinessIndex].employees[selectedEmployeeIndex].id
			})
		});
		loading = false;
	}
</script>

<div class="mb-8 flex items-center gap-8 border-b p-4 pb-8">
	<p class="display text-xl">Email Playground</p>
</div>
<div class="flex min-h-[600px] flex-col-reverse gap-4 px-4 md:flex-row">
	<div style="flex: 2;">
		<p class="display my-8 text-xl md:hidden">
			<i class="bi bi-robot mr-2"></i>
			<span>Generation Result</span>
		</p>
		<input
			placeholder={data.templates[selectedTemplateIndex].subject || ''}
			disabled
			class="mb-4 w-full rounded-md border border-gray-200 bg-white p-2 px-4"
			type="text"
		/>
		<textarea
			placeholder={data.templates[selectedTemplateIndex].body || ''}
			disabled
			class="mb-4 flex h-full w-full resize-y flex-col gap-4 rounded-md border border-gray-200 bg-white p-2 px-4"
		></textarea>
	</div>

	<div class="flex-1">
		<p class="display mb-8 text-xl">
			<i class="bi bi-sliders2 mr-2"></i>
			<span>Settings</span>
		</p>
		<p class="mb-2">Email Template:</p>
		<select
			bind:value={selectedTemplateIndex}
			class="mb-4 w-full rounded-md border border-gray-200 bg-white p-2 px-4"
		>
			{#each data.templates as template, index}
				<option value={index}>{template.name}</option>
			{/each}
		</select>
		<p class="mb-2">Business:</p>
		<select
			bind:value={selectedBusinessIndex}
			on:change={() => {
				selectedEmployeeIndex = 0;
			}}
			class="mb-4 w-full rounded-md border border-gray-200 bg-white p-2 px-4"
		>
			{#each data.businesses as business, index}
				<option value={index}>{business.title}</option>
			{/each}
		</select>
		<p class="mb-2">Contact:</p>
		<select
			bind:value={selectedEmployeeIndex}
			class="mb-8 w-full rounded-md border border-gray-200 bg-white p-2 px-4"
		>
			{#each data.businesses[selectedBusinessIndex].employees as employee, index}
				<option value={index}>{employee.name}</option>
			{/each}
		</select>
		<button
			disabled={loading}
			on:click={functionHandleGenerate}
			class="w-full rounded-md bg-gray-800 p-4 font-bold text-gray-50"
		>
			{loading ? 'Loading...' : 'Generate Email'}
		</button>
	</div>
</div>
