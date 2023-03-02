import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { iContextProvider, iFormLoginValues, iFormRegisterValues, iUser, iUserContext } from "../interfaces/@types";
import { api } from "../services/api";

export const UserContext = createContext({} as iUserContext);

function UserProvider({ children }: iContextProvider) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<iUser | null>(null);
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
                    const response = await api.get<iUser>(`/users/${userId}`, config);
                    setUser(response.data);
                    navigate('/shop');
                } catch (error) {
                    localStorage.removeItem('@TOKEN');
                    localStorage.removeItem('USERID');
                };
            };
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
                } else {
                    // eslint-disable-next-line no-console
                    console.error(error);
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
                if (error.response?.data === 'Incorrect password') {
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
        toast.success('Logout realizado com sucesso!')
    };

    return (
        <UserContext.Provider value={{
            loading,
            setLoading,
            user,
            userRegister,
            userLogin,
            userLogout,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;