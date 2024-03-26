<script lang="ts">
	import { authStore } from '../../store/store';

	import NavBar from './../../components/NavBar.svelte';
	import Footer from '../../components/Footer.svelte';
	import Body from '../../components/Body.svelte';
	import Spinner from '../../components/loaders/spinner.svelte';
</script>

{#if !$authStore.loading}
	<NavBar />
	<Body />
{:else}
	<div class="flex w-full mt-[10%] justify-center">
		<Spinner size="12rem" color="#f5f5f5" />
	</div>
{/if}
