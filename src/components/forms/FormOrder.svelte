<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { v4 as uuidv4 } from 'uuid';
	import { orderSchema } from '../../interfaces/shemas';
	import Spinner from '../shared/loaders/spinner.svelte';
	import Button from '../shared/buttons/Button.svelte';
	import Select from '../shared/inputs/Select.svelte';
	import { clientStore } from '../../store/store';
	import Input from '../shared/inputs/Input.svelte';
	import type { orderModel } from '../../interfaces/general';
	import { saveOrder } from '$lib/service/serviceOrder';

	export let added: boolean;

	let load: boolean = false;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: orderSchema,
		validationSchema: yup.object().shape({
			date: yup.string().required(),
			client: yup.object().required(),
			currency: yup.string().required()
		}),
		onSubmit: async (values) => {
			await handleAdd(values);
		}
	});

	async function handleAdd(values: any) {
		let order: orderModel = {
			id: uuidv4(),
			date: new Date(values.date),
			client: values.client,
			ars_value: 0,
			usd_value: 0,
			currency: values.currency,
			total_revenues: 0,
			total_payments: 0,
			products:[],
			revenues:[],
			soft_delete: false
		};
		let ord = await saveOrder(order);
		if (ord) {
			$form = orderSchema;
			load = false;
			added = true;
		} else {
			console.log('error');
		}
	}
</script>

<div class="flex flex-col">
	<header class="text-xl font-bold text-center text-neutral-900">Añadir Reserva</header>
	<form on:submit={handleSubmit} class="flex flex-col mt-4 space-y-6">
		<Select
			options={$clientStore}
			bind:selected={$form.client}
			id="client-form-order"
			label="Cliente"
			error={$errors.client}
			on:change={handleChange}
		/>

		<Input
			type="date"
			bind:value={$form.date}
			label="Fecha"
			error={$errors.date}
			id="date-form-order"
			on:change={handleChange}
		/>

		<Select
			type="simple"
			options={['ARS', 'USD']}
			bind:selected={$form.currency}
			id="currency-form-order"
			label="Moneda"
			error={$errors.currency}
			on:change={handleChange}
		/>

		{#if $errors.client || $errors.date}
			<small class="text-red-400 text-center"
				>Debe ingresar un cliente y una fecha para añadir la reserva</small
			>
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
