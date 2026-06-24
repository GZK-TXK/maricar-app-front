import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <>
      <h1>Logear Usuario</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};