import type {LayoutLoad} from "./$types";
import {error, redirect} from "@sveltejs/kit";

export const load:LayoutLoad  = async({ params, parent })=>{
    const {session, supabase} = await parent();
    if (!session){
        throw redirect(303, '/');
    }

    const {data, error:err} = await supabase.from('Memberships')
        .select('user_role, Communities(*)')
        .eq('community_id', params.id).eq('member_id', session.user.id)
        .limit(1).single();
    if (err || !data || !data.Communities){
        throw error(404, 'Esta comunidad no existe');
    }

    const role=data.user_role;

    return {
        role,
        communityData:data.Communities
    }
}