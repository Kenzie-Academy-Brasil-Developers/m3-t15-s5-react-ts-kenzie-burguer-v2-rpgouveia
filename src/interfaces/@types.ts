import { ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

// Interface do Provider
export interface iContextProvider {
    children: ReactNode;
};

// Interface dos elementos EXPORTADOS do Contexto
export interface iUserContext {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    user: iUser | null;
    userRegister: (formData: iFormRegisterValues) => Promise<void>;
    userLogin: (formData: iFormLoginValues) => Promise<void>;
    userLogout: () => void;
};

export interface iCartContext {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: () => void;
    closeModal: () => void;
    products: iProduct[];
};

// Interface do usuário
export interface iUser {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

// Interface do Formulário de Registro
export interface iFormRegisterValues {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
};

// Interface do Formulário de Login
export type iFormLoginValues = Omit<iFormRegisterValues, 'name' | 'confirmPassword'>

// Interface do Input
export interface iInput {
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors?: FieldError;
};

// Interface do Produto
export interface iProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    img: string;
};

// Interface do Cartão do Produto para Lista
export interface iProductCard {
    product: {
        id?: number;
        name: string;
        category: string;
        price: number;
        img: string;
    };
};