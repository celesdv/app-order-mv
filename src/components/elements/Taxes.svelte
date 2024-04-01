<script lang="ts">
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import Save from 'svelte-material-icons/ContentSave.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import type { productModel, taxModel } from '../../interfaces/general';

	let edit: boolean = false;
	let row: number;

	let taxes: taxModel[] = [
		{
			exempt: 1000,
			not_taxed: 1000,
			aliquot_10: 1000 * 1.105,
			aliquot_21: 1000 * 1.21
		},
		{
			exempt: 500,
			not_taxed: 1000,
			aliquot_10: 1000 * 1.105,
			aliquot_21: 900 * 1.21
		},
		{
			aliquot_21: 1100 * 1.21
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
			taxes: taxes[0]
		},
		{
			id: 2,
			description: 'aaa',
			supplier: { name: 'Toselli' },
			value: 350,
			currency: 'USD',
			payments: [],
			usd_value: 150,
			taxes: taxes[1]
		},
		{
			id: 2,
			description: 'aaa',
			supplier: { name: 'Melcej Viajes' },
			value: 350,
			currency: 'USD',
			payments: [],
			usd_value: 150,
			taxes: taxes[2]
		}
	];

	function aliquot(product: productModel, ali: number) {
		let aliquot: number = 0;
		if (product.taxes?.aliquot_10 && ali === 10)
			aliquot = aliquot + product.taxes.aliquot_10 * 1.105;
		if (product.taxes?.aliquot_21 && ali === 21)
			aliquot = aliquot + product.taxes.aliquot_21 * 1.21;
		return aliquot;
	}

	function total(product: productModel) {
		let total: number = 0;
		if (product.taxes?.exempt) total = total + product.taxes?.exempt;
		if (product.taxes?.not_taxed) total = total + product.taxes?.not_taxed;
		if (product.taxes?.aliquot_10) total = total + aliquot(product, 10);
		if (product.taxes?.aliquot_21) total = total + aliquot(product, 21);
		return total;
	}

	function IVA(product: productModel) {
		let total: number = 0;
		if (product.taxes?.aliquot_10)
			total = total + (aliquot(product, 10) - product.taxes?.aliquot_10);
		if (product.taxes?.aliquot_21)
			total = total + (aliquot(product, 21) - product.taxes?.aliquot_21);
		return total;
	}

	function IIBB(total: number, iva: number) {
		let iibb: number = total - iva;
		return iibb;
	}

	function getValue(element: number) {
		let total = 0;
		if (element) total = total + element;
		return total;
	}

	function deleteTax() {
		console.log('Tax deleted');
	}

	function editTax() {
		console.log('Tax edited');
		edit = !edit;
	}
</script>

<div class="px-2">
	<div class="p-2 fondo-translucent">
		<div class="relative tabla max-h-[21rem] h-[21rem] overflow-y-auto mt-2">
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-sky-800 uppercase">
					<tr>
						<th scope="col" class="px-4 py-2 w-[20%]"></th>
						<th scope="col" class="px-4 py-2 w-[10%]">Exento</th>
						<th scope="col" class="px-4 py-2 w-[10%]">No Gravado</th>
						<th scope="col" class="px-4 py-2 w-[10%]">10,50%</th>
						<th scope="col" class="px-4 py-2 w-[10%]">21,00%</th>
						<th scope="col" class="px-4 py-2 w-[10%]">Total</th>
						<th scope="col" class="px-4 py-2 w-[10%]">IVA</th>
						<th scope="col" class="px-4 py-2 w-[10%]">BI IIBB</th>
						<th scope="col" class="px-4 py-2 w-[10%]"></th>
					</tr>
				</thead>
				<tbody>
					{#if products.length > 0}
						{#each products as product, index}
							<tr class="border-b border-neutral-100">
								<td class="p-1 ps-4 text-neutral-800">
									{product.supplier.name}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{#if edit && row === index}
										<input
											type="number"
											class="w-full p-1 rounded-lg bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100 text-center border border-neutral-100"
											bind:value={product.taxes.exempt}
										/>
									{:else}
										{product.taxes?.exempt ? product.taxes?.exempt : ''}
									{/if}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{#if edit && row === index}
										<input
											type="number"
											class="w-full p-1 rounded-lg bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100 text-center border border-neutral-100"
											bind:value={product.taxes.not_taxed}
										/>
									{:else}
										{product.taxes?.not_taxed ? product.taxes?.not_taxed : ''}
									{/if}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{#if edit && row === index}
										<input
											type="number"
											class="w-full p-1 rounded-lg bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100 text-center border border-neutral-100"
											bind:value={product.taxes.aliquot_10}
										/>
									{:else}
										{aliquot(product, 10) != 0 ? aliquot(product, 10).toFixed(2) : ''}
									{/if}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{#if edit && row === index}
										<input
											type="number"
											class="w-full p-1 rounded-lg bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100 text-center border border-neutral-100"
											bind:value={product.taxes.aliquot_21}
										/>
									{:else}
										{aliquot(product, 21) != 0 ? aliquot(product, 21).toFixed(2) : ''}
									{/if}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{total(product).toFixed(2)}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{IVA(product).toFixed(2)}
								</td>
								<td class="p-1 text-neutral-800 text-center">
									{product.supplier.name === 'Melcej Viajes'
										? IIBB(total(product), IVA(product))
										: ''}
								</td>
								<td class="p-2 flex items-center justify-center space-x-1">
									{#if edit && row === index}
										<IconButton
											size="h-5"
											variant="bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100"
											on:click={editTax}
										>
											<Save />
										</IconButton>
										<IconButton
											size="h-5"
											variant="bg-gradient-to-b from-amber-400 to-amber-800 text-neutral-100"
											on:click={() => (edit = !edit)}
										>
											<Close />
										</IconButton>
									{:else}
										<IconButton
											size="h-5"
											variant="bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100"
											on:click={() => {
												(row = index), (edit = !edit);
											}}
										>
											<Edit />
										</IconButton>
										<IconButton
											size="h-5"
											variant="bg-gradient-to-b from-red-400 to-red-800 text-neutral-100"
											on:click={deleteTax}
										>
											<Delete />
										</IconButton>
									{/if}
								</td>
							</tr>
						{/each}
					{:else}
						<tr class="border-b border-neutral-100">
							<td class="p-1 text-neutral-800 text-center" colspan="4"
								>No hay productos añadidos aún</td
							>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	@media screen and (max-height: 642px) {
		.tabla {
			max-height: 46vh !important;
		}
	}
	.fondo-translucent {
		background: linear-gradient(
			90deg,
			rgba(245, 245, 245, 0) 0%,
			rgba(245, 245, 245, 1) 50%,
			rgba(245, 245, 245, 0) 100%
		);
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
