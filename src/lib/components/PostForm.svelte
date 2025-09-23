<script lang="ts">
    import {Info} from "lucide-svelte";
    import ImageInput from "$lib/components/ImageInput.svelte";
    export let needsFiles=false;

    export let title:string;
    export let info:string;
    export let formAction:string;
    export let multipleImages:boolean=false;
    export let textRequired=true;
    export let key:string;

    export let needsTitle:boolean=false;
</script>

<input type="radio" name="post-tab" role="tab" class="tab" aria-label="{title}" checked/>
<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 w-full overflow-hidden">
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

    <form method="post" action="{formAction}" class="flex flex-col gap-4 py-6" enctype="multipart/form-data">
        {#if needsTitle}
            <fieldset class="fieldset">
                <label for="{key}-body">Título</label>
                <input type="text" name="title" id="{key}-title" class="input input-primary w-full" required={textRequired}/>
            </fieldset>
        {/if}

        <fieldset class="fieldset">
            <label for="{key}-body">Escribe algo</label>
            <textarea name="body" id="{key}-body" class="textarea textarea-bordered textarea-primary resize-y w-full" required={textRequired}/>
        </fieldset>

        {#if needsFiles}
            <ImageInput
                    multiple={multipleImages}
                    label="Añade imágenes"
                    emptyText="Sin imágenes"
                    containerStyle="flex flex-col gap-2"
                    name="post_images"
            />
        {/if}
        <button type="submit" class="btn btn-primary text-base-100 text-md">
            Publicar
        </button>
    </form>
</div>