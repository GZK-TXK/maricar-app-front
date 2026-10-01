import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from './api/auth.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const data = await authApi.me();
                setUser(data.data);
                setIsAuthenticated(true);
            } catch {
                // sin sesión
            } finally {
                setIsLoading(false);
            }
        };
        fetchMe();
    }, []);

    const login = async (email, password) => {
        const data = await authApi.login(email, password);
        setUser(data.data.user);
        setIsAuthenticated(true);
    };

    const setSession = (u) => {
        setUser(u);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch {
            // ignorar
        }
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);