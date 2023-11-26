<script lang="ts">
    import {Settings2} from 'lucide-svelte'
    import ImageInput from "$lib/components/ImageInput.svelte";
    import Collapse from "$lib/components/Collapse.svelte";
    export let data;

    import MembersList from "../MembersList.svelte";
</script>

<main class="p-2 xs:p-4 flex flex-col gap-4 items-center w-full max-w-3xl">
    {#if data.role.toLowerCase()==='admin' || data.role.toLowerCase()==='mod'}
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
    {/if}

    <MembersList {data}/>
</main>