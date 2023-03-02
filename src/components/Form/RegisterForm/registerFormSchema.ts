import * as yup from "yup";

export const registerFormSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
        .string()
        .required("Email é obrigatório")
        .email("Email inválido"),
    password: yup
        .string()
        .required("Senha é obrigatória")
        .matches(/.{4,}/, "Deve conter ao menos 4 caracteres"),
    confirmPassword: yup
        .string()
        .required("Confirmação de senha é obrigatório")
        .oneOf(
            [yup.ref("password")],
            "A confirmação de senha deve ser igual a senha"
        ),
});