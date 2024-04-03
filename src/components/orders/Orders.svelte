<script lang="ts">
	import TableOrders from './TableOrders.svelte';
</script>

<div class="max-h-[70vh] overflow-y-auto mt-4">
	<TableOrders />
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
