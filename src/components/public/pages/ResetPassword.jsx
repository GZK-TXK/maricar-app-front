import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router'
import { authApi } from '../../../api/auth.js'

export const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (password !== confirm) {
            setError("Las contraseñas no coinciden")
            return
        }
        setLoading(true)
        try {
            await authApi.resetPassword(token, password)
            navigate("/login")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!token) {
        return (
            <main className="main-content">
                <div className="auth-card">
                    <h1>Enlace inválido</h1>
                    <p className="hint">El enlace de recuperación no es válido o ha caducado.</p>
                    <Link to="/forgot-password">Solicitar uno nuevo</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="main-content">
            <div className="auth-card">
                <h1>Nueva contraseña</h1>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Nueva contraseña</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    <label htmlFor="confirm">Repite la contraseña</label>
                    <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} />
                    <button type="submit" className="btn-primary btn-block" disabled={loading}>
                        {loading ? "Guardando..." : "Cambiar contraseña"}
                    </button>
                </form>
            </div>
        </main>
    )
}