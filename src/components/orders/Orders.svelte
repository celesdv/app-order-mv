<script lang="ts">
	import { itemHandler } from '../../store/store';
	import Header from '../headers/Header.svelte';
	import TableOrders from './TableOrders.svelte';

	function handleClick(item: number) {
		console.log(item)
		itemHandler.set(item)
	}
</script>

<div class="w-1/3 h-full p-2 max-h-[85vh]">
	<Header title="Proveedores" on:click={() => handleClick(1)} />
	<Header title="Clientes" on:click={() => handleClick(2)} />
	<Header title="Reservas" on:click={() => handleClick(3)} />
	<div class="max-h-[70vh] overflow-y-auto mt-4">
		<TableOrders />
	</div>
</div>

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
