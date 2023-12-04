<script lang="ts">
    import Warning from "$lib/components/Notice.svelte";
    import Post from "$lib/components/Post.svelte";
    import PostFormDialog from '$lib/components/PostFormDialog.svelte'
    import type {Database} from '$lib/database.types';
    import {onMount} from "svelte";
    import {addToast} from "$lib/components/Toaster.svelte";
    export let data;
    export let form;

    type PostRow=Database['public']['Tables']['Posts']['Row'];
    let posts:PostRow[] = [];
    let index=(new Date()).toLocaleDateString();

    async function loadPosts(){
        const {data:postData} =
            await data.supabase.from('Posts')
                .select('*, Profiles!inner(*)')
                .gt('created_at', index)
                .order('created_at', {ascending:false})
        if (postData!==null){
            posts=posts.concat(postData);
        }

        if (posts.length>0){
            index = posts[posts.length-1].created_at;
        }
    }

    onMount(()=>{
        loadPosts();

        if(form){
            addToast({
                data:{
                    title:form.title,
                    description:form.message??'',
                    color:form.color??'yellow',
                }
            })
        }
    })
</script>

<svelte:head>
    <title>{data.communityData.name}</title>
</svelte:head>

<main class="py-6 px-4 sm:p-6 flex flex-col gap-4 max-w-3xl relative w-full">
    {#if data.notice_info}
        <div class="flex flex-col gap-4">
            <div>
                <Warning user_data={data.notice_info.author_info.profile} content={data.notice_info.notice} email={data.notice_info.author_info.email}/>
            </div>
        </div>
    {/if}

    <div class="flex w-full">
        <PostFormDialog user_data={data.profile} role="{data.role}"/>
    </div>

    <div class="flex flex-col gap-4 w-auto">
        {#each posts as post}
            <Post
                    user_data={data.profile}
                    post_data={post}
                    supabase={data.supabase}
            />
        {/each}
    </div>
</main>
