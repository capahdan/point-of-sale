import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async ({ email, password }) => {
        const res = await api.post('login', {
            email: email,
            password: password
        });
        console.log(res.data.data)
        setCookies('token', res.data.data.user.token); // your token
        setCookies('name', res.data.data.user.email); // optional data

        navigate('/');
    };

    const logout = () => {
        ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/login');
    };

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};