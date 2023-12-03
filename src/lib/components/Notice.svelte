<script lang="ts">
    import {nameInitials} from "$lib/utils";
    import Avatar from "$lib/components/Avatar.svelte";
    import {AlertTriangle, History} from 'lucide-svelte'
    import type {Database} from "$lib/database.types";

    export let user_data:Database['public']['Tables']['Profiles']['Row']
    export let content:Database['public']['Tables']['Notices']['Row'];
    export let email:string|undefined;
</script>

<div class="relative">
    <details class="collapse gap-4 rounded-lg p-4 bg-base-100 border border-rose-400">

        <summary class="collapse-title text-lg text-warning gap-2">
            <AlertTriangle class="flex-shrink-0 my-0.5"/>
            <span>
                {content.title}
            </span>
        </summary>

        <div class="collapse-content flex flex-col gap-4">
            <div>
                {content.body}
            </div>

            <div class="flex gap-1 items-center">
                <Avatar src="{user_data.avatarSrc??''}" fallBackText={nameInitials(user_data.name)} />

                <div class="overflow-hidden w-full">
                    <strong class="truncate block">{user_data.name}</strong>
                    <p class="text-zinc-700 flex items-center gap-1">
                        <span class="truncate">{email}</span>
                    </p>
                </div>
            </div>
        </div>
    </details>

    <div class="absolute bottom-2 right-2">
        <div class="relative tooltip tooltip-left w-fit" data-tip="Ver historial de advertencias">
            <a href="/">
                <History/>
            </a>
        </div>
    </div>
</div>