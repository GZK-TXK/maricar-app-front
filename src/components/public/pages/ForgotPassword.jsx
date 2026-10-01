import { useState } from 'react'
import { Link } from 'react-router'
import { authApi } from '../../../api/auth.js'

export const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setMessage("")
        setLoading(true)
        try {
            const data = await authApi.forgotPassword(email)
            setMessage(data.msg)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="main-content">
            <div className="auth-card">
                <h1>Recuperar contraseña</h1>
                {message && <p className="success-text">{message}</p>}
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit" className="btn-primary btn-block" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar enlace"}
                    </button>
                </form>
                <p className="auth-card__links"><Link to="/login">Volver al inicio de sesión</Link></p>
            </div>
        </main>
    )
}