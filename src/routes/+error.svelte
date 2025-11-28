<script>
	import { goto } from '$app/navigation';
import { page } from '$app/stores';

// Test comment
</script>

<div class="text-center">
    {#if $page.error}
        <h1
            class="mb-1 font-bold text-7xl mt-7"
        >{$page.status}</h1>
        <p
            class="text-xl"
        >{$page.error.message}</p>

        <button
            on:click={() => goto("/")}
            class="mt-5 transition-all button clickable"
        ><span
            class="font-normal"
            >Return to
        </span><span
            class="font-bold"
            >Polaris
        </span>
        </button>
    {/if}
</div>
