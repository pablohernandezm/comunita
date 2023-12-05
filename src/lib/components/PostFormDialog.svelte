<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import {nameInitials} from "$lib/utils";
    import {Image, X} from 'lucide-svelte'
    import PostForm from '$lib/components/PostForm.svelte'
    import type{Database} from '$lib/database.types'

    type ProfileData=Database['public']['Tables']['Profiles']['Row'];

    export let user_data:ProfileData;
    export let role:Database['public']['Enums']['community_role'];
</script>


<Dialog>
    <X size={16} slot="close"/>

    <span slot="trigger" class="flex justify-between gap-2 w-full p-6">
        <Avatar src="{user_data.avatarSrc??''}" fallBackText="{nameInitials(user_data.name)}" classes=""/>

        <span class="flex items-center w-full justify-between gap-4">
            <input tabindex="-1" readonly name="create-trap" type="text" class="input input-ghost border-base-300 w-full flex-grow truncate" placeholder="Crear una publicación" autocomplete="off">

            <button type="button" class="btn btn-neutral bg-base-100 border-none text-base-300 hover:text-base-100" aria-label="Añade imágenes a las publicaciones">
                <Image/>
            </button>
        </span>
    </span>

    <div slot="content" role="tablist" class="tabs tabs-lifted">
        <PostForm title="Publicación"
                  info="Todos pueden ver tus publicaciones."
                  formAction="?/create_post"
                  needsFiles={true}
                  textRequired={true}
                  key="1"
                  multipleImages={true}
        />


        {#if role==='admin' || role==='mod'}
            <PostForm title="Aviso"
                      info="Tus avisos serán destacados en la comunidad."
                      formAction="?/create_notice"
                      key="2"
                      needsTitle={true}
            />
        {/if}
    </div>
</Dialog>