<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required()
		}),
		onSubmit: (values) => {
			handleAuthenticate(values);
		}
	});

	function handleAuthenticate(values: any) {
		console.log(values);
	}
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
			<small class="text-red-700 text-center">Debe ingresar los datos de Email y Clave</small>
		{/if}

		<button
			type="submit"
			class="rounded-lg p-3 text-sky-800 font-semibold text-xl bg-neutral-100 shadow-xl"
			disabled={!$form.email || !$form.password}
		>
			Ingresar
		</button>
	</form>
</div>
