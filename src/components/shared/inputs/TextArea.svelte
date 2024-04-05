<script lang="ts">
	export let id: string = '';
	export let label: string = '';
	export let error: string = '';
	export let value: string = '';
	export let type: string = 'text';
	export let rows: number = 4;
	export let classes: string = '';
	export let readonly: boolean = false;

	$: if (type === 'phone') value = value.replace(/[^0-9]/g, '');
</script>

<label
	for={id}
	class="{classes} relative rounded-lg border {value
		? 'border-sky-600'
		: 'border-neutral-900'} {error ? 'border-red-400' : 'border-neutral-900'}"
>
	<span
		class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 text-neutral-100
        {error ? 'bg-red-400' : 'bg-sky-600'}
        {value ? 'top-0' : 'top-1/2 opacity-0'} duration-300"
	>
		{label}
	</span>
	<textarea
		{id}
		on:change
		bind:value
		placeholder={label}
		class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0 placeholder:text-neutral-800"
		{readonly}
		{rows}
	/>
</label>
