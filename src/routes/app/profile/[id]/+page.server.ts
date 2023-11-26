import type {PageServerLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load:PageServerLoad = async({ parent, params }) =>{
    const data = await parent();
    if (!data){
        throw redirect(303, '/')
    }

    let id = data.id;
    let email = data.email;
    let name = data.name;
    let avatarUrl = data.avatarUrl;
    let biography = data.biography;

    if (id!== params.id) {
        id = params.id;
        email = "other@email.com";
        name = "Another User";
        avatarUrl="https://thispersondoesnotexist.com/";
        biography=`Este es otro usuario. Tiende a cambiar de forma así que es posible no saber cuando es él y no otra persona. No sabemos más información pero sabemos que siempre te está mirando. Donde sea que vayas él o ella te perseguirá.`
    }

    return {
        id,
        name,
        email,
        avatarUrl,
        biography,
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