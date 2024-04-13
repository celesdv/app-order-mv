<script lang="ts">
	import Drop from 'svelte-material-icons/TrayArrowDown.svelte';
	import Expand from 'svelte-material-icons/ArrowRight.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import { accordionHandler, itemHandler, orderStore, ordersHandler } from '../../store/store';
	import Spinner from '../shared/loaders/spinner.svelte';
	import type { orderModel } from '../../interfaces/general';

	let load: boolean = true;

	$: if ($orderStore.length > 0) load = false;

	function handleSelect(order: orderModel) {
		ordersHandler.setOrder(order);
		itemHandler.set(0);
		accordionHandler.set('')
	}
</script>

<div class="relative max-h-[80%] overflow-y-auto">
	<table class="w-full text-sm text-left text-gray-500">
		<thead class="text-sky-800 uppercase">
			<tr>
				<th scope="col" class="px-4 py-2 w-2/3">Cliente</th>
				<th scope="col" class="px-4 py-2 w-1/4">Fecha</th>
				<th scope="col" class="px-4 py-2">Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#if load}
				<tr class="border-b border-neutral-100">
					<td colspan="8">
						<div class="w-full flex justify-center">
							<Spinner size="6rem" color="#f5f5f5" />
						</div>
					</td>
				</tr>
			{:else if $orderStore.length > 0}
				{#each $orderStore as data}
					<tr class="border-b border-neutral-100">
						<td class="p-1 text-neutral-700">{data.client?.first_name} {data.client?.last_name}</td>
						<td class="p-1 text-neutral-700">{data.date?.toLocaleDateString()}</td>
						<td class="p-1 text-center">
							<IconButton
								size="h-5"
								variant="bg-gradient-to-b from-red-400 to-red-800 text-neutral-100"
								on:click={() => console.log('Archivar')}
							>
								<Drop />
							</IconButton>
							<IconButton
								size="h-5"
								on:click={() => handleSelect(data)}
								variant="bg-gradient-to-b from-neutral-400 to-neutral-600 text-neutral-100"
							>
								<Expand />
							</IconButton>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
