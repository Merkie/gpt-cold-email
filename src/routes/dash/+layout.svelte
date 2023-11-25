<script>
	import Sidebar from '$lib/components/dash/Sidebar.svelte'
	import TopNav from '$lib/components/dash/TopNav.svelte'
</script>

<TopNav />
<Sidebar />
<div class="pt-[70px] md:pl-[250px] transition-all">
	<div class="p-4">
		<div class="w-full flex flex-col">
			<slot><!-- optional fallback --></slot>
		</div>
	</div>
</div>
