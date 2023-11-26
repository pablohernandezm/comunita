<script lang="ts">
    import { Users} from "lucide-svelte";

    import {nameInitials} from "$lib/utils";
    import Avatar from "$lib/components/Avatar.svelte";
    export let name:string;
    export let adminAvatarSrc:string;
    export let n_members:number;
    export let bannerSrc:string;
</script>

<div class="relative rounded-lg overflow-clip bg-emphasis1 text-white flex-auto">
    <img class="absolute w-full h-full object-cover z-0 opacity-40 aspect-square" src="{bannerSrc}" alt="Banner">

    <div class="relative z-10 p-2 flex flex-col px-4 pt-4">
        <div class="flex items-center gap-3 w-full">
            <Avatar src="{adminAvatarSrc} " fallBackText="{nameInitials(name)}"></Avatar>
            <h2 class="text-2xl font-bold w-full line-clamp-1">{name}</h2>
        </div>

        <p class="flex items-center gap-1 justify-end">
            <Users size={16}/>{n_members} {n_members===1?'miembro':'miembros'}
        </p>
    </div>

</div>
