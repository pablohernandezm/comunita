<script lang="ts">
    import {Settings, Link, Users} from 'lucide-svelte'
    export let data;
</script>

<header class="relative bg-white">
    <img src="{data.bannerSrc}" alt="Banner" class="w-full h-60 object-cover">

    <div class="p-6 flex justify-between flex-col gap-4 sm:flex-row w-full">
        <div class="flex flex-col">
            <a href="/app/community/{data.id}">
                <h1 class="text-4xl font-bold text-zinc-900">
                    {data.name}
                </h1>
            </a>

            <div class="flex items-center gap-1">
                <Users size={16}/>
                1 miembro
            </div>
        </div>

        <div class="flex gap-2 h-fit">
            <div class="tooltip tooltip-bottom tooltip-info" data-tip="Configuración">
                <a href="/app/community/{data.id}/settings" class="flex bg-rose-400 p-2 rounded-lg text-white">
                    <Settings size={20}/>
                </a>
            </div>

            <div class="tooltip tooltip-bottom tooltip-info" data-tip="Compartir">
                <button class="bg-rose-400 p-2 rounded-lg text-white">
                    <Link size={20}/>
                </button>
            </div>
        </div>

    </div>

</header>

<slot></slot>