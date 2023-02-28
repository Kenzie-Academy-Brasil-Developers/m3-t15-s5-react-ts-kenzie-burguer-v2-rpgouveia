import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
                    const response = await api.get(`/users/${userId}`, config);
                    setUser(response.data);
                    navigate('/shop');
                } catch (error) {
                    console.log(error);
                    localStorage.removeItem('@TOKEN');
                    localStorage.removeItem('USERID');
                };
            } else {
                // Proteção de rota, trocar por outlet
                navigate('/')
            }
        };
        autoLogin();
    }, []);

    async function userRegister(formData: iFormRegisterValues) {
        try {
            setLoading(true)
            const response = await api.post('/users', formData);
            setUser(response.data.user);
            localStorage.setItem('@TOKEN', response.data.accessToken);
            localStorage.setItem('@USERID', response.data.user.id);
            // Futuro Toast de Sucesso Aqui!
            console.log('Cadastro realizado com sucesso!');
            navigate('/shop');
        } catch (error) {
            console.log(error);
            // Futuro Toast de Falha Aqui!
        } finally {
            setLoading(false);
        };
    };

    async function userLogin(formData: iFormLoginValues) {
        try {
            setLoading(true);
            const response = await api.post('/login', formData);
            setUser(response.data.user);
            localStorage.setItem('@TOKEN', response.data.accessToken);
            localStorage.setItem('@USERID', response.data.user.id);
            // Futuro Toast de Sucesso Aqui!
            console.log('Login realizado com sucesso!');
            navigate('/shop');
        } catch (error) {
            console.log(error);
            // Futuro Toast de Falha Aqui!
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