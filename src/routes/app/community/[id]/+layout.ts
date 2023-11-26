import type {LayoutLoad} from "./$types";

export const load:LayoutLoad  = async({ params })=>{
    const userID = "121561";
    const n_members=1;
    const n_admins=1;
    const n_mods=1;
    const n_regulars=n_members - n_admins - n_mods;
    const created_at = new Date("2001-07-19");
    return {
        userID: userID,
        id: params.id,
        community_name: 'Raíz del destino',
        n_members: n_members,
        n_admins: n_admins,
        n_mods:n_mods,
        n_regular_members:n_regulars,
        creation_date: created_at,
        bannerSrc: 'https://c4.wallpaperflare.com/wallpaper/867/119/831/arbol-naturaleza-roble-viejo-wallpaper-preview.jpg',
        description: 'Con la fuerza de nuestra voluntad abriremos camino a lo oculto.'
    }
}