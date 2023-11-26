<script lang="ts">
    import {nameInitials} from "$lib/utils.js";
    import {Settings2, Users} from "lucide-svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import Collapse from "$lib/components/Collapse.svelte";
    import type {PageData} from "./$types"

    type RoleGroup='Administradores' | 'Moderadores' | 'Miembros';
    export let roleGroups:RoleGroup[]=['Administradores', 'Moderadores', 'Miembros']
    export let data:PageData;
</script>

<Collapse>
    <div slot="title" class="contents">
        <Users class="h-6 flex-shrink-0"/>
        <h2 class="truncate text-xl font-medium">
            Miembros
        </h2>
    </div>

    <div slot="content">
        <div class="flex flex-col gap-6">
            {#each roleGroups as group}
                <div class="flex flex-col gap-4">
                    <h3 class="w-full text-lg font-medium">{group}</h3>

                    <ul>
                        <li class="flex justify-center w-full">
                            <div class="flex items-center gap-4 w-full">
                                <Avatar src="{data.avatarUrl}" fallBackText="{nameInitials(data.name)}" size={50}/>
                                <div class="text-md flex flex-col">
                                    <strong>{data.name}</strong>
                                    <em>{data.email}</em>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <button class="btn btn-neutral">
                                    <Settings2/>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            {/each}
        </div>
    </div>
</Collapse>