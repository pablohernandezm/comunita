import {redirect} from "@sveltejs/kit";
import type {PageLoad} from "./$types";
import type {Database} from "$lib/database.types";

export const load:PageLoad= async({ parent } )=>{
    const {supabase, session} = await parent();

    if (!session){
        throw redirect(303, '/');
    }

    let communities:Database['public']['Functions']['user_communities']['Returns'] | undefined=undefined;
    const {data} = await supabase.rpc('user_communities')

    console.info(data);
    if (data){
        communities=data;
    }

    if (data){
        return {
            communities
        };
    }
}