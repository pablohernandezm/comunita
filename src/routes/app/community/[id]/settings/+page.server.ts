
import type { Actions} from "./$types";
import {fail, redirect} from "@sveltejs/kit";
import type {Database} from "$lib/database.types";

export const actions:Actions={
    default:async({ request, params, locals:{supabase, getSession}})=>{
        const session = await getSession();

        if (!session){
            throw redirect(303, '/');
        }

        const formData = await request.formData()

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const banner = formData.get('banner') as File;

        type UpdateFormat = Database['public']['Tables']['Communities']['Update'];
        const toUpdate:UpdateFormat = {};
        interface Message {
            title:string
            description:string
            color:string
        }

        const errors:Message[]=[];

        if (name.length>0){
            toUpdate.name=name;
        }

        if (description.length>0){
            toUpdate.description=description;
        }

        if(banner.size>0){
            const uuid = crypto.randomUUID();

            const {data, error} = await supabase.storage.from('community_banners').upload(`${params.id}/${uuid}`, banner)
            if (data && !error){
                toUpdate.bannerSRC=data.path;
            } else if (error){
                console.error(error);
                errors.push({
                    title:'Error del servidor',
                    description:`No se pudo subir el banner.`,
                    color:'red'
                })
            }
        }

        const {error} = await supabase.from('Communities').update(toUpdate).eq('id', params.id);

        if (error){
            console.error(error);
            errors.push({
                title:'Error del servidor',
                description:`No se pudo actualizar la información de la comunidad`,
                color:'red',
            })
        }

        if (errors.length>0){
            return fail(500, {
                errors
            })
        }

        return{
            title:'Datos actualizados con éxito.',
            description:'',
            color:'green'
        }

    }
}