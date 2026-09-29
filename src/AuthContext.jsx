import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URLBASE;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch(`${API}/auth/me`, { credentials: "include" });
                const data = await res.json();
                if (data.ok) {
                    setUser(data.data);
                    setIsAuthenticated(true);
                }
            } catch {
                // sin sesión
            } finally {
                setIsLoading(false);
            }
        };
        fetchMe();
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.ok) {
            throw new Error(data.msg);
        }

        setUser(data.data.user);
        setIsAuthenticated(true);
    };

    const setSession = (u) => {
        setUser(u);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
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