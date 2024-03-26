<script lang="ts">
	import Plus from 'svelte-material-icons/Plus.svelte';
	import Edit from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';	
	import IconButton from '../buttons/IconButton.svelte';
	import type { revenuesModel } from '../../interfaces/general';

	let revenues: revenuesModel[] = [
		{ date: new Date(), ars_value: 15000, currency_value: 100, usd_value: 15000 / 100 }
	];
	let tarifa: number = 2000;
	let currency: string = 'USD';

	const sumaPagos = () => {
		let total: number = 0;
		if (currency === 'ARS') {
			revenues.forEach((element) => {
				total = total + element.ars_value;
			});
		} else {
			revenues.forEach((element) => {
				total = total + element.usd_value;
			});
		}

		return total;
	};
</script>

<div class="px-2">
	<div class="p-2 fondo-translucent">
		<div class="flex justify-between text-center space-x-4">
			<div
				class="flex p-2 divide-x rounded-full w-full bg-gradient-to-t from-teal-500 to-teal-800 text-neutral-100 shadow-lg"
			>
				<div class="px-2 w-1/4">Resumen</div>
				<div class="px-2 w-1/4">Tarifa: {tarifa} {currency}</div>
				<div class="px-2 w-1/4">Total: {sumaPagos()} {currency}</div>
				<div class="px-2 w-1/4">Saldos: {tarifa - sumaPagos()} {currency}</div>
			</div>
			<IconButton
				variant="flex items-center justify-center min-w-28 p-2 space-x-1 bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100 shadow-lg"
			>
				<Plus />
				<p>Añadir</p>
			</IconButton>
		</div>
		<div class="relative max-h-[21rem] h-[21rem] overflow-y-auto mt-2">
			<table class="w-full text-sm text-center text-gray-500">
				<thead class="text-sky-800 uppercase">
					<tr>
						<th scope="col" class="px-4 py-2">Fecha</th>
						<th scope="col" class="px-4 py-2">ARS</th>
						<th scope="col" class="px-4 py-2">Cambio</th>
						<th scope="col" class="px-4 py-2">USD</th>
						<th scope="col" class="px-4 py-2 w-[10%]">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{#if revenues.length > 0}
						{#each revenues as data}
							<tr class="border-b border-neutral-100">
								<td class="p-1 text-neutral-700">{data.date.toLocaleDateString()}</td>
								<td class="p-1 text-neutral-700">{data.ars_value}</td>
								<td class="p-1 text-neutral-700">{data.currency_value}</td>
								<td class="p-1 text-neutral-700">{data.usd_value}</td>
								<td class="p-2 flex items-center justify-center space-x-1">
									<IconButton
										size="h-5"
										variant="bg-gradient-to-b from-teal-500 to-teal-800 text-neutral-100"
										on:click={() => console.log('Archivar')}
									>
										<Edit />
									</IconButton>
									<IconButton
										size="h-5"
										variant="bg-gradient-to-b from-red-400 to-red-800 text-neutral-100"
										on:click={() => console.log('Ver')}
									>
										<Delete />
									</IconButton></td
								>
							</tr>
						{/each}
					{:else}
						<tr class="border-b border-neutral-100">
							<td class="p-1 text-neutral-700 text-center" colspan="4"
								>No hay cobros registrados aún</td
							>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.fondo-translucent {
		background: linear-gradient(
			90deg,
			rgba(245, 245, 245, 0) 0%,
			rgba(245, 245, 245, 1) 50%,
			rgba(245, 245, 245, 0) 100%
		);
	}
	::-webkit-scrollbar {
		width: 8px;
	}
	::-webkit-scrollbar-track {
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #0c4a6e;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #075985;
	}
</style>
