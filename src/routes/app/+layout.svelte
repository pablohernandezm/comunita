<script lang="ts">
    import Avatar from '$lib/components/Avatar.svelte'
    import Logo from "$lib/components/Logo.svelte";
    import {createPopover, melt} from "@melt-ui/svelte";
    import {fade} from 'svelte/transition'
    import {LogOut, UserCircle2} from 'lucide-svelte'
    import {nameInitials} from '$lib/utils'
    export let data;
    let initials = nameInitials(data.session_name);

    /*Popover*/
    const{
        elements: {trigger, content, close},
        states: { open },
    } = createPopover({
        forceVisible: true,
    })

    let id=1;
</script>
<header class="flex justify-between px-8 py-4 bg-white shadow-gray-200 shadow z-50 relative">
    <a href="/app" aria-label="Logo" class="flex items-center gap-2">
        <Logo size={36}/>
        <span class="hidden text-3xl text-primary xs:inline-block bg-gradient-to-tr from-primary to-[#FFB033] via-primary text-transparent bg-clip-text font-DMSans lowercase">
            Comunita
        </span>
    </a>

    <div class="flex">
        <button type="button" class="flex-shrink-0">
            <img src="/bell.svg" alt="Notificaciones" class="w-10 h-10">
        </button>

        <button type="button" aria-label="Opciones de usuario" use:melt={$trigger}>
            <Avatar src={data.session_avatarUrl} fallBackText={initials}></Avatar>
        </button>
    </div>
</header>

{#if $open}
    <div use:melt={$content} transition:fade={{duration: 100}} class="flex z-50 flex-col px-4 py-4 bg-white gap-4 border border-zinc-200 translate-y-2 rounded-md">

        <div class="flex gap-4">
            <Avatar src={data.session_avatarUrl} fallBackText={initials}></Avatar>

            <div class="flex flex-col gap-0 text-lg">
                <p class="font-bold text-emphasis1">{data.session_name}</p>
                <small class="font-thin text-sm">{data.session_email}</small>
            </div>
        </div>

        <ul class="flex flex-col gap-2 pl-2">
            <li>
                <a use:melt={$close} href="/app/profile/{id}" class="icon-link hover:underline text-emphasis1/90"><UserCircle2 size={16}/> Ver perfil</a>
            </li>
            <li>
                <a use:melt={$close} href="/app/logout{id}" class="icon-link hover:underline text-emphasis1/90"><LogOut size={16}/>Cerrar sessión</a>
            </li>

        </ul>
    </div>
{/if}

<slot></slot>