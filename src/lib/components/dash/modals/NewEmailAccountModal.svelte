<script lang="ts">
	export let close: () => void;

	let email: string;
	let password: string;
</script>

<button
	on:click={(e) => {
		if (e.target === e.currentTarget) close();
	}}
	class="z-30 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen"
>
</button>

<div
	class="z-30 bg-gray-50 shadow-md rounded-lg flex flex-col w-[90%] max-w-[400px] p-8 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
	<div class="flex items-center justify-between mb-8">
		<p class="font-semibold text-xl">Add Email Account</p>
		<button on:click={close} class="p-2">
			<i class="bi bi-x-lg"></i>
		</button>
	</div>
	<p class="mb-2">Provider:</p>
	<button class="border border-gray-200 px-4 p-2 rounded-md flex items-center gap-4 mb-4">
		<img width={20} src="/gmail-logo-sm.png" alt="Gmail logo" />
		<p>Google Workspace</p>
		<div class="flex-1"></div>
		<i class="bi bi-chevron-down"></i>
	</button>
	<p class="mb-2">Email:</p>
	<input bind:value={email} type="email" class="border border-gray-200 px-4 p-2 rounded-md mb-4" />
	<p class="mb-2">Password:</p>
	<input
		bind:value={password}
		type="password"
		class="border border-gray-200 px-4 p-2 rounded-md mb-4"
	/>
	<button class="p-4 font-bold text-gray-50 bg-gray-800 rounded-md mt-8"> Submit </button>
</div>
