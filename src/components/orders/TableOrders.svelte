<script lang="ts">
	import Drop from 'svelte-material-icons/TrayArrowDown.svelte';
	import Expand from 'svelte-material-icons/ArrowRight.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
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
					<IconButton
						size="h-5"
						variant="bg-gradient-to-b from-red-400 to-red-800 text-neutral-100"
						on:click={() => console.log('Archivar')}
					>
						<Drop />
					</IconButton>
					<IconButton
						size="h-5"
						on:click={() => console.log('Ver')}
						variant="bg-gradient-to-b from-neutral-400 to-neutral-600 text-neutral-100"
					>
						<Expand />
					</IconButton>
				</td>
			</tr>
		</tbody>
	</table>
</div>
