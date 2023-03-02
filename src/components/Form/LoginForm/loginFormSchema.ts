import * as yup from "yup";

export const loginFormSchema = yup.object({
    email: yup
        .string()
        .required("Email é obrigatório")
        .email("Email inválido"),
    password: yup
        .string()
        .required("Senha é obrigatória")
        .matches(/.{4,}/, "Deve conter ao menos 4 caracteres"),
});