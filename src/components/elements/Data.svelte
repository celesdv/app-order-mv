<script lang="ts">
	import Book from 'svelte-material-icons/BookAccount.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Save from 'svelte-material-icons/Send.svelte';
	import IconButton from './../buttons/IconButton.svelte';
	import type { dataOrder } from './../../interfaces/general.ts';

	let datos: dataOrder = {
		id: 1,
		order_name: 'Fernandez',
		date: new Date(),
		client: {			
			first_name: 'Juan Pedro',
			last_name:'Fernandez',
			phone: 2634625679,
			email: 'email@email.com',
			adress: 'Lamadrid 2525',
			city: 'Rivadavia',
			observation: ''
		}
	};
	let readonly: boolean = true;
</script>

<div class="px-2">
	<div class="p-2 fondo-translucent max-h-[22rem] h-[22rem] overflow-y-auto">
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

		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-2 items-center">
				<span class="text-sky-800 font-semibold">Nombre:</span>
				<input type="text" bind:value={datos.client.first_name} class="grow p-1 bg-transparent" {readonly} />
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-2 items-center">
				<span class="text-sky-800 font-semibold">Apellido:</span>
				<input type="text" bind:value={datos.client.last_name} class="grow p-1 bg-transparent" {readonly} />
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-2 items-center">
				<span class="text-sky-800 font-semibold">E-mail:</span>
				<input type="email" bind:value={datos.client.email} class="grow p-1 bg-transparent" {readonly} />
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-2 items-center">
				<span class="text-sky-800 font-semibold">Télefono:</span>
				<input type="text" bind:value={datos.client.phone} class="grow p-1 bg-transparent" {readonly} />
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-1/2 px-2 items-center">
				<span class="text-sky-800 font-semibold">Domicilio:</span>
				<input type="email" bind:value={datos.client.adress} class="grow p-1 bg-transparent" {readonly} />
			</label>
			<label for="" class="flex space-x-1 w-1/2 px-2 items-center">
				<span class="text-sky-800 font-semibold">Localidad:</span>
				<input type="text" bind:value={datos.client.city} class="grow p-1 bg-transparent" {readonly} />
			</label>
		</div>
		<div class="flex">
			<label for="" class="flex space-x-1 w-full px-2 items-center">
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
