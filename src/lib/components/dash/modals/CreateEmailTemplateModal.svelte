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
	class="z-30 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen"
>
</button>

<div
	transition:fly={{ y: 50, duration: 200 }}
	class="z-30 bg-gray-50 shadow-md rounded-lg flex flex-col w-[90%] max-w-[600px] p-8 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
	<div class="flex items-center justify-between mb-8">
		<p class="font-semibold text-xl">Create Email Template</p>
		<button on:click={close} class="p-2">
			<i class="bi bi-x-lg"></i>
		</button>
	</div>
	<p class="mb-2">Template Name:</p>
	<input
		bind:value={templateName}
		type="text"
		class="border border-gray-200 px-4 p-2 rounded-md mb-4"
	/>
	<p class="mb-2">Subject:</p>
	<input bind:value={subject} type="text" class="border border-gray-200 px-4 p-2 rounded-md mb-4" />
	<p class="mb-2">Body:</p>
	<textarea bind:value={body} class="border border-gray-200 px-4 p-2 rounded-md mb-4 resize-y" />
	<button class="p-4 font-bold text-gray-50 bg-gray-800 rounded-md mt-8"> Submit </button>
</div>
