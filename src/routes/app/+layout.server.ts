import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";


export const load: LayoutServerLoad = async ({ locals: {supabase, getSession}}) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: user } = await supabase.from('Profiles').select('*').eq('id', session.user.id).limit(1).single();
    if (!user){
        throw redirect(303, '/')
    }

    if (user.avatarSrc){
        user.avatarSrc= supabase.storage.from('profiles').getPublicUrl(user.avatarSrc).data.publicUrl;
    }

    if (user.coverSrc){
        user.coverSrc=supabase.storage.from('profiles').getPublicUrl(user.coverSrc).data.publicUrl;
    }

    return {
        profile: user
    };
}