<script lang="ts">
	import { authHandlers } from "../store/store";
	import Button from "./buttons/Button.svelte";

    function logOut() {
        authHandlers.logout()
    }
</script>

<header class="w-full bg-sky-800 flex items-center h-[9vh]">
    <div class="flex justify-between items-center p-4 text-neutral-100 w-full">
        <div class="text-lg">
            <span class="font-bold">Melcej</span><span class="italic">Viajes</span>
        </div>
        <Button title='Salir' on:click={()=>logOut()}/>
    </div>
</header>