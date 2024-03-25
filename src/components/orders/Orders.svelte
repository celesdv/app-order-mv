<script>
	import Header from '../headers/Header.svelte';
	import TableOrders from './TableOrders.svelte';

	function handleClick() {
		console.log('Cargar nuevo');
	}
</script>

<div class="w-1/3 h-full p-2 max-h-[85vh]">
	<Header title="Reservas" on:click={() => handleClick()} />
	<div class="max-h-[75vh] overflow-y-auto mt-4">
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
