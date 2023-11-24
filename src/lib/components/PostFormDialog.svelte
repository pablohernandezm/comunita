<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import {nameInitials} from "$lib/utils";
    import {Image, X} from 'lucide-svelte'
    import PostForm from '$lib/components/PostForm.svelte'

    interface UserData {
        name:string
        email: string
        avatarSrc?: string
        isAdmin?: true;
    }
    export let user_data:UserData;

    let fileInput:HTMLInputElement;

</script>


<Dialog>
    <X size={16} slot="close"/>

    <span slot="trigger" class="flex justify-between gap-2 w-full">
        <Avatar src="{user_data.avatarSrc??''}" fallBackText="{nameInitials(user_data.name)}" classes=""/>

        <span class="flex items-center w-full justify-between gap-4">
            <input name="create-trap" type="text" class="input input-ghost border-base-300 w-full flex-grow" placeholder="Crear una publicación" autocomplete="off">

            <button type="button" class="btn btn-neutral bg-base-100 border-none text-base-300 hover:text-base-100">
                <Image/>
            </button>
        </span>
    </span>

    <div slot="content" role="tablist" class="tabs tabs-lifted">
        <PostForm fileInputHandler={fileInput}
                  title="Publicación"
                  info="Todos pueden ver tus publicaciones."
                  formAction="?/submit-post"
                  needsFiles={true}
                  textRequired={false}
                  key="1"
        />


        {#if user_data.isAdmin}
            <PostForm fileInputHandler={fileInput}
                      title="Aviso"
                      info="Tus avisos serán destacados en la comunidad."
                      formAction="?/submit-notice"
                      key="2"
            />
        {/if}
    </div>
</Dialog>