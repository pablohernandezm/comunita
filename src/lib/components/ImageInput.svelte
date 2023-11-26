<script lang="ts">
    import{createImageInput} from "$lib/utils";
    import {FileImage} from "lucide-svelte";

    import type {HTMLInputAttributes} from "svelte/elements";
    export let inputID:string|null='file-input';
    export let emptyText:string='Sin imagen'
    export let styles:string|undefined = undefined;
    export let multiple=false;
    export let accept:HTMLInputAttributes['accept'] ='image/jpeg, image/png'
    export let containerStyle:string='flex flex-col gap-1';
    const {input, text, files:inputFiles} = createImageInput(emptyText);
    export let label:string ='Escoge una imagen'
    export const files=inputFiles;

    export let name="images";
</script>

<div class="{containerStyle}">
    <label for="{inputID}">{label}</label>
    <fieldset class="fieldset">
        <button type="button" class="{styles?? 'input input-primary p-0 hover:cursor-pointer block overflow-hidden px-4'}">
            <label for="{inputID}" class="flex flex-row items-center gap-2 hover:cursor-pointer h-full w-full">
                <FileImage size={24} class="text-rose-400 min-w-[16px] min-h-[16px]"/>
                <span class="text-zinc-800 w-full text-left line-clamp-1 truncate block">
                {$text}
            </span>
            </label>

            <input type="file" id="{inputID}" {name} hidden {accept} {multiple} use:input>
        </button>
    </fieldset>
</div>