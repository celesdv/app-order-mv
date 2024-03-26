<script lang="ts">
	import { boolean } from 'yup';
	import { activoAccordion } from '../../store/store';
	import Data from '../elements/Data.svelte';
	import ItemAccordion from './ItemAccordion.svelte';
	import Products from '../elements/Products.svelte';

	export let sections: string[] = ['Datos Reserva', 'Productos', 'Cobros', 'Pagos', 'Impuestos'];
</script>

{#each sections as element, index}
	<ItemAccordion {element} />
	{#if $activoAccordion === element}
		{#if index === 0}
			<Data />
		{:else if index === 1}
			<Products />
		{:else}
			<div>
				hola {element}
			</div>
		{/if}
	{/if}
{/each}
