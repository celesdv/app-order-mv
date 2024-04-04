<script lang="ts">
	import Plus from 'svelte-material-icons/Plus.svelte';
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import type { paymentModel, productModel } from '../../interfaces/general';

	let payments: paymentModel[] = [
		{
			date: new Date(),
			ars_value: 10000,
			currency_value: 100,
			usd_value: 10000 / 100
		},
		{
			date: new Date(),
			ars_value: 10000,
			currency_value: 100,
			usd_value: 10000 / 100
		}
	];
	let products: productModel[] = [
		{
			id: 1,
			description: 'aaa',
			supplier: { name: 'Mitika' },
			value: 150,
			currency: 'USD',
			payments: [],
			usd_value: 150,
			taxes:{}
		},
		{
			id: 2,
			description: 'aaa',
			supplier: { name: 'Toselli' },
			value: 350,
			currency: 'USD',
			payments: payments,
			usd_value: 150,
			taxes:{}
		}
	];

	const sumaPagos = (product: productModel) => {
		let total: number = 0;
		if (product.currency === 'ARS') {
			product.payments.forEach((element) => {
				total = total + element.ars_value;
			});
		} else {
			product.payments.forEach((element) => {
				total = total + element.usd_value;
			});
		}
		return total;
	};
</script>

<div class="px-2">
	<div class="p-2 fondo-translucent max-h-[25rem] h-[25rem] overflow-y-auto">
		{#if products.length > 0}
			{#each products as prod}
				<div class="flex justify-between text-center space-x-4">
					<div
						class="flex items-center divide-x rounded-full w-full bg-gradient-to-t from-teal-500 to-teal-800 text-neutral-100 shadow-lg"
					>
						<div class="px-1 w-1/3">Producto: {prod.description}</div>
						<div class="px-1 w-1/3">Proveedor: {prod.supplier.name}</div>
						<div class="px-1 w-1/3">Valor: {prod.value} {prod.currency}</div>
					</div>
					<IconButton
						variant="flex items-center justify-center min-w-28 p-2 space-x-1 bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-lg"
					>
						<Plus />
						<p>Añadir</p>
					</IconButton>
				</div>

				{#if prod.payments.length > 0}
					<div class="flex space-x-4 my-3">
						<div
							class="flex flex-col items-center justify-center h-fit divide-y rounded w-1/3 bg-gradient-to-t from-red-400 to-red-800 text-neutral-100 shadow-lg"
						>
							<div class="p-2 text-center w-full">Total: {sumaPagos(prod)} {prod.currency}</div>
							<div class="p-2 text-center w-full">
								Saldos: {prod.value - sumaPagos(prod)}
								{prod.currency}
							</div>
						</div>
						<table class="w-full text-sm text-center text-gray-500">
							<thead class="text-sky-800 uppercase">
								<tr>
									<th scope="col" class="px-4 py-2">Fecha</th>
									<th scope="col" class="px-4 py-2">ARS</th>
									<th scope="col" class="px-4 py-2">Cambio</th>
									<th scope="col" class="px-4 py-2">USD</th>
									<th scope="col" class="px-4 py-2 w-[10%]">Acciones</th>
								</tr>
							</thead>
							<tbody>
								{#each prod.payments as data}
									<tr class="border-b border-neutral-100">
										<td class="p-1 text-neutral-800">{data.date.toLocaleDateString()}</td>
										<td class="p-1 text-neutral-800">{data.ars_value}</td>
										<td class="p-1 text-neutral-800">{data.currency_value}</td>
										<td class="p-1 text-neutral-800">{data.usd_value}</td>
										<td class="p-2 flex items-center justify-center space-x-1">
											<IconButton
												size="h-5"
												variant="bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100"
												on:click={() => console.log('Archivar')}
											>
												<Edit />
											</IconButton>
											<IconButton
												size="h-5"
												variant="bg-gradient-to-b from-red-400 to-red-800 text-neutral-100"
												on:click={() => console.log('Ver')}
											>
												<Delete />
											</IconButton></td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else}
					<p class="text-center mb-3 text-neutral-800">No se han registrado pagos aún</p>
				{/if}
			{/each}
		{:else}
			<p class="text-center text-neutral-800">No se han registrado productos a pagar aún</p>
		{/if}
	</div>
</div>

<style>
	.fondo-translucent {
		background: linear-gradient(
			90deg,
			rgba(245, 245, 245, 0) 0%,
			rgba(245, 245, 245, 1) 50%,
			rgba(245, 245, 245, 0) 100%
		);
	}
	@media screen and (max-height: 642px) {
		.fondo-translucent {
			max-height: 50vh !important;
		}
	}
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
