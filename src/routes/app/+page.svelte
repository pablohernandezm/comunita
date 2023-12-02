<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte"
    import ImageInput from "$lib/components/ImageInput.svelte";
    import {X, PlusCircle} from 'lucide-svelte'

    import CommunityCard from "$lib/components/CommunityCard.svelte";
    import Toaster, {addToast} from "$lib/components/Toaster.svelte";
    import {onMount} from "svelte";

    export let form;
    export let data;


    onMount(()=>{
        if (form && form.message){
            addToast({
                data:{
                    title: form.message,
                    description: '',
                    color: 'green'
                }
            })
        }
    })
    $:console.info(data.communities)
</script>

<svelte:head>
    <title>Communicate</title>
</svelte:head>
<Toaster/>
<main class="flex flex-col gap-4 m-4">
    <section class="bg-white py-4 px-4 rounded-lg">
        <div class="flex gap-4 items-center flex-wrap justify-between">
            <h2 class="flex text-emphasis1 font-bold text-2xl  h-full">Tus comunidades</h2>
            <div class="text-rose-400 flex items-center">
                <Dialog>
                    <PlusCircle size={30} slot="trigger"/>

                    <X size={16} slot="close"/>

                    <div slot="content" class="p-6">
                        <h2 class="m-0 text-lg font-medium text-black">
                            Crear comunidad
                        </h2>

                        <div class="mb-5 mt-2 leading-normal text-zinc-600">
                            Completa la información requerida para crear tu comunidad.
                        </div>

                        <form method="post" action="?/create" enctype="multipart/form-data" class="flex flex-col gap-4">
                            <fieldset class="flex flex-col gap-1">
                                <label for="name">Nombre</label>
                                <input class="brand-input" type="text" name="name" id="name" required>
                            </fieldset>

                            <fieldset class="flex flex-col gap-1">
                                <label for="description">Descripción</label>
                                <textarea class="brand-input" name="description" id="description" required/>
                            </fieldset>

                            <ImageInput styles="brand-input" emptyText="Sin banner" name="banner" required={true}/>

                            <button type="submit" class="brand-btn">Crear</button>
                        </form>
                    </div>
                </Dialog>

            </div>

        </div>

        <div class="flex flex-wrap gap-4 my-4">
            {#if data.communities}
                {#each data.communities as community}
                    {#await data.supabase.storage.from('community_banners').createSignedUrl(community.banner_src, 60)}
                        loading...
                    {:then banner}
                        <a href="app/community/{community.community_id}" class="flex-1 max-w-lg">
                            <CommunityCard
                                    name={community.community_name}
                                    adminAvatarSrc={data.supabase.storage.from('profiles').getPublicUrl(community.adminsrc).data.publicUrl}
                                    n_members={community.total_members}
                                    bannerSrc={banner.data? banner.data.signedUrl : null}>
                            </CommunityCard>
                        </a>
                    {/await}
                {/each}
            {/if}
        </div>
    </section>

</main>





