<script lang="ts">
    import { nameInitials} from "$lib/utils";
    import Avatar from "$lib/components/Avatar.svelte";
    import {Mail, Settings2, HeartHandshake, Cake} from 'lucide-svelte'
    import ImageInput from "$lib/components/ImageInput.svelte";
    import DefaultBanner from '$lib/media/default-banner.png?enhanced'
    import CommunityCard from "$lib/components/CommunityCard.svelte";
    import {check} from '$lib/utils'
    import Collapse from "$lib/components/Collapse.svelte";
    export let data;
</script>

<main class="p-2 xs:p-4 py-6 flex flex-col gap-4 items-center xl:justify-center xl:items-start xl:flex-row xl:gap-16">
    <div class="flex flex-col gap-4 max-w-2xl">
        <div class="bg-base-100 p-8 rounded-2xl z-10 relative overflow-auto">
            <div class= "w-full sm:aspect-[21/9] rounded-lg overflow-hidden bg-emphasis1 relative grid">
                <enhanced:img src={DefaultBanner} alt="An alt text" class="aspect-[21/9]"/>
            </div>

            <div class="flex gap-4 items-center relative pt-20 justify-center">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-base-100/50">
                    <Avatar src={data.user_avatarUrl??''} fallBackText="{nameInitials(data.user_name)}" classes="w-[100px] h-[100px]"/>
                </div>

                <h1 class="text-xl font-bold text-zinc-900 truncate leading-snug">{data.user_name}</h1>
            </div>

            <div class="my-4">
                {data.user_biography ?? ''}
            </div>

            <div class="pl-4">
                {#if data.user_email}
                    <a href="mailto:{data.user_email}" class="link-hover truncate flex items-center gap-1 text-emphasis1">
                        <span class="shrink-0"><Mail size={18}/></span>
                        <span class="truncate">{data.user_email}</span>
                    </a>
                {/if}

                {#if data.user_birthDate}
                    <div class="flex gap-1 items-center text-emphasis1">
                        <span class="shrink-0"><Cake size={18}/></span>
                        <span class="truncate">{data.user_birthDate}</span>
                    </div>
                {/if}
            </div>
        </div>

        {#if data.owner}
            <div class="collapse bg-base-100">
                <input type="checkbox" name="settings" class="cursor-pointer" use:check/>

                <div class="collapse-title text-xl font-medium overflow-hidden flex gap-1 p-6 sm:justify-between sm:flex-row-reverse items-center">
                    <Settings2 class="h-6 flex-shrink-0"/>
                    <h2 class="truncate">
                        Configuración
                    </h2>
                </div>
                <div class="collapse-content px-6 overflow-hidden">
                    <div class="flex flex-col xs:px-10 xs:items-center">
                        <form action="?modify" class="flex flex-col gap-3 max-w-md xs:w-96">
                            <div class="flex flex-col gap-1">
                                <fieldset class="contents">
                                    <label for="name-input">Nombre</label>
                                    <input type="text" name="Nombre" id="name-input" class="input input-primary">
                                </fieldset>
                            </div>

                            <div class="flex flex-col gap-1">
                                <fieldset class="contents">
                                    <label for="biography-input">Nombre</label>
                                    <textarea name="biography" id="biography-input" class="textarea textarea-primary"></textarea>
                                </fieldset>
                            </div>

                            <div class="flex flex-col gap-1">
                                <fieldset class="contents">
                                    <label for="date-input">Fecha de nacimiento</label>
                                    <input type="date" class="input input-primary" id="date-input">
                                </fieldset>
                            </div>

                            <ImageInput label="Foto de perfil" emptyText="Sin cambios" name="avatar"/>

                            <ImageInput label="Banner" emptyText="Sin cambios" name="banner"/>

                            <button type="submit" class="btn btn-primary text-base-100 text-lg">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        {/if}
    </div>

    {#if data.communities && data.communities.length>0}
        <div class="max-w-2xl w-full">
            <Collapse checked={true}>
                <div class="contents" slot="title">
                    <div class="text-xl font-medium flex items-center gap-2 text-emphasis1 w-full">
                        <HeartHandshake/>
                        <h2>{data.owner?'Tus comunidades':'Comunidades en común'}</h2>
                    </div>
                </div>
                <div class="contents" slot="content">
                    <div class="flex flex-col gap-4">
                        {#each data.communities as community}
                            <a href="/app/community/{community.community_id}" class="">
                                <CommunityCard
                                        name="{community.community_name}"
                                        n_members={community.total_members}
                                        bannerSrc="{community.banner_src}"
                                        adminAvatarSrc="{data.user_avatarUrl??''}"
                                />
                            </a>
                        {/each}
                    </div>
                </div>
            </Collapse>
        </div>
    {/if}
</main>