<script>
	import { page } from '$app/stores';

	let isSidebarOpen = false;

	const DataMenuItems = [
		// { text: 'Contacts', href: 'contacts', icon: 'people' },
		{ text: 'Businesses', href: 'businesses', icon: 'building' }
	];

	const EmailMenuItems = [
		{ text: 'Email Accounts', href: 'email-accounts', icon: 'at' },
		// { text: 'Email Inbox', href: 'email-inbox', icon: 'inbox' },
		{ text: 'Email Templates', href: 'email-templates', icon: 'pencil-square' },
		{ text: 'Email Playground', href: 'email-playground', icon: 'rocket-takeoff' },
		{ text: 'Generate Emails', href: 'generate-emails', icon: 'envelope-plus' },
		{ text: 'Send Emails', href: 'send-emails', icon: 'send' }
		// { text: 'Schedule Emails', href: 'schedule-emails', icon: 'calendar-week' }
	];
</script>

<button
	on:click={() => (isSidebarOpen = false)}
	class={`fixed left-0 top-0 z-20 backdrop-blur-sm md:hidden ${
		isSidebarOpen ? 'h-screen w-screen' : 'h-[0px] w-[0px]'
	}`}
>
</button>

<button on:click={() => (isSidebarOpen = true)} class="fixed left-4 top-5 z-20 text-2xl">
	<i class="bi bi-list"></i>
</button>

<div
	class={`fixed left-0 top-0 z-20 flex h-screen w-[250px] flex-col bg-gray-50 p-4 shadow-md transition-all md:-translate-x-[0%] ${
		isSidebarOpen ? '-translate-x-[0%]' : '-translate-x-[100%]'
	}`}
>
	<div class="mb-4 flex items-center gap-4 font-bold">
		<div class="relative h-[40px] w-[40px] rounded-md rounded-br-none bg-gray-800">
			<i
				class="bi bi-envelope-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-50"
			></i>
		</div>
		<p class="display text-xl">GPT Cold Email</p>
	</div>
	<p class="category">DATA</p>
	{#each DataMenuItems as item}
		<a
			href={`/dash/data/${item.href}`}
			class={`item ${$page.url.pathname === `/dash/data/${item.href}` ? 'selected' : ''}`}
		>
			<i class={'bi bi-' + item.icon}></i>
			<p>{item.text}</p>
		</a>
	{/each}
	<p class="category">EMAIL</p>
	{#each EmailMenuItems as item}
		<a
			href={`/dash/email/${item.href}`}
			class={`item ${$page.url.pathname === `/dash/email/${item.href}` ? 'selected' : ''}`}
		>
			<i class={'bi bi-' + item.icon}></i>
			<p>{item.text}</p>
		</a>
	{/each}
</div>

<style>
	.category {
		@apply mb-2 mt-4 text-sm font-semibold;
		font-family: FixelDisplay, FixelText, 'Inter', sans-serif;
	}

	.item {
		@apply flex items-center gap-4 rounded-md p-3;
	}

	.selected {
		@apply bg-gray-800 text-gray-50;
	}
</style>
