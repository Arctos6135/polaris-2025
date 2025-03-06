<script lang="ts">
    import type { Textbox } from "$lib/types";
    import { getContext } from "svelte";
    import { activeResponses } from "$lib/store";

    export let component: Textbox;
    export let content: string = "";
    const id: number = getContext("id")

    export let error: String | undefined = undefined;

    $: content = String($activeResponses[id].data[component.id] || "");

    let wordLength = 0;

    const validateLength = () => {
        wordLength = content.length;

        error = (component.maxLength != null && wordLength > component.maxLength) ? "Too long" : wordLength == 0 ? "Field can't be empty" : undefined;
    }

    $: {
        // Do nothing with content, just keep it
        // in this block so we run it every time it changes
        content;
        validateLength();
    }
</script>

<div>
    <div class="flex relative">
        <textarea
            bind:value={$activeResponses[id].data[component.id]}
            class="flex-auto h-[20vh] my-2 min-h-16 max-h-[60vh] bg-primary w-64 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9 scroll scrollbar-thin scrollbar-thumb-enabled scrollbar-track-background"
        ></textarea>
        {#if component.maxLength!=null}
            <span 
                class="absolute right-3 bottom-2 text-gray-400 text-sm"
                class:!text-red-500={error}
                class:font-bold={error}
                class:text-lg={error}
                >{wordLength} / {component.maxLength}
            </span>
        {/if}
    </div>
</div>