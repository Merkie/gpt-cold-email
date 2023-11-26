<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let close: () => void;

	let templateName: string;
	let subject: string;
	let body: string;
</script>

<button
	transition:fade={{ duration: 100 }}
	on:click={(e) => {
		if (e.target === e.currentTarget) close();
	}}
	class="fixed left-0 top-0 z-30 h-screen w-screen backdrop-blur-sm"
>
</button>

<div
	transition:fly={{ y: 50, duration: 200 }}
	class="fixed left-1/2 top-1/2 z-30 flex w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-50 p-8 py-12 shadow-md"
>
	<div class="mb-8 flex items-center justify-between">
		<p class="text-xl font-semibold">Create Email Template</p>
		<button on:click={close} class="p-2">
			<i class="bi bi-x-lg"></i>
		</button>
	</div>
	<p class="mb-2">Template Name:</p>
	<input
		bind:value={templateName}
		type="text"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<p class="mb-2">Subject:</p>
	<input
		bind:value={subject}
		type="text"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<p class="mb-2">Body:</p>
	<textarea
		bind:value={body}
		class="mb-4 resize-y rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<button class="mt-8 rounded-md bg-gray-800 p-4 font-bold text-gray-50"> Submit </button>
</div>
