<script lang="ts">
	import { onMount } from 'svelte';
	import { activeItem, activeOrderStore, itemHandler, orderStore } from '../store/store';
	import OrderDetail from './orders/OrderDetail.svelte';
	import Orders from './orders/Orders.svelte';
	import SupplierDetail from './supplier/SupplierDetail.svelte';	
	import ClientDetail from './clients/ClientDetail.svelte';
	import Header from '../components/headers/Header.svelte';
	import { getClients } from '$lib/service/serviceClients';
	import { getOrders } from '$lib/service/serviceOrder.js';
	import { getSuppliers } from '$lib/service/serviceSuppliers';
	import type { clientModel, supplierModel, orderModel } from '../interfaces/general';

	let suppliers: supplierModel[] = [];
	let clients: clientModel[] = [];
	let orders: orderModel[] =[]

	onMount(async () => {
		suppliers = await getSuppliers();
		clients = await getClients();
		await getOrders();
	});

	function handleClick(item: number) {
		itemHandler.set(item);
	}

	$: console.log($orderStore)
</script>

<div class="flex-1 flex">
	<div class="w-1/3 h-full p-2 max-h-[85vh]">
		<Header title="Proveedores" on:click={() => handleClick(1)} />
		<Header title="Clientes" on:click={() => handleClick(2)} />
		<Header title="Reservas" showButton={false}/>
		<Orders />
	</div>

	{#if $activeItem === 1}
		<SupplierDetail bind:suppliers />
	{:else if $activeItem === 2}
		<ClientDetail bind:clients />
	{:else if $activeOrderStore.id != ''}
		<OrderDetail />
	{/if}
</div>
