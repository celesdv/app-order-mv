<script lang="ts">
	export let title: string = '';
	export let variants: string = '';
	export let disabled = false;
</script>

<button on:click type="submit" class="px-6 py-2 rounded shadow-xl {variants}" {disabled}>
	{title}
</button>
