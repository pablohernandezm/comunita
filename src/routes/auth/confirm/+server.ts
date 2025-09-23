import {redirect} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET:RequestHandler = async (event) => {
    const {
        url,
        locals: { supabase }
    } = event;
    const token_hash = url.searchParams.get('token_hash') as string;
    const typeSrc = url.searchParams.get('type') as string;
    const next = url.searchParams.get('next') ?? '/';

    if(typeSrc==='signup' || typeSrc==='invite' || typeSrc==='magiclink' || typeSrc==='recovery' || typeSrc==='email_change' || typeSrc=== 'email'){
        const type=typeSrc;

        if (token_hash && type) {
            const { error } = await supabase.auth.verifyOtp({ token_hash, type });
            if (!error) {
                /*throw redirect(303, `/${next.slice(1)}`);*/
                throw redirect(303, `/app`);
            }
        }
    }


    // return the user to an error page with some instructions
    throw redirect(303, '/auth/auth-code-error');
};