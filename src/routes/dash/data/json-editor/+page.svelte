<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api'
	import nord from 'monaco-themes/themes/Nord.json'
	import output from '$lib/output.json'

	let editor: Monaco.editor.IStandaloneCodeEditor
	let monaco: typeof Monaco
	let editorContainer: HTMLElement

	onMount(async () => {
		// Init Monaco (we gotta do it like this)
		monaco = (await import('$lib/resources/monaco')).default
		editor = monaco.editor.create(editorContainer)

		// Set the initial value of the editor
		const model = monaco.editor.createModel(JSON.stringify(output, null, 2), 'json')
		editor.setModel(model)

		// @ts-expect-error theme isn't typed but this works
		monaco.editor.defineTheme('nord', nord)
		monaco.editor.setTheme('nord')
	})

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose())
		editor?.dispose()
	})

	async function handleUpload() {
		const response = await fetch('/api/v1/data/upload', {
			method: 'POST',
			body: JSON.stringify({
				data: editor.getValue(),
			}),
		})
	}
</script>

<div class="px-4 bg-[#2e3440] rounded-md">
	<div class="container" bind:this={editorContainer} />
</div>

<div class="mt-4 flex items-center gap-4">
	<button disabled={true} class="bg-gray-800 text-gray-50 p-3 px-16 rounded-md"
		>Save Changes</button>
	<!-- <button on:click={handleUpload} class="bg-gray-800 text-gray-50 p-3 px-16 rounded-md"
		>Upload</button> -->
</div>

<style>
	.container {
		width: 100%;
		height: 600px;
	}
</style>
