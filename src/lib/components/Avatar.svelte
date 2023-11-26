<script lang="ts">
    import {createAvatar, melt} from "@melt-ui/svelte";
    export let src:string;
    export let fallBackText:string;
    export let delayMs=0;
    export let size:number | null=null;

    export let classes="";

    let style = size? `width:${size}px; height:${size}px;`:``

    const {
        elements: {image, fallback}
    } = createAvatar({
        src,
        delayMs,
    })
</script>

<div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-400 text-white aspect-square  {classes}" {style}>
    <img src="{src}" use:melt={$image} alt="Avatar" class="h-full w-full object-cover rounded-[inherit]">
    <span use:melt={$fallback} class="uppercase">{fallBackText}</span>
</div>
