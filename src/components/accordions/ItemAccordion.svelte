<script lang="ts">
	import { accordionHandler } from '../../store/store';
	import IconButton from '../buttons/IconButton.svelte';
	import Header from '../headers/Header.svelte';
	import Arrow from 'svelte-material-icons/ArrowDown.svelte';

	export let element: string = '';

	function handleOpen(item: string) {
		accordionHandler.set(item);
	}
</script>

<div
	class="w-100 flex justify-between rounded-lg px-4 py-2 text-sky-800 font-semibold bg-gradient-to-b from-neutral-100 to-neutral-400 shadow-md"
>
	<h2 class="">{element}</h2>
	<IconButton on:click={() => handleOpen(element)} variant="bg-gradient-to-b from-neutral-400 to-neutral-600 text-neutral-100">
		<Arrow />
	</IconButton>
</div>
<!-- <Header title={element} on:click={() => handleOpen(element)}></Header> -->
