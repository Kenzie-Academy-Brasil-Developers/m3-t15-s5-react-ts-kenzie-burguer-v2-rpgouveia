import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { iAutoLoginResponse, iContextProvider, iFormLoginValues, iFormRegisterValues, iUser, iUserContext } from "../interfaces/@types";
import { api } from "../services/api";

export const UserContext = createContext({} as iUserContext);

function UserProvider({ children }: iContextProvider) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<iUser | null>(null);
    const [autoLoginUser, setAutoLoginUser] = useState<iAutoLoginResponse | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function autoLogin() {
            const token = localStorage.getItem('@TOKEN');
            const userId = localStorage.getItem('@USERID');
            if (token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    };
                    const response = await api.get<iAutoLoginResponse>(`/users/${userId}`, config);
                    setAutoLoginUser(response.data);
                    navigate('/shop');
                } catch (error) {
                    localStorage.removeItem('@TOKEN');
                    localStorage.removeItem('USERID');
                };
            } else {
                navigate('/')
            }
        };
        autoLogin();
    }, []);

    async function userRegister(formData: iFormRegisterValues) {
        try {
            setLoading(true)
            const response = await api.post<iUser>('/users', formData);
            localStorage.setItem('@TOKEN', response.data.accessToken);
            localStorage.setItem('@USERID', response.data.user.id);
            toast.success('Cadastro realizado com sucesso!')
            navigate('/shop');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data === 'Email already exists') {
                    toast.error('Email já existe')
                } else if (error.response?.data === 'Password is too short') {
                    toast.error('Senha é muito pequena')
                } else {
                    toast.error('Email e Senha são obrigatórios')
                }
            }
        } finally {
            setLoading(false);
        };
    };

    async function userLogin(formData: iFormLoginValues) {
        try {
            setLoading(true);
            const response = await api.post<iUser>('/login', formData);
            setUser(response.data);
            localStorage.setItem('@TOKEN', response.data.accessToken);
            localStorage.setItem('@USERID', response.data.user.id);
            toast.success('Login realizado com sucesso!')
            navigate('/shop');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data === 'Email and password are required') {
                    toast.error('Email e Senha são obrigatórios')
                } else if (error.response?.data === 'Incorrect password') {
                    toast.error('Senha incorreta')
                } else {
                    toast.error('Usuário não encontrado')
                }
            }
        } finally {
            setLoading(false);
        };
    };

    function userLogout() {
        setUser(null);
        localStorage.removeItem('@TOKEN');
        localStorage.removeItem('@USERID');
        navigate('/');
    };

    return (
        <UserContext.Provider value={{
            loading,
            setLoading,
            user,
            userRegister,
            userLogin,
            userLogout
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;