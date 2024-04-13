<script lang="ts">
	import FormProducts from './orders/FormProducts.svelte';
	import FormSupplier from './FormSupplier.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import FormClient from './FormClient.svelte';
	import IconButton from '../shared/buttons/IconButton.svelte';
	import { activeItem } from '../../store/store';
	import FormOrder from './FormOrder.svelte';

	export let showModal: boolean;
	export let width: string = 'w-96';

	let dialog: HTMLDialogElement;
	let added: boolean = false;

	$: if (dialog && showModal) dialog.showModal();
	$: if (added) dialog.close(), (added = false);

	/*La función `close()` es responsable de cerrar el modal */
	function close() {
		showModal = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="card py-8 px-10 {width} space-y-4 bg-gradient-to-b from-neutral-100 to-neutral-400 rounded-md shadow-lg absolute"
	bind:this={dialog}
	on:close={close}
>
	<div class="absolute top-2 right-2">
		<IconButton
			size="h-6"
			variant="bg-gradient-to-b from-neutral-100 to-neutral-400 text-neutral-900 shadow"
			on:click={() => dialog.close()}
		>
			<Close />
		</IconButton>
	</div>
	{#if $activeItem === 1}
		<FormSupplier bind:added />
	{:else if $activeItem === 2}
		<FormClient bind:added />
	{:else if $activeItem === 5}
		<FormProducts bind:added />
	{:else}
		<FormOrder bind:added />
	{/if}
</dialog>
