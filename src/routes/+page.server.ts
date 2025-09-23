import type {Actions} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import {loginSchema, signUpSchema} from "$lib/valibot";
import {parse, ValiError} from "valibot";
import type {PageServerLoad} from "./$types";

export const load:PageServerLoad=async(event)=>{
    const session = await event.locals.getSession();

    if (session){
        throw redirect(303, '/app');
    }
}
export const actions:Actions = {
    login: async({ request, locals:{supabase}}) => {
        const loginFields = await request.formData();

        let email = loginFields.get('email') as string;
        let password = loginFields.get('password') as string;

        try{
            const data = parse(loginSchema, {email, password});
            email = data.email;
            password= data.password;
        } catch(error:unknown | ValiError) {
            if (error instanceof ValiError){
                return fail(400, {
                    formatError:{
                        title: 'Error de formato',
                        description: error.message
                    }
                })
            }
        }

        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        })


        if (error){
            console.error(error);
            return fail(error.status ?? 400, {
                signInError:{
                    title: error.name,
                    description: error.message,
                }
            })
        }

        if (data.session){
            throw redirect(303, '/app');
        }

    },
    register: async({ request, locals:{supabase} })=>{
        const signUpFields = await request.formData();

        let name=signUpFields.get('name') as string;
        let email=signUpFields.get('email') as string;
        let password=signUpFields.get('password') as string;

        try{
            const data = parse(signUpSchema, {name, email, password});
            email = data.email;
            password= data.password;
            name=data.name;
        } catch(error:unknown | ValiError) {
            if (error instanceof ValiError){
                return fail(400, {
                    formatError:{
                        title: 'Error de formato',
                        description: error.message
                    }
                })
            }
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    user_name: name
                }
            }
        })

        if (error && error.status){
            console.error(error);
            return fail(error.status, {
                signUpError:{
                    title: `${error.name}(${error.status})`,
                    description:error.message,
                }
            })
        }

        return {
            message:{
                title: `Su perfil se ha creado con éxito`,
                description: 'Para acceder confirme su correo electrónico (2 horas antes de expirar)'
            }
        }
    }
}
