import React from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router';

export const Login = () => {
  const login = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate(`/user/${url}`);
  };

  return (
    <>
      <main className="main-content">
        <h1>Indetificate MariCar</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Introducir Mari-mail"></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Introducir Mari-password"></input>
        </div>
        <div>
          <button onClick={() => handleLogin('login')}>
            Login
          </button>
        </div>
        <div>
        <Link to={`/register`}>¿No tienes una cuenta?Ven con Mari.</Link>
        </div>
      </main>
    </>
  );
};