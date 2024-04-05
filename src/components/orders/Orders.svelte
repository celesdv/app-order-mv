<script lang="ts">
	import Plus from 'svelte-material-icons/Plus.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import SearchInput from '../shared/inputs/SearchInput.svelte';
	import TableOrders from './TableOrders.svelte';
	import Form from '../forms/Form.svelte';
	import { itemHandler } from '../../store/store';

	let add: boolean = false;
	let search: string;

	function handleOpen() {
		itemHandler.set(0);
		add = !add;
	}
</script>

<div class="max-h-[70vh] overflow-y-auto mt-4">
	<div class="flex justify-between p-2">
		<SearchInput bind:search width="w-2/4" />
		<IconButton
			variant="flex items-center justify-center min-w-24 xl:min-w-28 p-2 space-x-1 bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-lg"
			on:click={handleOpen}
		>
			<Plus />
			<p>Añadir</p>
		</IconButton>
	</div>
	<TableOrders />
</div>

<Form bind:showModal={add} />

<style>
	::-webkit-scrollbar {
		width: 8px;
	}
	::-webkit-scrollbar-track {
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #0c4a6e;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #075985;
	}
</style>
