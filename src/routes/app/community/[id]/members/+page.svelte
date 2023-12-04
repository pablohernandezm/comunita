<script>
    import Avatar from "$lib/components/Avatar.svelte";
    import MemberMenu from "./MemberMenu.svelte";

    export let data;
</script>
<svelte:head>
    <title>Miembros - {data.communityData.name}</title>
</svelte:head>
<main class="flex flex-col p-6 overflow-clip w-full relative items-center">
    {#if data.list}
        <div class="overflow-x-auto bg-base-100 w-full max-w-[80svw] p-6 rounded-2xl">
            <table class="table">
                <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {#each data.list as item}
                        <tr class="hover">
                            <td>
                                <Avatar src={data.supabase.storage.from('profiles').getPublicUrl(item.avatar_src).data.publicUrl} fallBackText={item.name}/>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                {#if item.role==='admin'}
                                    Administrador
                                {:else if item.role==='mod'}
                                    Moderador
                                {:else}
                                    Miembro
                                {/if}
                            </td>
                            <td>
                                <MemberMenu member_role={item.role} user_role={data.role} member_id={item.id}/>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</main>