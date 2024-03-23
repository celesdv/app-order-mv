<script lang="ts">
	import Loading from 'svelte-material-icons/Loading.svelte';
	export let color: string = '';
	export let size: string = '8rem';
</script>

<div class="animate-spin p-2">
	<Loading {size} {color} />
</div>
