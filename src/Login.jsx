import { useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate, Link } from 'react-router';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (ev) => {
        ev.preventDefault();
        setError("");
        try{
            await login(email, password);
            navigate("/dashboard");
        }catch(error){
            setError(error.message)
        }
    }

    return (
        <>
            <h1>Iniciar sesión</h1>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </>
    )
}
