import { InputHTMLAttributes, ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface iContextProvider {
    children: ReactNode;
};

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
    addProductToCart: (productId: number) => void;
    removeProductFromCart: (productId: number) => void;
    removeAllProductsFromCart: () => void;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    filteredProducts: iProduct[];
    currentSale: iProduct[];
    cartTotal: number;
};

export interface iUser {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        confirmPassword: string;
    };
};

export interface iFormRegisterValues {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
};

export type iFormLoginValues = Omit<iFormRegisterValues, 'name' | 'confirmPassword'>

export interface iInput {
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors?: FieldError;
};


export interface iProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    img: string;
    quantity?: number;
};

export interface iInputSearchValue { 
    search: string;
};

export interface iInputSearch extends InputHTMLAttributes<HTMLInputElement> {
    type: 'search';
    placeholder: string;
};