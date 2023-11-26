<script lang="ts">
    /*import { nameInitials} from "$lib/utils";
    import Avatar from "$lib/components/Avatar.svelte";*/

    import {Settings2, Users} from 'lucide-svelte'
    import ImageInput from "$lib/components/ImageInput.svelte";
    import Collapse from "$lib/components/Collapse.svelte";
    export let data;
</script>

<main class="p-2 xs:p-4 flex flex-col gap-4 items-center">
    <Collapse>
        <div slot="title" class="contents">
            <Settings2 class="h-6 flex-shrink-0"/>
            <h2 class="truncate text-xl font-medium">
                Ajustes de la comunidad
            </h2>
        </div>

        <div slot="content">
            <form action="?submit-settings" class="flex flex-col gap-4">
                <fieldset class="flex flex-col gap-1">
                    <label for="name">Nombre</label>
                    <input type="text" name="name" id="name" class="input input-primary">
                </fieldset>

                <fieldset class="flex flex-col gap-1">
                    <label for="description">Descripción</label>
                    <textarea name="description" id="description" class="textarea textarea-primary" />
                </fieldset>

                <ImageInput emptyText="Sin cambios" name="banner" label="Banner"/>
            </form>
        </div>
    </Collapse>

    <Collapse>
        <div slot="title" class="contents">
            <Users class="h-6 flex-shrink-0"/>
            <h2 class="truncate text-xl font-medium">
                Miembros
            </h2>
        </div>

        <div slot="content">
            <div>
                <h3 class="w-full text-md font-medium">Adminisradores</h3>

                <div>
                    ---
                </div>
            </div>

            <div>
                <h3 class="w-full text-md font-medium">Moderadores</h3>

                <div>
                    ---
                </div>
            </div>

            <div>
                <h3 class="w-full text-md font-medium">Otros miembros</h3>

                <div>
                    ---
                </div>
            </div>
        </div>
    </Collapse>
</main>