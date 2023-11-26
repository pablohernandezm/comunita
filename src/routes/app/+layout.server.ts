import type {LayoutServerLoad} from "./$types";

export const load:LayoutServerLoad = async() => {
    return {
        session_id: "1",
        session_avatarUrl: 'https://i0.wp.com/lacarteleramx.com/wp-content/uploads/2022/11/33982df6-avatar-la-leyenda-aang-serie-netflix-fecha-estreno-lacarteleramx.jpg?resize=750%2C450&ssl=1',
        session_name: 'Pablo Hernández',
        session_email: 'phernandezm07@gmail.com',
        session_biography: `Hola, mi nombre es pablo hernández. Vivo en Cartagena/Colombia y estudio Ingeniería de Sistemas en la Universidad de Cartagena.`,
        session_birthday: (new Date('2001-07-19')).toLocaleDateString(),
    }
}