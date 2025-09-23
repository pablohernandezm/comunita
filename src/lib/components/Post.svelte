<script lang="ts">
    import {dateDifference} from "$lib/utils";
    import { nameInitials} from "$lib/utils";
    import Avatar from '$lib/components/Avatar.svelte';
    import {Clock, ArrowRightCircle, ArrowLeftCircle} from "lucide-svelte";
    import type {Database} from '$lib/database.types'
    import type {SupabaseClient} from "@supabase/supabase-js";
    import {onMount} from "svelte";

    type PostData = Database['public']['Functions']['get_posts']['Returns']
    export let post_data:PostData[number];
    export let supabase:SupabaseClient<Database>

    const avatarUrl = post_data.avatar_src? supabase.storage.from('profiles').getPublicUrl(post_data.avatar_src).data.publicUrl:'';

    let diff =  dateDifference(new Date(post_data.created_at))
    let diffString:string;

    if(diff.years>0) diffString = `${diff.years} ${diff.years===1?'año':'años'}`
    else if(diff.months>0) diffString = `${diff.months} ${diff.months===1?'mes':'meses'}`
    else if(diff.weeks>0) diffString = `${diff.weeks} ${diff.weeks===1?'semana':'semanas'}`
    else if(diff.days>0) diffString = `${diff.days} ${diff.days===1?'día':'días'}`
    else if(diff.hours>0) diffString = `${diff.hours} ${diff.hours===1?'hora':'horas'}`
    else if(diff.minutes>0) diffString = `${diff.minutes} ${diff.minutes===1?'minuto':'minutos'}`
    else if(diff.seconds>0) diffString = `${diff.seconds} ${diff.seconds===1?'segundo':'segundos'}`

    let seeMore=false;
    let isTruncated=false;
    const toggleSeeMore = () => {
        seeMore=!seeMore;
    }

    let contentArea:HTMLDivElement
    onMount(()=>{
        if(contentArea.offsetHeight<contentArea.scrollHeight){
            isTruncated=true;
        }
    })
</script>

<div class="bg-white p-6 flex flex-col rounded-lg max-w-screen-md">
    <div class="flex gap-1 items-center">
        <Avatar src="{avatarUrl}" fallBackText={nameInitials(post_data.name)} />

        <div>
            <strong>{post_data.name}</strong>
            <p class="text-zinc-700 flex items-center gap-1">
                <Clock size={16}/>
                <span>Hace {diffString}</span>
            </p>
        </div>
    </div>

    <div class="py-4 flex flex-col gap-4">
        <div class="{seeMore?'':'line-clamp-4'} gap-4" bind:this={contentArea}>
            {post_data.body}

            {#if post_data.images_src && post_data.images_src.length>0}
                <div class="flex flex-col relative items-center mt-8 mb-8">
                    <div class="carousel carousel-center bg-neutral rounded-box max-w-md">
                        {#each post_data.images_src as image, i}
                            {#await supabase.storage.from('community_posts').createSignedUrl(image, 360)}
                                loading...
                            {:then src}
                                <div id="{post_data.post_id}-img{i}" class="carousel-item relative overflow-hidden w-full flex justify-center">
                                    <img src={src.data?.signedUrl} alt="Post image {i}" class="rounded-box max-w-md w-auto max-h-96">

                                    <a tabindex="-1" href="#{post_data.post_id}-img{(i+1)>=post_data.images_src.length ? 0 : i+1}" class="text-white bg-black absolute right-1 top-1/2 translucid-btn">
                                        <ArrowRightCircle/>
                                    </a>

                                    <a tabindex="-1" href="#{post_data.post_id}-img{(i-1)<0 ? post_data.images_src.length-1 : i-1}" class="text-white bg-black absolute left-1 top-1/2 translucid-btn">
                                        <ArrowLeftCircle/>
                                    </a>
                                </div>
                            {/await}
                        {/each}
                    </div>
                </div>
            {/if}
        </div>

        {#if isTruncated}
            <button type="button" on:click={toggleSeeMore} class="btn h-2">
                {#if seeMore}
                    Mostrar menos
                {:else}
                    Mostrar más
                {/if}
            </button>
        {/if}
    </div>

</div>