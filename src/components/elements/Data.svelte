<script lang="ts">
	import Book from 'svelte-material-icons/BookAccount.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Save from 'svelte-material-icons/Send.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import { activeOrderStore } from '../../store/store';
	import Spinner from '../shared/loaders/spinner.svelte';
	import { updateOrder } from '$lib/service/serviceOrder';

	let readonly: boolean = true;
	let load: boolean = false;

	async function editData() {
		load = true
		let ord =await updateOrder($activeOrderStore, 1)
		if(ord) load = false
	}
</script>

<div class="px-2">
	<div class="p-2 fondo-translucent max-h-[25rem] h-[25rem] overflow-y-auto space-y-2">
		<div class="flex justify-between text-sky-800">
			<div class="flex space-x-1 items-center">
				<Book />
				<h2 class="uppercase font-semibold">
					Reserva {$activeOrderStore.client?.last_name} - Fecha: {$activeOrderStore.date?.toLocaleDateString()}
				</h2>
			</div>
		</div>

		<div class="w-full">
			<h2 class="uppercase font-semibold text-sky-800">Datos Cliente</h2>
		</div>

		<div>
			<div class="flex">
				<div class="flex space-x-2 w-1/2 px-4 items-center">
					<span class="text-sky-800 font-semibold">Nombre: </span>
					<span>{$activeOrderStore.client?.first_name}</span>
				</div>
				<div class="flex space-x-2 w-1/2 px-4 items-center">
					<span class="text-sky-800 font-semibold">Apellido: </span>
					<span>{$activeOrderStore.client?.last_name}</span>
				</div>
			</div>
			<div class="flex">
				<div class="flex space-x-2 w-1/2 px-4 items-center">
					<span class="text-sky-800 font-semibold">E-mail: </span>
					<span>{$activeOrderStore.client?.email}</span>
				</div>
				<div class="flex space-x-2 w-1/2 px-4 items-center">
					<span class="text-sky-800 font-semibold">Télefono: </span>
					<span>{$activeOrderStore.client?.phone}</span>
				</div>
			</div>
			<div class="flex">
				<div class="flex space-x-2 w-1/2 px-4 items-center">
					<span class="text-sky-800 font-semibold">Domicilio: </span>
					<span>{$activeOrderStore.client?.address}</span>
				</div>
				<div class="flex space-x-2 w-1/2 px-4 items-center">
					<span class="text-sky-800 font-semibold">Localidad: </span>
					<span>{$activeOrderStore.client?.city}</span>
				</div>
			</div>
			<div class="flex">
				<div class="flex space-x-2 w-full px-4 items-center">
					<span class="text-sky-800 font-semibold">Observaciones: </span>
					<span>{$activeOrderStore.client?.observation}</span>
				</div>
			</div>
		</div>

		<div class="w-full mt-3">
			<h2 class="uppercase font-semibold text-sky-800">Datos Reserva</h2>
		</div>

		{#if !load}
			<div class="flex space-x-3 items-center">
				<div class="w-3/4">
					<div class="flex">
						<label for="" class="flex space-x-1 w-1/3 px-4 items-center">
							<span class="text-sky-800 font-semibold">USD:</span>
							<input
								type="number"
								bind:value={$activeOrderStore.usd_value}
								class="p-1 bg-transparent w-1/2"
								{readonly}
							/>
						</label>
						<label for="" class="flex space-x-1 w-1/3 px-4 items-center">
							<span class="text-sky-800 font-semibold">Cambio:</span>
							<select
								name="currency"
								id="currency"
								bind:value={$activeOrderStore.currency}
								class="p-1 bg-transparent w-1/2"
								disabled={readonly}
							>
								<option value="ARS">ARS</option>
								<option value="USD">USD</option>
							</select>
						</label>
						<label for="" class="flex space-x-1 w-1/3 px-4 items-center">
							<span class="text-sky-800 font-semibold">ARS:</span>
							<input
								type="number"
								bind:value={$activeOrderStore.ars_value}
								class="p-1 bg-transparent w-1/2"
								{readonly}
							/>
						</label>
					</div>
				</div>
				<div class="w-1/4">
					{#if readonly}
						<IconButton
							on:click={() => (readonly = !readonly)}
							variant="flex items-center justify-center min-w-28 p-2 space-x-1 text-neutral-100 bg-gradient-to-b from-sky-900 to-sky-600"
						>
							<Pencil />
							<p>Editar</p>
						</IconButton>
					{:else}
						<IconButton
							on:click={editData}
							variant="flex items-center justify-center min-w-28 p-2 space-x-1 text-neutral-100 bg-gradient-to-b from-teal-500 to-teal-800"
						>
							<Save />
							<p>Guardar</p>
						</IconButton>
					{/if}
				</div>
			</div>
		{:else}
			<div class="w-full flex justify-center">
				<Spinner size="2rem" color="#f5f5f5" />
			</div>
		{/if}
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Cobros en USD:</span>
				<p class="p-1">{$activeOrderStore.total_revenues}</p>
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Pagos en USD:</span>
				<p class="p-1">{$activeOrderStore.total_payments}</p>
			</label>
		</div>
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
			height: 50vh !important;
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
