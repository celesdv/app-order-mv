<script lang="ts">
	import { activeOrderStore } from '../../store/store';
	import Accordion from '../shared/accordions/Accordion.svelte';
</script>

<div class="w-2/3 h-full p-2 max-h-[85vh]">
	<div
		class="w-full rounded-lg px-4 py-2 text-center text-neutral-100 font-semibold bg-gradient-to-b from-sky-900 to-sky-600 shadow-md"
	>
		{$activeOrderStore.client?.first_name}
		{$activeOrderStore.client?.last_name} - {$activeOrderStore.date?.toLocaleDateString()}
	</div>
	<Accordion />
</div>
