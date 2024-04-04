<script lang="ts">
	import Plus from 'svelte-material-icons/Plus.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import SearchInput from '../shared/inputs/SearchInput.svelte';
	import TableSupplier from './TableSupplier.svelte';
	import Form from '../forms/Form.svelte';
	import type { supplierModel } from '../../interfaces/general';
	import { suppliersHandler } from '../../store/store';

	export let suppliers: supplierModel[] = [];

	let add: boolean = false;
	let search: string;
	let filtered: supplierModel[] = [];

	$: {
		if (search === '') {
			suppliersHandler.clear();
			if (suppliers) {
				suppliers.forEach((element: any) => {
					suppliersHandler.set(element);
				});
			}
		} else {
			termFilter();
		}
	}

    function termFilter() {
        filtered = suppliers.filter((supplier: supplierModel) => {
            return supplier.name.toLowerCase().includes(search);
        });
        suppliersHandler.clear();
        filtered.forEach((element: any) => {
            suppliersHandler.set(element);
        });
    }
</script>

<div class="w-2/3 h-full p-2 max-h-[85vh]">
	<div
		class="w-full rounded-lg px-4 py-2 text-center uppercase text-neutral-100 font-semibold bg-gradient-to-b from-sky-900 to-sky-600 shadow-md"
	>
		Provedores
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
	<TableSupplier />
</div>

<Form bind:showModal={add} />
