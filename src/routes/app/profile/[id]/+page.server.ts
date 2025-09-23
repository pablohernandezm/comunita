import type {Actions, PageServerLoad} from "./$types";
import {fail, redirect} from "@sveltejs/kit";
import { error } from '@sveltejs/kit';
import type {Database} from "$lib/database.types";
import {uploadFile} from "$lib/supabase/buckets";

export const load:PageServerLoad = async({ parent, params, locals: {supabase} }) =>{
    const data = await parent();

    if (!data || !data.session){
        throw redirect(303, '/')
    }

    let user_id:string='';
    let user_email:string|undefined|null=null;
    let user_name:string='';
    let user_avatarUrl:string|null=null;
    let user_biography:string|null=null;
    let user_birthDate:string|null=null;
    let user_coverUrl:string|null=null;
    let owner:boolean=false;

    if (data.session.user.id=== params.id) {
        user_id = data.session.user.id;
        user_email = data.session.user.email;
        user_name = data.profile.name;
        user_avatarUrl = data.profile.avatarSrc;
        user_biography = data.profile.biography;
        user_birthDate = data.profile.birthdate;
        user_coverUrl = data.profile.coverSrc
        owner=true;
    } else {
        const { data:profileData } = await supabase.from('Profiles').select('*').eq('id', params.id).limit(1).single();
        const { data:userData } = await supabase.auth.admin.getUserById(params.id);

        if(profileData && userData){
            user_id = params.id;
            user_email = userData.user?.email;
            user_name = profileData.name;
            user_avatarUrl = profileData.avatarSrc? supabase.storage.from('public/profiles').getPublicUrl(profileData.avatarSrc).data.publicUrl:'';
            user_biography = profileData.biography;
            user_birthDate = profileData.birthdate;
            user_coverUrl = profileData.coverSrc? supabase.storage.from('public/profiles').getPublicUrl(profileData.coverSrc).data.publicUrl:'';
        } else {
            throw error(404, {
                message: 'Usuario no encontrado'
            })
        }
    }

    type community = Database['public']['Functions']['shared_communities']['Returns'] | null;
    let communities:community = null;

    const {data:communityData} = await supabase.rpc('shared_communities', {member1_id: data.session.user.id, member2_id: params.id});
    if (communityData){
        communities=communityData;
    }
    
    return {
        user_id,
        user_name,
        user_email,
        user_avatarUrl,
        user_biography,
        user_birthDate,
        user_coverUrl,
        owner,
        communities,
    }
}

export const actions:Actions = {
    default: async({ request, locals:{supabase, getSession} }) => {
        const session = await getSession();
        if (!session){
            throw redirect(303, '/');
        }
        const postData = await request.formData();

        const name = postData.get('name') as string;
        const biography = postData.get('biography') as string;
        const birthdate = postData.get('birthday') as string;
        const avatar = postData.get('avatar') as File;
        const cover = postData.get('cover') as File;

        const bucket = 'profiles';


        const update:Database['public']['Tables']['Profiles']['Update']={};
        const errors:string[]=[];

        if (avatar.size>0){
            const avatarSrc = `${session.user.id}/avatar_${crypto.randomUUID()}.${avatar.name.split('.').pop()}`
            const avatarUpdated = await uploadFile(bucket, avatarSrc, avatar, supabase)

            if (avatarUpdated){
                update.avatarSrc=avatarSrc;
            } else {
                errors.push('No se pudo subir la imagen de avatar. Inténtelo de nuevo en unos minutos.')
            }
        }

        if (cover.size>0){
            const coverSrc = `${session.user.id}/cover_${crypto.randomUUID()}.${cover.name.split('.').pop()}`;
            const coverUpdated =  await uploadFile(bucket, coverSrc, cover, supabase)
            if (coverUpdated){
                update.coverSrc=coverSrc;
            } else {
                errors.push('No se pudo subir la imagen de portada. Inténtelo de nuevo en unos minutos.')
            }
        }

        if (name.length>3){
            update.name=name as string;
        }

        if (biography.length>0) {
            update.biography = biography as string;
        }

        if (birthdate.length>0) {
            update.birthdate = birthdate as string;
        }

        if (Object.keys(update).length>0){
            const {error:updateError} = await supabase.from('Profiles').update(update).eq('id',session.user.id)

            if (updateError){
                console.error(updateError);

                errors.push(`
                No se pudo actualizar los datos básicos de perfil. 
                Inténtelo de nuevo más tarde.`)
            }
        }

        if (errors.length>0){
            return fail(500, {
                errors
            });
        }

        return{
            message: 'Cambios realizados con éxito'
        }
    }
}