<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	async function handleLogin() {
		const response = await fetch('/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then((res) => res.json());

		if (response.token) await goto('/dash');
	}
</script>

<div
	class="fixed left-1/2 top-1/2 h-[180vw] w-[180vw] -translate-x-1/2 -translate-y-[100%] rounded-full bg-gray-400 opacity-20"
></div>

<div class="fixed left-8 top-8 mb-4 flex items-center gap-4 font-bold">
	<div class="relative h-[40px] w-[40px] rounded-md rounded-br-none bg-gray-800">
		<i
			class="bi bi-envelope-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-50"
		></i>
	</div>
	<p class="display text-xl">GPT Cold Email</p>
</div>

<div
	class="fixed left-1/2 top-1/2 flex w-[90%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-50 p-8 py-12 shadow-md"
>
	<p class="display mb-8 text-3xl font-bold">Log In</p>
	<p class="mb-2">Email</p>
	<input
		bind:value={email}
		class="mb-4 flex-1 rounded-md border border-gray-200 bg-gray-100 p-2 outline-none"
		type="email"
	/>
	<p class="mb-2">Password</p>
	<input
		bind:value={password}
		class="mb-4 flex-1 rounded-md border border-gray-200 bg-gray-100 p-2 outline-none"
		type="password"
	/>

	<button on:click={handleLogin} class="btn">SUBMIT</button>

	<a class="mt-8 text-sm text-gray-500 underline" href="/register">Don't have an account yet?</a>
</div>
