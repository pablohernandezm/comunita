<script lang="ts" context="module">
    import { createToaster, melt } from '@melt-ui/svelte'
    import {X} from "lucide-svelte";

    export let delayS=10;

    export type ToastData = {
        title: string
        description: string
        color: string
    }

    const {
        elements: { content, title, description, close },
        helpers,
        states: { toasts },
        actions: { portal }
    } = createToaster<ToastData>({
        closeDelay:delayS*1000,
    })

    export const addToast = helpers.addToast

</script>

<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition';
</script>

<div use:portal class="max-w-full fixed bottom-0 right-0 p-2 flex flex-col gap-3 z-50">
    {#each $toasts as { id, data } (id)}
        <div use:melt={$content(id)}
             animate:flip={{duration:500}}
             in:fly={{duration:150, x:'100%'}}
             out:fly={{duration:150, x:'100%'}}
             class="relative max-w-xs xs:max-w-xs p-6 bg-base-100 rounded-lg shadow shadow-emphasis1">
            <div>
                <div>
                    <div use:melt={$title(id)} class="font-bold flex items-center gap-2">
                        <span class="aspect-square w-2 rounded-full block flex-shrink-0" style="background-color:{data.color}"/>
                        <h3 class="truncate">{data.title}</h3>
                    </div>

                    <div use:melt={$description(id)} class="whitespace-pre-wrap">
                        {data.description}
                    </div>
                </div>

                <button use:melt={$close(id)} aria-label="Cerrar notificación" class="absolute top-2 right-2">
                    <X size={20}/>
                </button>
            </div>
        </div>
    {/each}
</div>