import type {Actions, PageServerLoad} from './$types'
import {fail, redirect} from "@sveltejs/kit";
export const load:PageServerLoad=async({locals:{supabase, getSession}, params})=>{
    const session=await getSession();
    if (!session){
        throw redirect(303, '/');
    }

    const{data:list} = await supabase.rpc("get_members_data_list", {_community_id:params.id});

    return {
        list
    };
}

export const actions:Actions={
    ascend_member: async ({request, locals:{getSession, supabase}, params})=>{
        const session = await getSession();
        if (!session){
            throw redirect(303, '/');
        }

        const formData = await request.formData();

        const member_id = formData.get('member_id') as string;

        if(member_id.length===0){
            console.log('tamaño')
            return fail(400, {
                error: 'Petición no válida.'
            })
        }

        const {error} = await supabase.rpc('ascend_role', {_member_id:member_id, _community_id:params.id})

        if (error){
            return fail(500, {
                error: 'No se pudo actualizar el rol del miembro.'
            })
        }

        return{
            message:'Rol actualizado con éxito'
        }
    },
    descend_member: async({request, params, locals:{supabase, getSession}})=>{
        const session = await getSession();
        if (!session){
            throw redirect(303, '/');
        }

        const formData = await request.formData();

        const member_id = formData.get('member_id') as string;

        if(member_id.length===0){
            return fail(400, {
                error: 'Petición no válida.'
            })
        }

        const {error, data} = await supabase.rpc('descend_role', {_member_id:member_id, _community_id:params.id}).limit(1).maybeSingle();

        if (error || !data){
            return fail(500, {
                error: 'No se pudo actualizar el rol del miembro.'
            })
        }

        return{
            message:'Rol actualizado con éxito',
            new_role: data.new_role
        }
    },

    remove_member: async({request, params, locals:{supabase, getSession}})=>{
        const session = await getSession();
        if (!session){
            throw redirect(303, '/');
        }

        const formData = await request.formData();

        const member_id = formData.get('member_id') as string;

        const {error} = await supabase.from('Memberships').delete().eq('member_id', member_id).eq('community_id', params.id);

        if (error){
            return fail(500, {
                error: 'No se pudo expulsar el miembro'
            })
        }

        return {
            message:'Miembro expulsado con éxito.'
        }
    }
}