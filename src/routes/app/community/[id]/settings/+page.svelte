<script lang="ts">
    import {Settings2} from 'lucide-svelte'
    import ImageInput from "$lib/components/ImageInput.svelte";
    import Collapse from "$lib/components/Collapse.svelte";
    import Toaster, {addToast} from "$lib/components/Toaster.svelte";
    import {onMount} from "svelte";
    export let data;
    export let form;

    onMount(()=>{
        if (form){
            if (form.errors){
                form.errors.forEach((error)=>{
                    addToast({
                        data:{
                            title:error.title,
                            description:error.description,
                            color:error.color
                        }
                    })
                })
            } else{
                if (form.title ){
                    addToast({
                        data:{
                            title: form.title,
                            description: form.description,
                            color:form.color,
                        }
                    })
                }
            }
        }
    })
</script>

<Toaster/>
<main class="p-2 xs:p-4 flex flex-col gap-4 items-center w-full max-w-3xl">
    {#if data.role.toLowerCase()==='admin' || data.role.toLowerCase()==='mod'}
        <Collapse checked={true}>
            <div slot="title" class="contents">
                <Settings2 class="h-6 flex-shrink-0"/>
                <h2 class="truncate text-xl font-medium">
                    Ajustes de la comunidad
                </h2>
            </div>

            <div slot="content">
                <form method="post" class="flex flex-col gap-4" enctype="multipart/form-data">
                    <fieldset class="flex flex-col gap-1">
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name" class="input input-primary">
                    </fieldset>

                    <fieldset class="flex flex-col gap-1">
                        <label for="description">Descripción</label>
                        <textarea name="description" id="description" class="textarea textarea-primary" />
                    </fieldset>

                    <ImageInput emptyText="Sin cambios" name="banner" label="Banner" multiple={false}/>

                    <button type="submit" class="btn btn-primary text-base-100 text-lg">Guardar</button>
                </form>
            </div>
        </Collapse>
    {/if}
</main>