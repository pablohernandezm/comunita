<script lang="ts">
    import {Menu, ArrowBigDownDash, ArrowBigUpDash, UserCircle2} from 'lucide-svelte'
    import { createDropdownMenu, melt } from '@melt-ui/svelte'
    import type {Database} from "$lib/database.types";
    import {enhance} from "$app/forms";
    import {invalidateAll} from "$app/navigation";
    import {onMount} from "svelte";
    import {addToast} from "$lib/components/Toaster.svelte";

    const {
        elements: { menu, item, trigger},
        states:{open}
    } = createDropdownMenu()

    type Role=Database['public']['Enums']['community_role'];
    export let member_role:Role;
    export let member_id:string;
    export let user_role:Role;

    interface MenuOption{
        text:'administrador'|'moderador'|'miembro regular',
        ascend:boolean
    }

    let menuOptions:MenuOption[]=[];

    function loadOptions(){
        menuOptions=[];
        if (user_role==='admin'){
            if (member_role==='mod'){
                menuOptions.push({
                    text:'administrador',
                    ascend:true,
                })

                menuOptions.push({
                    text:'miembro regular',
                    ascend:false,
                })
            } else if(member_role==='admin'){
                menuOptions.push({
                    text:'moderador',
                    ascend:false,
                })
            } else if(member_role==='regular'){
                menuOptions.push({
                    text:'moderador',
                    ascend:true,
                })
            }
        }
    }

    onMount(loadOptions);

</script>

<button use:melt={$trigger}><Menu/></button>
{#if $open}
    <ul use:melt={$menu} class="menu bg-info max-w-[80svw] text-black p-2 rounded-lg">
        <li use:melt={$item}>
            <a href={`/app/profile/${member_id}`} class="text-black flex gap-2">
                <UserCircle2 class="shrink-0"/> <span>Ver perfil</span>
            </a>
        </li>

        {#each menuOptions as option}
            <li use:melt={$item}>
                <form method="post" class="flex flex-col items-start" use:enhance={()=>{
                    return async ({result})=>{
                        if (result.type==='success') {
                            await invalidateAll();

                            addToast({
                                data:{
                                    title:'Rol actualizado con éxito',
                                    color:'green'
                                }
                            });
                        }
                        else if (result.type==='failure'){
                            if (result.data){
                                addToast({
                                    data:{
                                        title:'Error',
                                        description: 'No se pudo actualizar el rol',
                                        color:'red'
                                    }
                                })
                            }
                            console.error(result.data)
                        }
                    }
                }}>

                    <input type="text" name="member_id" hidden value={member_id}>
                    <div class="flex gap-2">
                        {#if option.ascend}
                            <ArrowBigUpDash class="shrink-0"/>
                        {:else}
                            <ArrowBigDownDash class="shrink-0"/>
                        {/if}
                        <button formaction={option.ascend?'?/ascend_member':'?/descend_member'}>
                            {option.ascend?'Ascender':'Descender'}
                            <span class="hidden xs:inline">
                                a {option.text}
                            </span>
                        </button>
                    </div>
                </form>
            </li>
        {/each}

        {#if user_role==='admin' || (user_role==='mod' && member_role==='regular')}
            <li use:melt={$item}>
                <form method="post" action='?/remove_member' class="flex flex-col text-red-600 hover:text-red-600 hover:bg-rose-100 border-warning border" use:enhance={()=>{
                    return async ({result})=>{
                        if (result.type==='success') {
                            await invalidateAll();

                            addToast({
                                data:{
                                    title:'Miembro expulsado con éxito',
                                    color:'green'
                                }
                            });
                        }
                        else if (result.type==='failure'){
                            if (result.data){
                                addToast({
                                    data:{
                                        title:'Error',
                                        description: 'No se pudo ejecutar la expulsión',
                                        color:'red'
                                    }
                                })
                            }
                            console.error(result.data)
                        }
                    }
                }}>
                    <input type="text" name="member_id" hidden value={member_id}>
                    <button class="flex gap-2 items-center">
                        <span>Expulsar</span>
                    </button>
                </form>
            </li>
        {/if}
    </ul>
{/if}