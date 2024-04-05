<script lang="ts">
	export let size: string = '';
	export let variant: string = 'bg-gradient-to-b from-sky-900 to-sky-600 text-neutral-100';
	export let typeButtom = 'button';
</script>

{#if (typeButtom = 'button')}
	<button type="button" class="{variant} rounded-full px-1 text-center shadow-lg {size}" on:click>
		<slot />
	</button>
{:else}
	<button type="submit" class="{variant} rounded-full px-1 text-center shadow-lg {size}" on:click>
		<slot />
	</button>
{/if}
