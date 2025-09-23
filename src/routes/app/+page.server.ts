import type {Actions} from "./$types";
import {fail, redirect} from "@sveltejs/kit";
import type {Database} from "$lib/database.types";
import {uploadFile, deleteFile} from "$lib/supabase/buckets";

export const actions:Actions={
    create: async ({ request, locals:{supabase, getSession}})=>{
        const session = await getSession();
        if (!session){
            throw redirect(303, '/');
        }

        const formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const banner = formData.get('banner') as File;

        const toUpload:Database['public']['Tables']['Communities']['Insert']={
            id: crypto.randomUUID(),
            name,
            description
        };

        const {error:basicInfoError} = await supabase.from('Communities').insert(toUpload);

        if (basicInfoError){
            console.error(basicInfoError)
            return fail(500, {
                message: 'No se pudo crear la comunidad. Intenta de nuevo más tarde.'
            })

        } else if (banner.size>0){
            const bannerPath=`${toUpload.id}/${crypto.randomUUID()}.${File.name.split('.').pop()}`;
            const bannerUploaded = await uploadFile(
                'community_banners',
                bannerPath,
                banner,
                supabase
            )

            if (bannerUploaded && toUpload.id){
                const {error:bannerError} = await supabase.from('Communities').update({bannerSRC: bannerPath}).eq('id', toUpload.id)

                if (bannerError){
                    await deleteFile(
                        'community_banners',
                        [bannerPath],
                        supabase
                    )

                    return fail(500, {
                        message: `No se pudo subir tu banner. Inténtalo de nuevo desde la configuración de la comunidad`
                    })
                }
            }
        }

        return {
            message: 'Comunidad creada con éxito.'
        }
    }
}