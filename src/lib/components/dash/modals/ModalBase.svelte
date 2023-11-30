<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let close: () => void;
	export let title: string;
	export let width = 400;
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
	style={`max-width: ${width}px;`}
	class="fixed left-1/2 top-1/2 z-30 flex max-h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-lg bg-gray-50 p-8 py-12 shadow-md"
>
	<div class="mb-8 flex items-center justify-between">
		<p class="display text-xl font-semibold">{title}</p>
		<button on:click={close} class="p-2">
			<i class="bi bi-x-lg"></i>
		</button>
	</div>
	<slot />
</div>
