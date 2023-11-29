import {type Output, email, minLength, object, string, toTrimmed} from "valibot";

export const loginSchema = object({
    email: string('Tu correo electrónico debe ser un texto.',[
        email('El formato del correo electrónico no es válido.'),
        minLength(1, "Por favor ingresa tu correo electrónico."),
        toTrimmed()
    ]),
    password: string('Tu contraseña debe ser un texto.',[
        minLength(8, 'Tu contraseña debe tener al menos 8 caracteres.')
    ]),
})

export const signUpSchema = object({
    name: string('El nombre debe ser un texto.', [
        minLength(1, "Por favor ingresa tu nombre."),
        toTrimmed(),
    ]),
    email: string('Tu correo electrónico debe ser un texto.',[
        email('El formato del correo electrónico no es válido.'),
        minLength(1, "Por favor ingresa tu correo electrónico."),
        toTrimmed()
    ]),
    password: string('Tu contraseña debe ser un texto.',[
        minLength(8, 'Tu contraseña debe tener al menos 8 caracteres.')
    ]),
})

export type loginData = Output<typeof loginSchema>