
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Database } from "$lib/database.types";

export const actions: Actions = {
    settings: async ({ request, params, locals: { supabase, getSession } }) => {
        const session = await getSession();

        if (!session) {
            throw redirect(303, '/');
        }

        const formData = await request.formData()

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const banner = formData.get('banner') as File;

        type UpdateFormat = Database['public']['Tables']['Communities']['Update'];
        const toUpdate: UpdateFormat = {};
        interface Message {
            title: string
            description: string
            color: string
        }

        const errors: Message[] = [];

        if (name.length > 0) {
            toUpdate.name = name;
        }

        if (description.length > 0) {
            toUpdate.description = description;
        }

        if (banner.size > 0) {
            const uuid = crypto.randomUUID();

            const { data, error } = await supabase.storage.from('community_banners').upload(`${params.id}/${uuid}.${banner.name.split('.').pop()}`, banner)
            if (error) {
                console.error(error);
                errors.push({
                    title: 'Error del servidor',
                    description: `No se pudo subir el banner.`,
                    color: 'red'
                })
            }
            else {
                toUpdate.bannerSRC = data.path;
            }
        }

        const { error } = await supabase.from('Communities').update(toUpdate).eq('id', params.id);

        if (error) {
            console.error(error);
            errors.push({
                title: 'Error del servidor',
                description: `No se pudo actualizar la información de la comunidad`,
                color: 'red',
            })
        }

        if (errors.length > 0) {
            return fail(500, {
                errors
            })
        }

        return {
            title: 'Datos actualizados con éxito.',
            description: '',
            color: 'green'
        }

    },

    create_link: async ({ params, url, locals: { supabase, getSession } }) => {
        const session = await getSession();

        if (!session) {
            throw redirect(303, '/');
        }

        let err: boolean = false;
        const { data: prev, error: prevErr } = await supabase.from('community_links').select('*').eq("community_id", params.id).limit(1).maybeSingle();
        const newLink = crypto.randomUUID();

        if (prevErr) {
            console.error(prevErr)
            err = true;

        } else if (!prev) {
            const { error } = await supabase.from('community_links').insert({ community_id: params.id, access_code: newLink });

            if (error) {
                console.error(error)
                err = true;
            }
        } else {
            const { error } = await supabase.from('community_links').update({ access_code: newLink }).eq("id", prev.id);

            if (error) {
                console.error(error)
                err = true;
            }
        }

        if (err) {
            console.error('error')
            return fail(500, {
                link_error: {
                    title: 'No se pudo actualizar el enlace.',
                    description: '',
                    color: 'red'
                }
            })
        }
        return {
            link: `${url.origin}/app/community/link/${newLink}`
        }
    }
}