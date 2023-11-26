<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte"
    import ImageInput from "$lib/components/ImageInput.svelte";
    import {X, PlusCircle} from 'lucide-svelte'

    import CommunityCard from "$lib/components/CommunityCard.svelte";
</script>

<svelte:head>
    <title>Communicate</title>
</svelte:head>

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

                        <form action="?/create" class="flex flex-col gap-4">
                            <fieldset class="flex flex-col gap-1">
                                <label for="name">Nombre</label>
                                <input class="brand-input" type="text" name="name" id="name" required>
                            </fieldset>

                            <fieldset class="flex flex-col gap-1">
                                <label for="description">Descripción</label>
                                <textarea class="brand-input" name="description" id="description" required/>
                            </fieldset>

                            <ImageInput styles="brand-input" emptyText="Sin banner"/>

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





