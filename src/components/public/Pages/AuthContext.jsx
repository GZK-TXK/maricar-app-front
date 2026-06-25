import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContect.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContect.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);