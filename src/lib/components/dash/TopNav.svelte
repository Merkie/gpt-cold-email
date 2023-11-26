<script lang="ts">
	export let name: string;
</script>

<div
	class="fixed left-0 top-0 z-20 flex h-[70px] w-full items-center gap-4 bg-gray-50 p-4 shadow-md transition-all md:left-[250px] md:w-[calc(100vw-250px)]"
>
	<div
		class="ml-[50px] flex w-[20%] flex-1 items-center gap-4 rounded-md bg-gray-100 p-2 transition-all focus-within:ring-2 md:ml-[0px] md:w-full"
	>
		<i class="bi bi-search pl-2 text-sm"></i>
		<input placeholder="Search..." class="flex-1 bg-transparent outline-none" type="text" />
	</div>
	<button class="flex items-center gap-4 px-4">
		<div class="relative h-[35px] w-[35px] rounded-full bg-gray-200">
			<i
				class="bi bi-person-fill absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-400"
			></i>
		</div>
		<p class="whitespace-nowrap">{name}</p>
		<div class="px-2">
			<i class="bi bi-chevron-down"></i>
		</div>
	</button>
</div>
