import React from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router';

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = () => {
        login();
        navigate('/dashboard');
    }
    return (
        <>
            <div>
                <h1>Login</h1>
            </div>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}
