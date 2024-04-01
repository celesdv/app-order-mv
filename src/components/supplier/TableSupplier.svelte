<script lang="ts">
	import { suppliersStore } from '../../store/store';
	import IconButton from '../buttons/IconButton.svelte';
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import Save from 'svelte-material-icons/ContentSave.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import type { supplierModel } from '../../interfaces/general';
	import { softDeleteSupplier, updateSupplier } from '$lib/service/serviceSuppliers';
	import Spinner from '../loaders/spinner.svelte';

	let row: number = 0;
	let edit: boolean = false;
	let load: boolean = false;

	async function deleteSupplier(data: supplierModel, index:number) {
		load = true;
		data.soft_delete = true;
		let sup = await softDeleteSupplier(data, index);
		if (sup) load = false;
	}

	async function editSupplier(data: supplierModel, index:number) {
		load = true;
		let sup = await updateSupplier(data, index);
		load = false;
		edit = !edit;
	}
</script>

<div class="tabla max-h-[34rem] h-[35rem] p-2">
	<table class="w-full text-sm text-left text-gray-500">
		<thead class="text-sky-800 uppercase">
			<tr>
				<th scope="col" class="px-4 py-2 w-5/6">Nombre</th>
				<th scope="col" class="px-4 py-2">Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#if load}
				<tr class="border-b border-neutral-100">
					<td class="flex w-full justify-center" colspan="2">
						<Spinner size="6rem" color="#f5f5f5" />
					</td>
				</tr>
			{:else if $suppliersStore.length > 0}
				{#each $suppliersStore as data, index}
					<tr class="border-b border-neutral-100">
						<td class="p-1 text-neutral-800 text-center">
							{#if edit && row === index}
								<input
									type="text"
									class="w-full p-1 rounded-lg bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100 text-center border border-neutral-100"
									bind:value={data.name}
								/>
							{:else}
								{data.name}
							{/if}
						</td>
						<td class="p-2 flex items-center justify-center space-x-1">
							{#if edit && row === index}
								<IconButton
									size="h-5"
									variant="bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100"
									on:click={() => editSupplier(data, index)}
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
									on:click={() => deleteSupplier(data, index)}
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
						>No hay proveedores añadidos aún</td
					>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style>
	@media screen and (max-height: 642px) {
		.tabla {
			max-height: 72vh !important;
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
