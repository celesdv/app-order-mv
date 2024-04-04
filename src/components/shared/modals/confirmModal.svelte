<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../buttons/Button.svelte';

	export let showModal: boolean = false;
	export let confirm: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	/*La función `close()` es responsable de cerrar el modal */
	function close() {
		showModal = false;
	}
</script>

<dialog
	class="card py-8 px-10 w-1/4 space-y-4 bg-gradient-to-b from-neutral-100 to-neutral-400 rounded-md shadow-lg absolute"
	bind:this={dialog}
	on:close={close}
>
	<slot />
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="flex gap-4 justify-center">
			<Button
				on:click={() => dialog.close()}
				title="Cancelar"
				variants="w-40 bg-gradient-to-b from-neutral-100 to-neutral-400 text-sky-800 font-semibold"
			/>
			<Button
				on:click={() => {
					(confirm = true), dialog.close();
				}}
				title="Confirmar"
				variants="w-40 bg-gradient-to-b from-red-400 to-red-800 text-neutral-100"
			/>
		</div>
	</div>
</dialog>
