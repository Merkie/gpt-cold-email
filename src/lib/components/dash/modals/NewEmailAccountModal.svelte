<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let close: () => void;

	let email: string;
	let password: string;
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
	class="fixed left-1/2 top-1/2 z-30 flex w-[90%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-50 p-8 py-12 shadow-md"
>
	<div class="mb-8 flex items-center justify-between">
		<p class="text-xl font-semibold">Add Email Account</p>
		<button on:click={close} class="p-2">
			<i class="bi bi-x-lg"></i>
		</button>
	</div>
	<p class="mb-2">Provider:</p>
	<button class="mb-4 flex items-center gap-4 rounded-md border border-gray-200 bg-white p-2 px-4">
		<img width={20} src="/gmail-logo-sm.png" alt="Gmail logo" />
		<p>Google Workspace</p>
		<div class="flex-1"></div>
		<i class="bi bi-chevron-down"></i>
	</button>
	<p class="mb-2">Email:</p>
	<input
		bind:value={email}
		type="email"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<p class="mb-2">Password:</p>
	<input
		bind:value={password}
		type="password"
		class="mb-4 rounded-md border border-gray-200 bg-white p-2 px-4"
	/>
	<button class="mt-8 rounded-md bg-gray-800 p-4 font-bold text-gray-50"> Submit </button>
</div>
