import type {Actions, PageServerLoad} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import type {Database} from "$lib/database.types";
export const load:PageServerLoad = async() =>{

}

export const actions:Actions={
    create_post: async ({request, params, locals:{supabase, getSession}})=>{
        console.info('trying');

        const session = await getSession();
        if (!session){
            throw redirect(303, '/')
        }

        const formData = await request.formData();
        const files = formData.getAll('post_images') as File[];
        const body = formData.get('body') as string

        const post_id = crypto.randomUUID();
        const uploaded:string[]=[];

        async function deleteUploaded(){
            await supabase.storage.from('community_posts').remove(uploaded);
        }

        if (files.length>0){
            for(let i=0; i<files.length; i++) {
                if (files[i].size>0) {
                    const path = `${params.id}/${post_id}/${crypto.randomUUID()}.${files[i].name.split('.').pop()}`;
                    const {error:uploadErr} = await supabase.storage.from('community_posts').upload(path, files[i]);

                    if (uploadErr) {
                        await deleteUploaded();
                        console.info(uploadErr);
                        return fail(500, {
                            title:'Error del servidor',
                            message:'No se pudo subir los archivos. Inténtelo más tarde.',
                            color: 'red',
                        })
                    } else {
                        uploaded.push(path);
                    }
                }
            }
        }

        const insert:Database['public']['Tables']['Posts']['Insert']={id:post_id, body:body, authorID:session.user.id,communityID:params.id}
        if (uploaded.length>0){
            insert.imagesSRC=uploaded
        }
        const {error:updateError} = await supabase.from('Posts').insert(insert);

        if (updateError){
            console.info(updateError)
            await deleteUploaded();
            return fail(500, {
                title:'Error del servidor',
                message:'No se pudo completar la operación. Inténtelo más tarde.',
                color: 'red',
            })
        } /*else{
            throw redirect(303, '')
        }*/

        console.info('done');

        return{
            title:'Subida realizada con éxito',
            message:'',
            color:'green',
        }
    }
}