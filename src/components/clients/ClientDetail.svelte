<script lang="ts">
	import Plus from 'svelte-material-icons/Plus.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import SearchInput from '../inputs/SearchInput.svelte';
	import Form from '../forms/Form.svelte';
	import TableClient from './TableClient.svelte';
	import type { clientModel } from '../../interfaces/general';

    export let clients: clientModel[] = [];

	let add: boolean = false;
	let search: string;
</script>

<div class="w-2/3 h-full p-2 max-h-[85vh]">
	<div
		class="w-full rounded-lg px-4 py-2 text-center uppercase text-neutral-100 font-semibold bg-gradient-to-b from-sky-900 to-sky-600 shadow-md"
	>
		Clientes
	</div>
	<div class="flex justify-between p-2">
		<SearchInput bind:search />
		<IconButton
			variant="flex items-center justify-center min-w-28 p-2 space-x-1 bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-lg"
			on:click={() => (add = !add)}
		>
			<Plus />
			<p>Añadir</p>
		</IconButton>
	</div>
	<TableClient />
</div>

<Form bind:showModal={add} width='w-2/5' />
