import type {PageServerLoad} from './$types'
import {redirect} from "@sveltejs/kit";

export const load:PageServerLoad=async({ params, locals:{supabase, getSession}})=>{
    const session= await getSession();

    if (!session){
        throw redirect(303,'/');
    }

    const {data, error} = await supabase.rpc('access_code', {_access_code:params.access_code})
    if (error){
        for (let i = 0; i < 20; i++) {
            console.log('\n')
        }
        console.error(error)
        throw redirect(303, '/');

    } else if (data){
        throw redirect(303,`/app/community/${data}`)
    }
}
