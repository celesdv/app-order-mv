<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { v4 as uuidv4 } from 'uuid';
	import { saveSupplier } from '$lib/service/serviceSuppliers';
	import { supplierSchema } from '../../interfaces/shemas';
	import type { supplierModel } from '../../interfaces/general';
	import Button from '../buttons/Button.svelte';
	import Spinner from '../loaders/spinner.svelte';
	import Input from '../inputs/Input.svelte';

	export let added: boolean;
	let load: boolean = false;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: supplierSchema,
		validationSchema: yup.object().shape({
			name: yup.string().required()
		}),
		onSubmit: async (values) => {
			await handleAdd(values);
		}
	});

	async function handleAdd(values: any) {
		load = true;
		let data: supplierModel = {
			id: uuidv4(),
			name: values.name,
			soft_delete: false
		};

		let sup = await saveSupplier(data);

		if (sup) {
			$form = supplierSchema;
			load = false;
			added = true;
		} else {
			console.log('error');
		}
	}
</script>

<div class="flex flex-col">
	<header class="text-xl font-bold text-center text-neutral-900">Añadir Proveedor</header>
	<form on:submit={handleSubmit} class="flex flex-col mt-4 space-y-4">
		<Input
			classes="grow"
			id="nombre"
			label="Nombre proveedor"
			error={$errors.name}
			bind:value={$form.name}
			on:change={handleChange}
		/>

		{#if $errors.name}
			<small class="text-red-400 text-center">Debe ingresar el nombre para añadir proveedor</small>
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
