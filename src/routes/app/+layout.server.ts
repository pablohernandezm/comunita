import type {LayoutServerLoad} from "./$types";

export const load:LayoutServerLoad = async() => {
    return {
        id: "1",
        avatarUrl: 'https://i0.wp.com/lacarteleramx.com/wp-content/uploads/2022/11/33982df6-avatar-la-leyenda-aang-serie-netflix-fecha-estreno-lacarteleramx.jpg?resize=750%2C450&ssl=1',
        name: 'Pablo Hernández',
        email: 'phernandezm07@gmail.com',
        biography: `Hola, mi nombre es pablo hernández. Vivo en Cartagena/Colombia y estudio Ingeniería de Sistemas en la Universidad de Cartagena.`
    }
}