import type {PageServerLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load:PageServerLoad = async({ parent, params }) =>{
    const data = await parent();
    if (!data){
        throw redirect(303, '/')
    }

    let user_id = data.session_id;
    let user_email = data.session_email;
    let user_name = data.session_name;
    let user_avatarUrl = data.session_avatarUrl;
    let user_biography = data.session_biography;
    let owner=true;


    if (user_id!== params.id) {
        owner=false;
        user_id = params.id;
        user_email = "other@email.com";
        user_name = "Another User";
        user_avatarUrl="https://thispersondoesnotexist.com/";
        user_biography=`Este es otro usuario. Tiende a cambiar de forma así que es posible no saber cuando es él y no otra persona. No sabemos más información pero sabemos que siempre te está mirando. Donde sea que vayas él o ella te perseguirá.`
    }

    return {
        user_id,
        user_name,
        user_email,
        user_avatarUrl,
        user_biography,
        owner,
        communities:[{
            name:'Raíz del destino',
            banner:'https://c4.wallpaperflare.com/wallpaper/867/119/831/arbol-naturaleza-roble-viejo-wallpaper-preview.jpg',
            id:'1',
            n_members:1,
            adminAvatarSrc:'https://thispersondoesnotexist.com'
        },{
            name:'Raíz del destino 2',
            banner:'https://c4.wallpaperflare.com/wallpaper/867/119/831/arbol-naturaleza-roble-viejo-wallpaper-preview.jpg',
            id:'1',
            n_members:1,
            adminAvatarSrc:'https://thispersondoesnotexist.com'
        },]
    }
}