import { useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate, Link } from 'react-router'

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (ev) => {
        ev.preventDefault()
        setError("")
        try {
            await login(email, password)
            navigate("/dashboard")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <main className="main-content">
            <div className="auth-card">
                <h1>Iniciar sesión</h1>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} required />
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn-primary btn-block">Entrar</button>
                </form>
                <p className="auth-card__links">
                    <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                </p>
                <p className="auth-card__links">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </main>
    )
}