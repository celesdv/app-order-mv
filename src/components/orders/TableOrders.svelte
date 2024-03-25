<script lang="ts">
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import Expand from 'svelte-material-icons/ArrowRight.svelte';
	import IconButton from '../buttons/IconButton.svelte';
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
			<tr class="border-b border-neutral-100">
				<td class="p-1 text-neutral-700">Nombre Cliente</td>
				<td class="p-1 text-neutral-700">19/09/2024</td>
				<td class="p-1 text-center">
					<IconButton size="h-5" on:click={() => console.log('Eliminar')}>
						<Delete />
					</IconButton>
					<IconButton size="h-5" on:click={() => console.log('Editar')}>
						<Pencil />
					</IconButton>
					<IconButton size="h-5" on:click={() => console.log('Ver')}>
						<Expand />
					</IconButton>
				</td>
			</tr>
		</tbody>
	</table>
</div>
