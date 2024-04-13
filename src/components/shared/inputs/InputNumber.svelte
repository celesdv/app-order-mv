<script lang="ts">
	export let id: string = '';
	export let label: string = '';
	export let error: string = '';
	export let value: number = 0;
	export let classes: string = '';
	export let readonly: boolean = false;
</script>

<label
	for={id}
	class="{classes} relative rounded-lg border {error ? 'border-red-400' : 'border-sky-600'}"
>
	<span
		class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 text-neutral-100
        {error ? 'bg-red-400' : 'bg-sky-600'}
        top-0 duration-300"
	>
		{label}
	</span>
	<input
		type="number"
		{id}
		min=0
		on:change
		bind:value
		placeholder={label}
		class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0 placeholder:text-neutral-800"
		{readonly}
	/>
</label>
