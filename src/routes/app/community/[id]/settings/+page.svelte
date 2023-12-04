<script lang="ts">
    import {Settings2, RefreshCw, Link2} from 'lucide-svelte'
    import ImageInput from "$lib/components/ImageInput.svelte";
    import Collapse from "$lib/components/Collapse.svelte";
    import {addToast} from "$lib/components/Toaster.svelte";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {copy} from "$lib/utils";
    import {enhance} from "$app/forms";
    import {invalidateAll} from "$app/navigation";

    export let data;
    export let form;

    let loadingLink=false;
    $:link=data.link?`${$page.url.origin}/app/community/link/${data.link.access_code}`:'';

    function copyLink(){
        if (data.link){
            const status=copy(link)

            if (status){
                addToast({
                    data:{
                        title:status.title,
                        description:status.description??'',
                        color:status.color
                    }
                })
            }
        }
    }

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
            } else if (form.title ){
                addToast({
                    data:{
                        title: form.title,
                        description: form.description,
                        color:form.color,
                    }
                })
            }
        }
    })
</script>

<svelte:head>
    <title>{`Configuración - ${data.communityData.name}`}</title>
</svelte:head>

<main class="p-2 xs:p-4 flex flex-col gap-4 items-center w-full max-w-3xl">
    {#if data.role.toLowerCase()==='admin' || data.role.toLowerCase()==='mod'}
        <Collapse checked={false}>
            <div slot="title" class="contents">
                <Settings2 class="h-6 flex-shrink-0"/>
                <h2 class="truncate text-xl font-medium">
                    Ajustes de la comunidad
                </h2>
            </div>

            <div slot="content">
                <form action="?/settings" method="post" class="flex flex-col gap-4" enctype="multipart/form-data">
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

        <Collapse checked={true}>
            <div slot="title" class="contents" id="community_link">
                <Link2 class="h-6 flex-shrink-0"/>
                <h2 class="truncate text-xl font-medium">
                    Enlace de la comunidad
                </h2>
            </div>

            <div slot="content" class="flex flex-col gap-4">
                <p>Usa este enlace para hacer que la gente se una a la comunidad. Las personas solo tienen que acceder a él.</p>
                <div class="grid grid-cols-[1fr_max-content] gap-4 max-w-md self-center w-full">
                    <button class="input input-bordered truncate text-zinc-700 w-full" title="Copiar al portapapeles" aria-label="Copiar al portapapeles" on:click={copyLink}>
                        {data.link?`${$page.url.origin}/app/community/link/${data.link.access_code}`:''}
                    </button>

                    <form action="?/create_link" method="post" use:enhance={()=>{
                        loadingLink=true;

                        return async({result})=>{
                            loadingLink=false;
                            if (result.type==='success'){
                                await invalidateAll();

                                addToast({
                                    data:{
                                        title:'Enlace generado con éxito',
                                        color:'green',
                                    }
                                })
                            } else{
                                addToast({
                                    data:{
                                        title:'No se pudo generar el enlace',
                                        color:'red',
                                    }
                                })
                            }
                        }
                    }}>
                        <button type="submit" class="btn btn-primary text-base-100" aria-label="Restablecer enlace" title="Restablecer enlace" on:click={()=>{loadingLink=true;}}>
                            <RefreshCw class="{loadingLink?'animate-spin':''}"/>
                        </button>
                    </form>
                </div>
            </div>
        </Collapse>
    {/if}
</main>