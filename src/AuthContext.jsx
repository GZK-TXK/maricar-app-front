import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const payload = JSON.parse(atob(storedToken.split(".")[1]));
                setUser(payload);
                setToken(storedToken);
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_URLBASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.ok) {
            throw new Error(data.msg);
        }

        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);