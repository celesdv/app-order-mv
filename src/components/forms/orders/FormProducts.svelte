<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import Input from '../../shared/inputs/Input.svelte';
	import Select from './../../shared/inputs/Select.svelte';
	import InputNumber from '../../shared/inputs/InputNumber.svelte';
	import { activeOrderStore, suppliersStore } from '../../../store/store';
	import Spinner from '../../shared/loaders/spinner.svelte';
	import Button from '../../shared/buttons/Button.svelte';
	import type { productModel, supplierModel } from '../../../interfaces/general';
	import { updateOrder } from '$lib/service/serviceOrder';

	export let added: boolean;

	let load: boolean = false;
	let description: string = '';
	let supplier: supplierModel;
	let currency: string = '';
	let ars_value: number;
	let usd_value: number;
	let errorDescription: string = '';
	let errorSupplier: string = '';
	let errorCurrency: string = '';
	let errorArs_value: string = '';
	let errorUsd_value: string = '';

	async function handleSubmit() {
		let check = handleChange();
		if (check) {
			let product: productModel = {
				id: uuidv4(),
				description: description,
				supplier: supplier,
				value: ars_value,
				currency: currency,
				usd_value: usd_value,
				balance: currency === 'ARS' ? ars_value : usd_value,
				soft_delete: false,
				payments: [],
				taxes: null
			};
			await handleAdd(product);
		}
	}

	function handleChange() {
		if (!description || description === '') {
			errorDescription = 'error';
			return false;
		}
		if (!supplier) {
			errorSupplier = 'error';
			return false;
		}
		if (!currency) {
			errorCurrency = 'error';
			return false;
		}
		if (!usd_value || usd_value < 0) {
			errorUsd_value = 'error';
			return false;
		}
		if (!ars_value || ars_value < 0) {
			errorArs_value = 'error';
			return false;
		}
		return true;
	}

	async function handleAdd(product: productModel) {
		$activeOrderStore.products.push(product);
		$activeOrderStore.ars_value = $activeOrderStore.ars_value + product.value;
		$activeOrderStore.usd_value = $activeOrderStore.usd_value + product.usd_value;
		let prod = await updateOrder($activeOrderStore);
		if (prod) {
			load = false;
			added = true;
		} else {
			console.log('error');
		}
	}
</script>

<div class="flex flex-col">
	<header class="text-xl font-bold text-center text-neutral-900">Añadir Producto</header>
	<form class="flex flex-col mt-4 space-y-6">
		<Input
			bind:value={description}
			label="Producto"
			error={errorDescription}
			id="description-form-product"
		/>

		<Select
			type="supplier"
			options={$suppliersStore}
			bind:selected={supplier}
			id="supplier-form-product"
			label="Proveedor"
			error={errorSupplier}
		/>

		<InputNumber
			bind:value={ars_value}
			label="Valor en ARS"
			error={errorArs_value}
			id="value-form-product"
		/>

		<Select
			type="simple"
			options={['ARS', 'USD']}
			bind:selected={currency}
			id="currency-form-order"
			label="Moneda"
			error={errorCurrency}
		/>

		<InputNumber
			bind:value={usd_value}
			label="Valor en USD"
			error={errorUsd_value}
			id="value-usd-form-product"
		/>

		{#if errorArs_value || errorCurrency || errorDescription || errorSupplier || errorUsd_value}
			<small class="text-red-400 text-center"
				>Debe ingresar todos los datos para añadir el producto</small
			>
		{/if}

		{#if load}
			<div class="flex w-full justify-center">
				<Spinner size="3rem" color="#f5f5f5" />
			</div>
		{:else}
			<Button
				on:click={handleSubmit}
				title="Añadir"
				variants="rounded-lg p-3 font-semibold text-xl bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-xl"
			/>
		{/if}
	</form>
</div>
