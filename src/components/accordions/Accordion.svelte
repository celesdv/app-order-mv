<script lang="ts">
	import { activoAccordion } from '../../store/store';
	import ItemAccordion from './ItemAccordion.svelte';
	import Data from '../elements/Data.svelte';
	import Products from '../elements/Products.svelte';
	import Revenues from '../elements/Revenues.svelte';
	import Payments from '../elements/Payments.svelte';
	import Taxes from '../elements/Taxes.svelte';

	export let sections: string[] = ['Datos Reserva', 'Productos', 'Cobros', 'Pagos', 'Impuestos'];
</script>

{#each sections as element, index}
	<ItemAccordion {element} />
	{#if $activoAccordion === element}
		{#if index === 0}
			<Data />
		{:else if index === 1}
			<Products />
		{:else if index === 2}
			<Revenues />
		{:else if index === 3}
			<Payments />
		{:else}
			<Taxes />
		{/if}
	{/if}
{/each}
