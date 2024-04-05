<script lang="ts">
	import { clientStore } from '../../store/store';
	import Plus from 'svelte-material-icons/Plus.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import Save from 'svelte-material-icons/ContentSave.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Spinner from '../shared/loaders/spinner.svelte';
	import type { clientModel } from '../../interfaces/general';
	import { softDeleteClient, updateClient } from '$lib/service/serviceClients';
	import ConfirmModal from '../shared/modals/confirmModal.svelte';
	import DrawerClient from './DrawerClient.svelte';

	let row: number = 0;
	let edit: boolean = false;
	let load: boolean = false;
	let showModal: boolean = false;
	let dataClient: clientModel;
	let indexClient: number;
	let confirm: boolean = false;
	let open = false;

	function confirmDelete() {
		showModal = true;
	}

	async function deleteClient() {
		load = true;
		dataClient.soft_delete = true;
		let sup = await softDeleteClient(dataClient, indexClient);
		if (sup) load = false;
	}

	async function editClient(data: clientModel, index: number) {
		load = true;
		let sup = await updateClient(data, index);
		load = false;
		edit = !edit;
	}

	$: if (confirm) deleteClient(), (confirm = false);
</script>

<ConfirmModal bind:showModal bind:confirm>
	<div class="mb-2">
		<h3 class="text-lg text-center">¿Desea eliminar el cliente?</h3>
	</div>
</ConfirmModal>

<DrawerClient bind:open bind:dataClient index={indexClient}/>

<div class="tabla max-w-full max-h-[34rem] h-[35rem] p-2">
	<table class="w-full overflow-y-auto text-sm text-left text-gray-500">
		<thead class="text-sky-800 uppercase text-center">
			<tr>
				<th scope="col" class="px-4 py-2 w-[20%]">Nombre</th>
				<th scope="col" class="px-4 py-2 w-[20%]">Apellido</th>
				<th scope="col" class="px-4 py-2 w-[20%]">Télefono</th>
				<th scope="col" class="px-4 py-2 w-[20%]">Email</th>
				<th scope="col" class="px-4 py-2 w-[20%]">Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#if load}
				<tr class="border-b border-neutral-100">
					<td colspan="8">
						<div class="w-full flex justify-center">
							<Spinner size="6rem" color="#f5f5f5" />
						</div>
					</td>
				</tr>
			{:else if $clientStore.length > 0}
				{#each $clientStore as data, index}
					<tr class="border-b border-neutral-100">
						<td class="p-1 text-neutral-800 text-center">
							{#if edit && row === index}
								<input
									type="text"
									class="w-full p-1 rounded-lg bg-transparent text-neutral-800 text-center border border-teal-800"
									bind:value={data.first_name}
								/>
							{:else}
								{data.first_name}
							{/if}
						</td>

						<td class="p-1 text-neutral-800 text-center">
							{#if edit && row === index}
								<input
									type="text"
									class="w-full p-1 rounded-lg bg-transparent text-neutral-800 text-center border border-teal-800"
									bind:value={data.last_name}
								/>
							{:else}
								{data.last_name}
							{/if}
						</td>

						<td class="p-1 text-neutral-800 text-center">
							{#if edit && row === index}
								<input
									type="text"
									class="w-full p-1 rounded-lg bg-transparent text-neutral-800 text-center border border-teal-800"
									bind:value={data.phone}
								/>
							{:else}
								{data.phone}
							{/if}
						</td>

						<td class="p-1 text-neutral-800 text-center">
							{#if edit && row === index}
								<input
									type="text"
									class="w-full p-1 rounded-lg bg-transparent text-neutral-800 text-center border border-teal-800"
									bind:value={data.email}
								/>
							{:else}
								{data.email}
							{/if}
						</td>

						<td class="p-2 flex items-center justify-center space-x-1">
							{#if edit && row === index}
								<IconButton
									size="h-5"
									variant="bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100"
									on:click={() => editClient(data, index)}
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
									on:click={() => {
										confirmDelete(), (dataClient = data), (indexClient = index);
									}}
								>
									<Delete />
								</IconButton>
								<IconButton
									size="h-5"
									variant="bg-gradient-to-b from-neutral-400 to-neutral-800 text-neutral-100"
									on:click={() => {
										(open = true), (dataClient = data), (indexClient = index);
									}}
								>
									<Plus />
								</IconButton>
							{/if}
						</td>
					</tr>
				{/each}
			{:else}
				<tr class="border-b border-neutral-100">
					<td class="p-1 text-neutral-800 text-center" colspan="8">No hay clientes añadidos aún</td>
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
