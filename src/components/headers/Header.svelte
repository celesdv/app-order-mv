<script lang="ts">
	import IconButton from '../shared/buttons/IconButton.svelte';
	import Plus from 'svelte-material-icons/Plus.svelte';

	export let title: string = '';
	export let showButton: boolean = true;
</script>

<div
	class="w-100 flex justify-between rounded-lg px-4 py-2 text-sky-800 font-semibold bg-gradient-to-b from-neutral-100 to-neutral-400 shadow-md"
>
	<h2 class="">{title}</h2>
	{#if showButton}
		<IconButton on:click>
			<Plus />
		</IconButton>
	{/if}
</div>
