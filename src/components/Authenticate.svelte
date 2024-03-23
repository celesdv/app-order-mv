<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import Button from './buttons/Button.svelte';
	import { authHandlers } from '../store/store';
	import Spinner from './loaders/spinner.svelte';

	let disabled: boolean = true;
	let loading: boolean = false;
	let error: boolean = false;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required()
		}),
		onSubmit: async (values) => {
			await handleAuthenticate(values);
		}
	});

	async function handleAuthenticate(values: any) {
		error = false;
		loading = true;
		let email = values.email;
		let password = values.password;
		try {
			await authHandlers.login(email, password);
		} catch (err) {
			error = true;
			loading = false;
			console.log(err);
		}
	}

	$: disabled = !$form.email || !$form.password;
</script>

<div class="flex flex-col items-center justify-center p-6 h-screen">
	<form
		class="flex flex-col gap-3 w-96 max-w-full h-auto shadow-xl bg-gradient-to-b from-sky-900 to-sky-600 p-6 rounded-lg"
		on:submit={handleSubmit}
	>
		<h2 class="text-center text-4xl text-neutral-100 font-bold p-3">Inicio de Sesión</h2>

		<label
			for=""
			class="relative rounded-lg border {$form.email ? 'border-sky-600' : 'border-neutral-100'}"
		>
			<span
				class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 text-neutral-100
                {$form.email ? 'top-0' : 'top-1/2 opacity-0'} duration-300"
			>
				Email
			</span>
			<input
				on:change={handleChange}
				bind:value={$form.email}
				placeholder="Email"
				type="email"
				class="w-full border-0 bg-transparent text-neutral-100 p-3 focus:outline-0 placeholder:text-neutral-100"
			/>
		</label>

		<label
			for=""
			class="relative rounded-lg border {$form.password ? 'border-sky-600' : 'border-neutral-100'}"
		>
			<span
				class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 text-neutral-100
		{$form.password ? 'top-0' : 'top-1/2 opacity-0'} duration-300"
			>
				Clave
			</span>
			<input
				on:change={handleChange}
				bind:value={$form.password}
				placeholder="Clave"
				type="password"
				class="w-full border-0 bg-transparent text-neutral-100 p-3 focus:outline-0 placeholder:text-neutral-100"
			/>
		</label>

		{#if $errors.email || $errors.password}
			<small class="text-red-400 text-center"
				>Debe ingresar los datos de Email y Clave para iniciar sesión</small
			>
		{/if}

		{#if error}
			<small class="text-red-400 text-center">Email o clave incorrectas. Revise sus datos</small>
		{/if}

		{#if loading}
			<div class="flex w-full justify-center">
				<Spinner size="2rem" color="#f5f5f5" />
			</div>
		{:else}
			<Button
				title="Ingresar"
				variants="rounded-lg p-3 text-sky-800 font-semibold text-xl bg-gradient-to-b from-neutral-100 to-neutral-400 shadow-xl"
				bind:disabled
			/>
		{/if}
	</form>
</div>
