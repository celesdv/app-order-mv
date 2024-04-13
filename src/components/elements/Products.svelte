<script lang="ts">
	import Plus from 'svelte-material-icons/Plus.svelte';
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import type { productModel } from '../../interfaces/general';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import SearchInput from '../shared/inputs/SearchInput.svelte';
	import { activeOrderStore, itemHandler } from '../../store/store';
	import Form from '../forms/Form.svelte';

	let add: boolean = false;

	function openForm() {
		itemHandler.set(5);
		add = !add;
	}
</script>

<Form bind:showModal={add} />

<div class="px-2">
	<div class="p-2 fondo-translucent">
		<div class="flex justify-between">
			<SearchInput />
			<IconButton
				on:click={openForm}
				variant="flex items-center justify-center min-w-28 p-2 space-x-1 bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-lg"
			>
				<Plus />
				<p>Añadir</p>
			</IconButton>
		</div>
		<div class="relative tabla max-h-[21rem] h-[21rem] overflow-y-auto mt-2">
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-sky-800 uppercase">
					<tr>
						<th scope="col" class="px-4 py-2 w-1/3">Descripcion</th>
						<th scope="col" class="px-4 py-2 w-2/6">Provedor</th>
						<th scope="col" class="px-4 py-2">Valor</th>
						<th scope="col" class="px-4 py-2">Moneda</th>
						<th scope="col" class="px-4 py-2">Balance</th>
						<th scope="col" class="px-4 py-2">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{#if $activeOrderStore.products.length > 0}
						{#each $activeOrderStore.products as product}
							<tr class="border-b border-neutral-100">
								<td class="p-1 ps-4 text-neutral-800">{product.description}</td>
								<td class="p-1 text-neutral-800">{product.supplier.name}</td>
								<td class="p-1 text-neutral-800 text-center">{product.value}</td>
								<td class="p-1 text-neutral-800 text-center">{product.currency}</td>
								<td class="p-1 text-neutral-800 text-center">
									{product.balance ? product.balance : 'Sin pagos'}
								</td>
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
							</tr>{/each}
					{:else}
						<tr class="border-b border-neutral-100">
							<td class="p-1 text-neutral-800 text-center" colspan="6"
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
			max-height: 40vh !important;
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
