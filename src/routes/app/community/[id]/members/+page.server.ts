import type {PageServerLoad} from './$types'
import {redirect} from "@sveltejs/kit";
export const load:PageServerLoad=async({locals:{supabase, getSession}, params})=>{
    const session=await getSession();
    if (!session){
        throw redirect(303, '/');
    }

    const{data:list} = await supabase.rpc("get_members_data_list", {_community_id:params.id});
    console.info(list)

    return {
        list
    };
}