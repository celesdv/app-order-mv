<script lang="ts">
	import { VSCODE_GIT_IPC_HANDLE } from './../../.svelte-kit/ambient.d.ts';
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
	<form class="flex flex-col gap-3 w-96 max-w-full" on:submit={handleSubmit}>
		<h2 class="text-center text-4xl text-sky-800 font-bold p-3">Inicio de Sesión</h2>
		<label for="" class="relative border border-teal-700 rounded-lg">
			<span
				class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 bg-neutral-200 text-neutral-400
                {$form.email ? 'top-0' : 'top-1/2'} duration-300"
			>
				Email
			</span>
			<input
				on:change={handleChange}
				bind:value={$form.email}
				type="email"
				class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0"
			/>
		</label>
		<label for="" class="relative border-2 border-teal-700 rounded-lg">
			<span
				class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 bg-neutral-200 text-neutral-400
                {$form.password ? 'top-0' : 'top-1/2'} duration-300"
			>
				Clave
			</span>
			<input
				on:change={handleChange}
				bind:value={$form.password}
				type="password"
				class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0"
			/>
		</label>
		{#if $errors.email || $errors.password}
			<small class="text-red-700 text-center">Debe ingresar los datos de Email y Clave</small>
		{/if}
		<button
			type="submit"
			class=" rounded-lg p-3 text-neutral-100 font-semibold text-xl {!$form.email || !$form.password
				? 'bg-neutral-500'
				: 'bg-sky-800'}"
			disabled={!$form.email || !$form.password}
		>
			Ingresar
		</button>
	</form>
</div>
