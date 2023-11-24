import type {LayoutLoad} from "./$types";

export const load:LayoutLoad  = async({ params })=>{
    const userID = "121561";
    return {
        userID: userID,
        id: params.id,
        name: 'Raíz del destino',
        miembros: 1,
        bannerSrc: 'https://c4.wallpaperflare.com/wallpaper/867/119/831/arbol-naturaleza-roble-viejo-wallpaper-preview.jpg',
        description: 'Con la fuerza de nuestra voluntad abriremos camino a lo oculto.'
    }
}