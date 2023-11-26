<script>
	import Sidebar from '$lib/components/dash/Sidebar.svelte';
	import TopNav from '$lib/components/dash/TopNav.svelte';

	export let data;
</script>

<div class="pt-[70px] transition-all md:pl-[250px]">
	<div class="p-4">
		<div class="flex w-full flex-col">
			<slot><!-- optional fallback --></slot>
		</div>
	</div>
</div>
<TopNav name={data.name} />
<Sidebar />
