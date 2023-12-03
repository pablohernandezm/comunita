<script lang="ts">
    import {Settings, Link, Users, Info, ChevronDownSquare, ChevronUpSquare, CalendarDays} from 'lucide-svelte'
    import Collapse from "$lib/components/Collapse.svelte";
    import { createCollapsible, melt } from '@melt-ui/svelte';
    import {slide} from "svelte/transition";

    export let data;

    const {
        elements: { root, content, trigger },
        states: { open },
    } = createCollapsible();

    let created_at=(new Date(data.communityData.created_at)).toLocaleDateString();
</script>

<header class="relative bg-white">
    {#if data.communityData.bannerSRC}
        {#await data.supabase.storage.from('community_banners').createSignedUrl(data.communityData.bannerSRC, 60)}
            <div class="w-full h-60"/>
        {:then banner}
            <img src="{banner.data?.signedUrl}" alt="Banner" class="w-full h-60 object-cover">
        {/await}
    {/if}


    <div class="py-6 px-8 flex justify-between flex-col gap-4 sm:flex-row w-full flex-wrap sm:items-center">
        <a href="/app/community/{data.communityData.id}">
            <h1 lang="es" class="text-4xl font-bold text-zinc-900 break-all line-clamp-2 leading-normal">
                {data.communityData.name}
            </h1>
        </a>

        <div class="flex gap-2 h-fit ">
           <div class="flex gap-2 flex-wrap">
               <div class="lg:tooltip tooltip-bottom tooltip-info flex-1" data-tip="Configuración">
                   <a href="/app/community/{data.communityData.id}/settings" class="flex bg-rose-400 p-2 rounded-lg text-white items-center gap-1 w-full">
                       <Settings size={20}/>
                       <span class="hidden md:inline">Configuración</span>
                   </a>
               </div>

               <div class="lg:tooltip tooltip-bottom tooltip-info flex-1" data-tip="Compartir">
                   <button class="bg-rose-400 p-2 rounded-lg text-white flex gap-1 items-center w-full">
                       <Link size={20}/>
                       <span class="hidden md:inline">Enlaces</span>
                   </button>
               </div>

               <div class="lg:tooltip tooltip-bottom tooltip-info flex-1" data-tip="Miembros">
                   <a href="/app/community/{data.communityData.id}/members" class="flex bg-rose-400 p-2 rounded-lg text-white items-center gap-1 w-full">
                       <Users size={20}/>
                       <span class="hidden md:inline">Miembros</span>
                   </a>
               </div>

               <div class="flex items-center xl:hidden">
                   <button class="text-emphasis1 w-full" use:melt={$trigger}>
                       {#if $open}
                           <ChevronUpSquare size={30}/>
                       {:else}
                           <ChevronDownSquare size={30}/>
                       {/if}
                   </button>
               </div>
           </div>
        </div>

    </div>

    <div use:melt={$root}>
        {#if $open}
            <div class="flex flex-col gap-6 p-6" use:melt={$content} transition:slide>
                {data.communityData.description}

                <div class="flex gap-2 items-center">
                    <CalendarDays/>
                    {created_at}
                </div>
            </div>
        {/if}
    </div>
</header>

<div class="grid justify-items-center xl:grid-cols-[2.5fr_1fr]">
    <div class="p-6 max-w-lg-full order-1 hidden xl:flex xl:order-2 w-full">
        <div class="h-full relative w-full">
            <div class="sticky top-8 flex flex-col gap-4">
                <Collapse checked={true}>
                    <div class="contents" slot="title">
                        <h2 class="flex gap-1 text-lg font-bold items-center w-full">
                            Descripción
                            <Info/>
                        </h2>
                    </div>

                    <div class="contents" slot="content">
                        <div class="flex flex-col gap-6">
                            {data.communityData.description}

                            <div class="flex gap-2 items-center">
                                <CalendarDays/>
                                {created_at}
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    </div>

    <div class="order-2 xl:order-1 w-full flex justify-center">
        <slot/>
    </div>
</div>