<script lang="ts">
    import Warning from "$lib/components/Notice.svelte";
    import Post from "$lib/components/Post.svelte";
    import PostFormDialog from '$lib/components/PostFormDialog.svelte'
</script>

<svelte:head>
    <title>Raíz del destino</title>
</svelte:head>

<main class="py-6 px-4 sm:p-6 flex flex-col gap-4 max-w-2xl relative ">
    <div class="flex flex-col gap-4">
        <div class="">
            <Warning user_data={{name:'Pablo José Hernández Meléndez', email:'phernandezm07@gmail.com', avatarSrc:'https://thispersondoesnotexist.com'}} content={{title:"I know you're watching me", body:'"I sat back in my chair looking at the right hand screen. A red dot started moving slowly towards the area where the young girl called from. Watching as it got closer and closer, I wondered if she was okay. Then the dot just stopped. This usually means the responding officer got to the location or close to it. Our map shows streets, but it doesn’t pin point the exact spot."'}}/>
        </div>
    </div>

    <div class="flex w-full">
        <PostFormDialog user_data={{name:'Pablo José Hernández Meléndez', email:'phernandezm07@gmail.com', avatarSrc:'https://thispersondoesnotexist.com', isAdmin:true}}/>
    </div>

    <div class="flex flex-col gap-4">
        <Post
                user_data={{name:'Pablo José Hernández Meléndez', email:'phernandezm07@gmail.com', avatarSrc:'https://thispersondoesnotexist.com'}}
                post_data="{{id:'1',date: new Date('2023-07-19'), body:'He resented it. Why had he been birthed now, with such precious little time left? It seemed to him that of all the cruelties he had witnessed, this was the gravest. Every day he sought escape, but was never given it. The starship was useless. Suicide would not do any good. The only option was to wait. As he waited, he thought of all the worthwhile things he could have done with his life, had he been given a chance for one. He could have been a scientist, discovering new and better ways to look at the world. All he could do now was watch it crumble around him. He could have been a priest, worshiping and serving the gods. All he could do now was pray to any that had not yet died. He could have done anything—but here he was, destined to die before he had even reached maturity. As he stared out the last window not to have been confiscated as building material for some mining drone, he sighed. None of them would survive. It seemed almost merciful that the planet was ending them quickly.', imagesSrc:['https://i1.sndcdn.com/artworks-DUUcfBDfB2F9wRiV-WfBrRQ-t500x500.jpg', 'https://www.travelblissful.com/wp-content/uploads/2021/09/devils-tramping-groundd.jpg.webp', 'https://media.istockphoto.com/id/1040315976/es/foto/mujer-busca-en-vista-de-una-cueva-de-matera-basilicata-italy.jpg?s=1024x1024&w=is&k=20&c=9FTYaPlbJqC-YFXro2dNcbzGOHAhgTT5jpfxJDond0g=', 'https://media.istockphoto.com/id/1040315838/es/foto/mujer-mirando-a-vista-de-matera-basilicata-italy.jpg?s=1024x1024&w=is&k=20&c=JM2at9oGR5FRrm0hbpukpinGDfGc9g5mIxbSsRYL4-Q=']}}"
        />

        <Post
                user_data={{name:'Pablo José Hernández Meléndez', email:'phernandezm07@gmail.com', avatarSrc:'https://thispersondoesnotexist.com'}}
                post_data="{{id:'2',date: new Date('2023-07-19'), body:'He resented it. Why had he been birthed now, with such precious little time left? It seemed to him that of all the cruelties he had witnessed, this was the gravest. Every day he sought escape, but was never given it. The starship was useless. Suicide would not do any good. The only option was to wait. As he waited, he thought of all the worthwhile things he could have done with his life, had he been given a chance for one. He could have been a scientist, discovering new and better ways to look at the world. All he could do now was watch it crumble around him. He could have been a priest, worshiping and serving the gods. All he could do now was pray to any that had not yet died. He could have done anything—but here he was, destined to die before he had even reached maturity. As he stared out the last window not to have been confiscated as building material for some mining drone, he sighed. None of them would survive. It seemed almost merciful that the planet was ending them quickly.', imagesSrc:['https://i1.sndcdn.com/artworks-DUUcfBDfB2F9wRiV-WfBrRQ-t500x500.jpg', 'https://www.travelblissful.com/wp-content/uploads/2021/09/devils-tramping-groundd.jpg.webp', 'https://media.istockphoto.com/id/1040315976/es/foto/mujer-busca-en-vista-de-una-cueva-de-matera-basilicata-italy.jpg?s=1024x1024&w=is&k=20&c=9FTYaPlbJqC-YFXro2dNcbzGOHAhgTT5jpfxJDond0g=', 'https://media.istockphoto.com/id/1040315838/es/foto/mujer-mirando-a-vista-de-matera-basilicata-italy.jpg?s=1024x1024&w=is&k=20&c=JM2at9oGR5FRrm0hbpukpinGDfGc9g5mIxbSsRYL4-Q=']}}"
        />
    </div>
</main>
