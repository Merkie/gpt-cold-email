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

		if (response.token) await goto('/dash/data/contacts');
	}
</script>

<div
	class="w-[180vw] h-[180vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] bg-gray-400 rounded-full opacity-20"
></div>

<div class="flex gap-4 items-center font-bold mb-4 fixed top-8 left-8">
	<div class="w-[40px] h-[40px] bg-gray-800 rounded-md rounded-br-none relative">
		<i
			class="bi bi-envelope-check absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl text-gray-50"
		></i>
	</div>
	<p class="display text-xl">GPT Cold Email</p>
</div>

<div
	class="bg-gray-50 shadow-md rounded-lg flex flex-col w-[90%] max-w-[400px] p-8 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
	<p class="mb-8 text-3xl font-bold display">Log In</p>
	<p class="mb-2">Email</p>
	<input
		bind:value={email}
		class="flex-1 outline-none bg-gray-100 border border-gray-200 p-2 rounded-md mb-4"
		type="email"
	/>
	<p class="mb-2">Password</p>
	<input
		bind:value={password}
		class="flex-1 outline-none bg-gray-100 border border-gray-200 p-2 rounded-md mb-4"
		type="password"
	/>

	<button on:click={handleLogin} class="p-4 font-bold text-gray-50 bg-gray-800 rounded-md"
		>SUBMIT</button
	>

	<a class="mt-8 text-sm underline text-gray-500" href="/register">Don't have an account yet?</a>
</div>
