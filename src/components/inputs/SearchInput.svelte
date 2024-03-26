<script lang="ts">
	import Search from 'svelte-material-icons/Magnify.svelte';
</script>

<div class="w-1/3 flex items-center relative h-full">
	<input
		type="text"
		placeholder="Buscar"
		class="rounded-full bg-transparent px-4 border border-sky-800 text-neutral-800 p-1 w-full"
	/>
    <div class="absolute right-2">
        <Search color='#075985' size='1.5rem'/>
    </div>
	
</div>
