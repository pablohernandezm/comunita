<script lang="ts">
    import {FileImage, Info} from "lucide-svelte";
    export let fileInputHandler:HTMLInputElement;
    export let needsFiles=false;

    export let title:string;
    export let info:string;
    export let formAction:string;
    export let multipleImages:boolean=false;
    export let textRequired=true;

    export let key:string;
</script>

<input type="radio" name="post-tab" role="tab" class="tab" aria-label="{title}" checked/>
<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 w-full">
    <h2 class="m-0 text-lg font-medium text-black">
        {title}
    </h2>

    <div class="flex gap-2">
        <div class="shrink-0 py-[5px] h-full">
            <Info size={16}/>
        </div>
        <div>
            {info}
        </div>
    </div>

    <form action="{formAction}" class="flex flex-col gap-4 py-6">
        <fieldset class="fieldset">
            <label for="{key}-body">Escribe algo</label>
            <textarea name="body" id="{key}-body" class="textarea textarea-bordered textarea-primary resize-y" required={textRequired}/>
        </fieldset>

        {#if needsFiles}
            <fieldset class="fieldset">
                <button type="button" class="input input-primary p-0 hover:cursor-pointer relative">
                    <label for="{key}-images" class="flex flex-row items-center gap-2 hover:cursor-pointer h-full w-ful px-4">
                        <FileImage size={24} class="text-rose-400"/>
                        <span class="text-zinc-800 truncate">Escoge imágenes</span>
                    </label>

                    <input type="file" id="{key}-images" name="files" accept="image/jpeg, image/png" bind:this={fileInputHandler} hidden multiple={multipleImages}>
                </button>

            </fieldset>
        {/if}

        <button type="submit" class="btn btn-primary text-base-100 text-md">
            Publicar
        </button>
    </form>
</div>