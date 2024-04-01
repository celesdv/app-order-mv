<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import Button from '../buttons/Button.svelte';
	import { saveSupplier } from '$lib/service/serviceSuppliers';
	import type { supplierModel } from '../../interfaces/general';
	import { supplierSchema } from '../../interfaces/shemas';
	import { v4 as uuidv4 } from 'uuid';
	import Spinner from '../loaders/spinner.svelte';

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
		<label
			for="Nombre"
			class="relative rounded-lg border {$form.name
				? 'border-sky-600'
				: 'border-neutral-900'} {$errors.name ? 'border-red-400' : 'border-neutral-900'}"
		>
			<span
				class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 text-neutral-100
                {$form.name ? 'top-0' : 'top-1/2 opacity-0'} duration-300"
			>
				Nombre proveedor
			</span>
			<input
				on:change={handleChange}
				bind:value={$form.name}
				placeholder="Nombre proveedor"
				type="text"
				class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0 placeholder:text-neutral-800"
			/>
		</label>

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
