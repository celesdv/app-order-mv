<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { slide } from 'svelte/transition';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import Input from '../shared/inputs/Input.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Save from 'svelte-material-icons/ContentSave.svelte';
	import type { clientModel } from '../../interfaces/general';
	import TextArea from '../shared/inputs/TextArea.svelte';
	import { updateClient } from '$lib/service/serviceClients';
	import { afterUpdate, onMount } from 'svelte';

	export let open: boolean = false;
	export let index: number;
	export let dataClient: clientModel;

	let edit: boolean = false;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			phone: '',
			email: '',
			address: '',
			city: '',
			observation: ''
		},
		validationSchema: yup.object().shape({
			phone: yup.string().min(10).max(10),
			email: yup.string().email(),
			address: yup.string(),
			city: yup.string(),
			observation: yup.string()
		}),
		onSubmit: async (values) => {
			await editClient();
		}
	});

	async function editClient() {
		dataClient.phone = $form.phone;
		dataClient.email = $form.email;
		dataClient.address = $form.address;
		dataClient.city = $form.city;
		dataClient.observation = $form.observation;
		let sup = await updateClient(dataClient, index);
		edit = !edit;
		open = false;
	}

	function close() {
		open = false;
		edit = false;
	}

	$: if (dataClient) {
		$form.phone = dataClient.phone;
		$form.address = dataClient.address;
		$form.city = dataClient.city;
		$form.email = dataClient.email;
		$form.observation = dataClient.observation;
	}
</script>

{#if open}
	<aside
		in:slide
		out:slide
		class="absolute top-0 right-0 w-1/3 h-full bg-neutral-100 border-r-2 shadow-lg"
	>
		<div class="">
			<IconButton size="h-6" variant="text-neutral-800" on:click={close}>
				<Close size="2rem" />
			</IconButton>
		</div>
		<div class="px-4 flex flex-col space-y-4">
			{#if dataClient}
				<div class="flex justify-end {!edit ? '' : 'invisible'} h-10">
					{#if !edit}
						<IconButton
							variant="flex items-center justify-center min-w-24 xl:min-w-28 p-2 space-x-1 bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-lg"
							on:click={() => (edit = !edit)}
						>
							<Edit />
							<p>Editar</p>
						</IconButton>
					{/if}
				</div>

				<form class="space-y-8" on:submit={handleSubmit}>
					<h3 class="text-lg text-center font-bold text-sky-700 uppercase">
						{dataClient?.first_name}
						{dataClient?.last_name}
					</h3>
					<div class="flex flex-col space-y-5">
						<Input
							bind:value={$form.phone}
							on:change={handleChange}
							error={$errors.phone}
							label="Télefono"
							id="telefonoDrawer"
							readonly={!edit}
							type="phone"
							maxlength={10}
						/>
						<Input
							bind:value={$form.email}
							on:change={handleChange}
							error={$errors.email}
							label="Email"
							id="emailDrawer"
							readonly={!edit}
							type="email"
						/>
						<Input
							bind:value={$form.address}
							on:change={handleChange}
							label="Dirección"
							id="addressDrawer"
							readonly={!edit}
						/>
						<Input
							bind:value={$form.city}
							on:change={handleChange}
							label="Localidad"
							id="cityDrawer"
							readonly={!edit}
						/>
						<TextArea
							bind:value={$form.observation}
							on:change={handleChange}
							label="Observaciones"
							id="observationDrawer"
							readonly={!edit}
						/>
					</div>
				</form>
				<div class="flex justify-end {edit ? '' : 'invisible'} space-x-2">
					{#if edit}
						<IconButton
							variant="flex items-center justify-center min-w-24 xl:min-w-28 p-2 space-x-1 bg-gradient-to-b from-red-400 to-red-800 text-neutral-100 shadow-lg"
							on:click={close}
						>
							<Close />
							<p>Cancelar</p>
						</IconButton>
						<IconButton
							typeButtom="submit"
							variant="flex items-center justify-center min-w-24 xl:min-w-28 p-2 space-x-1 bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100 shadow-lg"
							on:click={editClient}
						>
							<Save />
							<p>Guardar</p>
						</IconButton>
					{/if}
				</div>
			{/if}
		</div>
	</aside>
{/if}
