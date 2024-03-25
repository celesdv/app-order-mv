<script lang="ts">
	import { accordionHandler, activoAccordion } from '../../store/store';
	import Header from '../headers/Header.svelte';

	export let element: string = '';

	function handleOpen(item: string) {
		accordionHandler.set(item);
	}
</script>

<Header title={element} on:click={() => handleOpen(element)}></Header>
