<script>
	import { page } from '$app/stores'

	let isSidebarOpen = $state(false)

	const DataMenuItems = [
		{ text: 'Contacts', href: 'contacts', icon: 'people' },
		{ text: 'Businesses', href: 'businesses', icon: 'building' },
	]

	const EmailMenuItems = [
		{ text: 'Email Accounts', href: 'email-accounts', icon: 'at' },
		{ text: 'Email Templates', href: 'email-templates', icon: 'pencil-square' },
		{ text: 'Email Playground', href: 'email-playground', icon: 'rocket-takeoff' },
		{ text: 'Generate Emails', href: 'generate-emails', icon: 'envelope-plus' },
		{ text: 'Send Emails', href: 'send-emails', icon: 'send' },
		{ text: 'Schedule Emails', href: 'schedule-emails', icon: 'calendar-week' },
	]
</script>

<button
	on:click={() => (isSidebarOpen = false)}
	class={`fixed z-40 top-0 left-0 backdrop-blur-sm md:hidden ${
		isSidebarOpen ? 'w-screen h-screen' : 'w-[0px] h-[0px]'
	}`}>
</button>

<button on:click={() => (isSidebarOpen = true)} class="fixed z-40 top-5 left-4 text-2xl">
	<i class="bi bi-list"></i>
</button>

<div
	class={`fixed z-40 left-0 top-0 w-[250px] h-screen bg-gray-50 p-4 flex flex-col shadow-md md:-translate-x-[0%] transition-all ${
		isSidebarOpen ? '-translate-x-[0%]' : '-translate-x-[100%]'
	}`}>
	<div class="flex gap-4 items-center font-bold mb-4">
		<div class="w-[40px] h-[40px] bg-gray-800 rounded-md rounded-br-none relative">
			<i
				class="bi bi-envelope-check absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl text-gray-50"
			></i>
		</div>
		<p class="display text-xl">GPT Cold Email</p>
	</div>
	<p class="category">DATA</p>
	{#each DataMenuItems as item}
		<a
			href={`/dash/data/${item.href}`}
			class={`item ${$page.url.pathname === `/dash/data/${item.href}` ? 'selected' : ''}`}>
			<i class={'bi bi-' + item.icon}></i>
			<p>{item.text}</p>
		</a>
	{/each}
	<p class="category">EMAIL</p>
	{#each EmailMenuItems as item}
		<a
			href={`/dash/email/${item.href}`}
			class={`item ${$page.url.pathname === `/dash/email/${item.href}` ? 'selected' : ''}`}>
			<i class={'bi bi-' + item.icon}></i>
			<p>{item.text}</p>
		</a>
	{/each}
</div>

<style>
	.category {
		@apply mt-4 mb-2 text-sm font-semibold;
		font-family: FixelDisplay, FixelText, 'Inter', sans-serif;
	}

	.item {
		@apply p-3 rounded-md flex items-center gap-4;
	}

	.selected {
		@apply bg-gray-800 text-gray-50;
	}
</style>
