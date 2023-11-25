<script>
	import { page } from '$app/stores'

	const DataMenuItems = [
		{ text: 'Contacts', href: 'contacts', icon: 'people' },
		{ text: 'Businesses', href: 'businesses', icon: 'building' },
		{ text: 'JSON Editor', href: 'json-editor', icon: 'braces' },
	]

	const EmailMenuItems = [
		{ text: 'Generate Emails', href: 'generate-emails', icon: 'envelope-plus' },
		{ text: 'Send Emails', href: 'send-emails', icon: 'send' },
		{ text: 'Schedule Emails', href: 'schedule-emails', icon: 'calendar-week' },
		{ text: 'Email Accounts', href: 'email-accounts', icon: 'at' },
	]
</script>

<div class="fixed left-0 top-0 w-[250px] h-screen bg-gray-50 p-4 flex flex-col">
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
