<script lang="ts">
    import {dateDifference} from "$lib/utils";
    import { nameInitials} from "$lib/utils";
    import Avatar from '$lib/components/Avatar.svelte';
    import {Clock, ArrowRightCircle, ArrowLeftCircle} from "lucide-svelte";

    interface UserData{
        name:string
        email: string
        avatarSrc?: string
    }

    interface  PostData{
        id: string
        body: string
        date: Date
        imagesSrc?: string[]
    }
    export let user_data:UserData;
    export let post_data:PostData;

    let diff =  dateDifference(post_data.date)
    let diffString:string;

    if(diff.years>0) diffString = `${diff.years} años`
    else if(diff.months>0) diffString = `${diff.months} meses`
    else if(diff.weeks>0) diffString = `${diff.weeks} semanas`
    else if(diff.days>0) diffString = `${diff.days} días`
    else if(diff.hours>0) diffString = `${diff.hours} días`
    else if(diff.minutes>0) diffString = `${diff.minutes} minutos`
    else if(diff.seconds>0) diffString = `${diff.seconds} segundos`

    let seeMore=false;
    const toggleSeeMore = () => {
        seeMore=!seeMore;
    }
</script>

<div class="bg-white p-6 flex flex-col rounded-lg max-w-screen-md">
    <div class="flex gap-1 items-center">
        <Avatar src="{user_data.avatarSrc??''}" fallBackText={nameInitials(user_data.name)} />

        <div>
            <strong>{user_data.name}</strong>
            <p class="text-zinc-700 flex items-center gap-1">
                <Clock size={16}/>
                <span>Hace {diffString}</span>
            </p>
        </div>
    </div>

    <div class="py-4 flex flex-col gap-4">
        <div class="{seeMore?'':'line-clamp-4'} gap-4">
            {post_data.body}

            {#if post_data.imagesSrc}
                <div class="flex flex-col relative items-center mt-8 mb-8">
                    <div class="carousel carousel-center bg-neutral rounded-box max-w-md">
                        {#each post_data.imagesSrc as image, i}
                            <div id="{post_data.id}-img{i}" class="carousel-item relative overflow-hidden w-full">
                                <img src="{image}" alt="Post image {i}" class="rounded-box max-w-md w-full">

                                <a tabindex="-1" href="#{post_data.id}-img{(i+1)>=post_data.imagesSrc.length ? 0 : i+1}" class="text-white bg-black absolute right-1 top-1/2 translucid-btn">
                                    <ArrowRightCircle/>
                                </a>

                                <a tabindex="-1" href="#{post_data.id}-img{(i-1)<0 ? post_data.imagesSrc.length-1 : i-1}" class="text-white bg-black absolute left-1 top-1/2 translucid-btn">
                                    <ArrowLeftCircle/>
                                </a>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>

        <button type="button" on:click={toggleSeeMore} class="btn h-2">
            {#if seeMore}
                Mostrar menos
            {:else}
                Mostrar más
            {/if}
        </button>
    </div>

</div>