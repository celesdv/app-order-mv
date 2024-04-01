<script lang="ts">
	import { onMount } from 'svelte';
	import { activeItem, suppliersHandler } from '../store/store';
	import OrderDetail from './orders/OrderDetail.svelte';
	import Orders from './orders/Orders.svelte';
	import SupplierDetail from './supplier/SupplierDetail.svelte';
	import { getSuppliers } from '$lib/service/serviceSuppliers';
	import type { clientModel, supplierModel } from '../interfaces/general';
	import ClientDetail from './clients/ClientDetail.svelte';
	import { getClients } from '$lib/service/serviceClients';

	let suppliers: supplierModel[] = [];
	let clients: clientModel[] = [];

	onMount(async () => {
		suppliers = await getSuppliers();
		clients = await getClients();
	});
</script>

<div class="flex-1 flex">
	<Orders />
	{#if $activeItem === 1}
		<SupplierDetail bind:suppliers />
	{:else if $activeItem === 2}
		<ClientDetail bind:clients />
	{:else}
		<OrderDetail />
	{/if}
</div>
