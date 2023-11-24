<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte"
    import {X, FileImage, PlusCircle} from 'lucide-svelte'

    import CommunityCard from "./CommunityCard.svelte";
    let fileInput:HTMLInputElement;
</script>

<svelte:head>
    <title>Communicate</title>
</svelte:head>

<main class="flex flex-col gap-4 m-4">

    <section class="bg-white py-4 px-4 rounded-lg">
        <div class="flex gap-4 items-center flex-wrap-reverse justify-between">
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

                        <form action="?/create" class="flex flex-col gap-4">
                            <fieldset class="flex flex-col gap-1">
                                <label for="name">Nombre</label>
                                <input class="brand-input" type="text" name="name" id="name">
                            </fieldset>

                            <fieldset class="flex flex-col gap-1">
                                <label for="description">Descripción</label>
                                <textarea class="brand-input" name="description" id="description"></textarea>
                            </fieldset>

                            <fieldset>
                                <button class="flex flex-col gap-1 brand-input" on:click={()=>{fileInput.click();}}>
                                    <label for="banner" class=" flex flex-row items-center gap-2 hover:cursor-pointer">
                                        <FileImage size={24} class="text-rose-400"/>
                                        <span class="text-zinc-800">Escoge un archivo</span>
                                    </label>

                                    <input type="file" id="banner" accept="image/jpeg, image/png" bind:this={fileInput} hidden>
                                </button>
                            </fieldset>

                            <button type="submit" class="brand-btn">Crear</button>
                        </form>
                    </div>
                </Dialog>

            </div>

        </div>

        <div class="flex flex-wrap gap-4 my-4">
            <a href="app/community/1">
                <CommunityCard
                        name="Raíz del destino"
                        adminAvatarSrc="https://thispersondoesnotexist.com"
                        n_members={1}
                        bannerSrc="https://c4.wallpaperflare.com/wallpaper/867/119/831/arbol-naturaleza-roble-viejo-wallpaper-preview.jpg">
                </CommunityCard>
            </a>

        </div>
    </section>

</main>





