<script lang="ts">
	export let options: any = [];
	export let id: string = '';
	export let classes: string = '';
	export let selected: any | undefined;
	export let error: string = '';
	export let label: string = '';
	export let type: string = '';
</script>

<label
	for={id}
	class="{classes} relative rounded-lg border {selected
		? 'border-sky-600'
		: 'border-neutral-900'} {error ? 'border-red-400' : 'border-neutral-900'}"
>
	<span
		class="absolute left-1 -translate-y-1/2 pointer-events-none rounded px-1 text-neutral-100
        {error ? 'bg-red-400' : 'bg-sky-600'}
        {selected ? 'top-0' : 'top-1/2 opacity-0'} duration-300"
	>
		{label}
	</span>
	{#if type === 'simple'}
		<select
			{id}
			class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0 placeholder:text-neutral-800"
			bind:value={selected}
		>
			{#if label}
				<option class="bg-secondary-500 text-tertiary-500" disabled selected hidden value=""
					>{label}</option
				>
			{/if}
			{#each options as option (option)}
				<option class="bg-secondary-500 text-tertiary-500 leading-7" value={option}>
					{option}</option
				>
			{/each}
		</select>
	{:else if type === 'supplier'}
		<select
			{id}
			class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0 placeholder:text-neutral-800"
			bind:value={selected}
		>
			{#if label}
				<option class="bg-secondary-500 text-tertiary-500" disabled selected hidden value=""
					>{label}</option
				>
			{/if}
			{#each options as option (option)}
				<option class="bg-secondary-500 text-tertiary-500 leading-7" value={option}>
					{option.name}</option
				>
			{/each}
		</select>
	{:else}
		<select
			{id}
			class="w-full border-0 bg-transparent text-neutral-800 p-3 focus:outline-0 placeholder:text-neutral-800"
			bind:value={selected}
		>
			{#if label}
				<option class="bg-secondary-500 text-tertiary-500" disabled selected hidden value=""
					>{label}</option
				>
			{/if}
			{#each options as option (option)}
				<option class="bg-secondary-500 text-tertiary-500 leading-7" value={option}>
					{option.first_name} {option.last_name}</option
				>
			{/each}
		</select>
	{/if}
</label>
