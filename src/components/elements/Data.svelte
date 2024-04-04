<script lang="ts">
	import Book from 'svelte-material-icons/BookAccount.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Save from 'svelte-material-icons/Send.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import type { dataOrder } from './../../interfaces/general.ts';

	let datos: dataOrder = {
		id: 1,
		order_name: 'Fernandez',
		date: new Date(),
		client: {
			first_name: 'Juan Pedro',
			last_name: 'Fernandez',
			phone: "2634625679",
			email: 'email@email.com',
			address: 'Lamadrid 2525',
			city: 'Rivadavia',
			observation: ''
		},
		ars_value: 11000 * 870,
		usd_value: 11000,
		currency_value: 870,
		total_revenues: 150,
		total_payments: 200
	};
	let readonly: boolean = true;
</script>

<div class="px-2">
	<div class="p-2 fondo-translucent max-h-[25rem] h-[25rem] overflow-y-auto">
		<div class="flex justify-between text-sky-800">
			<div class="flex space-x-1 items-center">
				<Book />
				<h2 class="uppercase font-semibold">
					Reserva {datos.order_name} - {datos.date.toLocaleDateString()}
				</h2>
			</div>
			<IconButton
				on:click={() => (readonly = !readonly)}
				variant="flex items-center justify-center min-w-28 p-2 space-x-1 text-neutral-100 {readonly
					? 'bg-gradient-to-b from-sky-900 to-sky-600'
					: 'bg-gradient-to-b from-teal-500 to-teal-800'}"
			>
				{#if readonly}
					<Pencil />
					<p>Editar</p>
				{:else}
					<Save />
					<p>Guardar</p>
				{/if}
			</IconButton>
		</div>

		<div class="w-full">
			<h2 class="uppercase font-semibold text-sky-800">Datos Cliente</h2>
		</div>

		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Nombre:</span>
				<input
					type="text"
					bind:value={datos.client.first_name}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Apellido:</span>
				<input
					type="text"
					bind:value={datos.client.last_name}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">E-mail:</span>
				<input
					type="email"
					bind:value={datos.client.email}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Télefono:</span>
				<input
					type="text"
					bind:value={datos.client.phone}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Domicilio:</span>
				<input
					type="email"
					bind:value={datos.client.address}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Localidad:</span>
				<input
					type="text"
					bind:value={datos.client.city}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-full px-4 items-center">
				<span class="text-sky-800 font-semibold">Observaciones:</span>
				<textarea
					name=""
					id=""
					rows="1"
					class="grow p-1 bg-transparent"
					bind:value={datos.client.observation}
					{readonly}
				></textarea>
			</label>
		</div>
		<div class="w-full mt-3">
			<h2 class="uppercase font-semibold text-sky-800">Datos Reserva</h2>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/3 px-4 items-center">
				<span class="text-sky-800 font-semibold">USD:</span>
				<input
					type="number"
					bind:value={datos.usd_value}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
			<label for="" class="flex space-x-1 w-1/3 px-4 items-center">
				<span class="text-sky-800 font-semibold">Cambio:</span>
				<input
					type="number"
					bind:value={datos.currency_value}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
			<label for="" class="flex space-x-1 w-1/3 px-4 items-center">
				<span class="text-sky-800 font-semibold">ARS:</span>
				<input
					type="number"
					bind:value={datos.ars_value}
					class="grow p-1 bg-transparent"
					{readonly}
				/>
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Cobros en USD:</span>
				<p class="p-1">{datos.total_revenues}</p>
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-4 items-center">
				<span class="text-sky-800 font-semibold">Pagos en USD:</span>
				<p class="p-1">{datos.total_payments}</p>
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
