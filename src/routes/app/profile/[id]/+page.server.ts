import type {PageServerLoad} from "./$types";
import {redirect} from "@sveltejs/kit";
import { error } from '@sveltejs/kit';
import type {Database} from "$lib/database.types";


export const load:PageServerLoad = async({ parent, params, locals: {supabase} }) =>{
    const data = await parent();

    if (!data || !data.session){
        throw redirect(303, '/')
    }

    let user_id:string='';
    let user_email:string|undefined|null=null;
    let user_name:string='';
    let user_avatarUrl:string='';
    let user_biography:string|null=null;
    let user_birthDate:string|null='';
    let owner:boolean=false;

    if (data.session.user.id=== params.id) {
        user_id = data.session.user.id;
        user_email = data.session.user.email;
        user_name = data.profile.name;
        user_avatarUrl = data.profile.avatarSrc? supabase.storage.from('Avatars').getPublicUrl(data.profile.avatarSrc).data.publicUrl:'';
        user_biography = data.profile.biography;
        user_birthDate = data.profile.birthdate;
        owner=true;
    } else {
        const { data:profileData } = await supabase.from('Profiles').select('*').eq('id', params.id).limit(1).single();
        const { data:userData } = await supabase.auth.admin.getUserById(params.id);

        if(profileData && userData){
            user_id = params.id;
            user_email = userData.user?.email;
            user_name = profileData.name;
            user_avatarUrl = profileData.avatarSrc? supabase.storage.from('Avatars').getPublicUrl(profileData.avatarSrc).data.publicUrl:'';
            user_biography = profileData.biography;
            user_birthDate = profileData.birthdate;
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

    let adminAvatarSrc = null;

    const {data:adminData} = await supabase.from('Memberships').select('memberID, Profiles(*)').eq('role', 'admin').limit(1).single();
    if (adminData && adminData.Profiles?.avatarSrc){
        adminAvatarSrc = supabase.storage.from('Avatars').getPublicUrl(adminData.Profiles.avatarSrc).data.publicUrl;
    }
    return {
        user_id,
        user_name,
        user_email,
        user_avatarUrl,
        user_biography,
        user_birthDate,
        adminAvatarSrc,
        owner,
        communities
    }
}