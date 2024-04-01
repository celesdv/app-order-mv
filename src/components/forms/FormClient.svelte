<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { v4 as uuidv4 } from 'uuid';
	import { saveClient } from '$lib/service/serviceClients';
	import { clientSchema } from '../../interfaces/shemas';
	import type { clientModel } from '../../interfaces/general';
	import Spinner from '../loaders/spinner.svelte';
	import Button from '../buttons/Button.svelte';
	import Input from '../inputs/Input.svelte';

	export let added: boolean;
	let load: boolean = false;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: clientSchema,
		validationSchema: yup.object().shape({
			first_name: yup.string().required(),
			last_name: yup.string().required(),
			phone: yup.string().min(10).max(10).required(),
			email: yup.string().email(),
			address: yup.string(),
			city: yup.string(),
			observation: yup.string()
		}),
		onSubmit: async (values) => {
			await handleAdd(values);
		}
	});

	async function handleAdd(values: any) {
		load = true;
		let data: clientModel = {
			id: uuidv4(),
			first_name: values.first_name,
			last_name: values.last_name,
			phone: values.phone,
			email: values.email,
			address: values.address,
			city: values.city,
			observation: values.observation,
			soft_delete: false
		};

		let sup = await saveClient(data);

		if (sup) {
			$form = clientSchema;
			load = false;
			added = true;
		} else {
			console.log('error');
		}
	}
</script>

<div class="flex flex-col">
	<header class="text-xl font-bold text-center text-neutral-900">Añadir Cliente</header>
	<form on:submit={handleSubmit} class="flex flex-col mt-4 space-y-4">
		<div class="flex space-x-4">
			<Input
				classes="grow"
				id="nombre"
				label="Nombre"
				error={$errors.first_name}
				bind:value={$form.first_name}
				on:change={handleChange}
			/>
			<Input
				classes="grow"
				id="apellido"
				label="Apellido"
				error={$errors.last_name}
				bind:value={$form.last_name}
				on:change={handleChange}
			/>
		</div>

		<div class="flex space-x-4">
			<Input
				classes="grow"
				type="phone"
				id="telefono"
				label="Télefono"
				maxlength={10}
				error={$errors.phone}
				bind:value={$form.phone}
				on:change={handleChange}
			/>
			<Input
				classes="grow"
				id="localidad"
				label="Localidad"
				error={$errors.city}
				bind:value={$form.city}
				on:change={handleChange}
			/>
		</div>

		<Input
			id="direccion"
			label="Dirección"
			error={$errors.address}
			bind:value={$form.address}
			on:change={handleChange}
		/>

		<Input
			type="email"
			id="email"
			label="Email"
			error={$errors.email}
			bind:value={$form.email}
			on:change={handleChange}
		/>

		<Input
			id="observaciones"
			label="Observaciones"
			error={$errors.observation}
			bind:value={$form.observation}
			on:change={handleChange}
		/>

		{#if $errors.first_name || $errors.last_name || $errors.phone}
			<small class="text-red-400 text-center"
				>Debe ingresar el nombre, apellido y télefono para añadir el cliente</small
			>
		{/if}

		{#if $errors.email || $errors.address || $errors.city || $errors.observation}
			<small class="text-red-400 text-center">Revise los datos ingreados</small>
		{/if}

		{#if load}
			<div class="flex w-full justify-center">
				<Spinner size="3rem" color="#f5f5f5" />
			</div>
		{:else}
			<Button
				title="Añadir"
				variants="rounded-lg p-3 font-semibold text-xl bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-xl"
			/>
		{/if}
	</form>
</div>
