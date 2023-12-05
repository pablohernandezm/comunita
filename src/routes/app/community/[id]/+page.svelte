<script lang="ts">
    import Warning from "$lib/components/Notice.svelte";
    import Post from "$lib/components/Post.svelte";
    import PostFormDialog from '$lib/components/PostFormDialog.svelte'
    import type {Database} from '$lib/database.types';
    import {onMount} from "svelte";
    import {addToast} from "$lib/components/Toaster.svelte";
    import moment from 'moment'
    export let data;
    export let form;

    type PostRow=Database['public']['Functions']['get_posts']['Returns'];
    let posts:PostRow=[];

    let index=moment().utc().toISOString();
    let loading=false;

    async function loadPosts(){
        const {data:postData} = await data.supabase.rpc('get_posts', {_index:index, _community_id:data.communityData.id});

        if (postData!==null){
            posts=posts.concat(postData);
        }

        if (posts.length>0){
            index = posts[posts.length-1].created_at;
        }

        loading=false;
    }

    onMount(async ()=>{
        await loadPosts();

        if(form){
            addToast({
                data:{
                    title:form.title,
                    description:form.message??'',
                    color:form.color??'yellow',
                }
            })
        }

        window.addEventListener('scroll', async () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (!loading && scrollTop + clientHeight >= scrollHeight) {
                loading=true;
                await loadPosts();
            }
        }, {
            passive: true
        });
    })
</script>

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
                    post_data={post}
                    supabase={data.supabase}
            />
        {/each}
    </div>
</main>
