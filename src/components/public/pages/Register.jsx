import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../../../AuthContext'
import { authApi } from '../../../api/auth.js'

export const Register = () => {
    const [form, setForm] = useState({
        name: "", surname: "", email: "", password: "",
        birthday: "", phone: "", direction: ""
    })
    const [error, setError] = useState("")
    const { setSession } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const data = await authApi.register(form)
            setSession(data.data.user)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <main className="main-content">
            <div className="auth-card">
                <h1>Crear cuenta</h1>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} required maxLength={80} />
                    <label htmlFor="surname">Apellidos</label>
                    <input id="surname" name="surname" value={form.surname} onChange={handleChange} maxLength={80} />
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" name="password" type="password" placeholder="Mín. 8, mayúscula, minúscula y número" value={form.password} onChange={handleChange} required minLength={8} />
                    <label htmlFor="birthday">Fecha de nacimiento</label>
                    <input id="birthday" name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
                    <label htmlFor="phone">Teléfono</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required maxLength={20} />
                    <label htmlFor="direction">Dirección</label>
                    <input id="direction" name="direction" value={form.direction} onChange={handleChange} maxLength={200} />
                    <button type="submit" className="btn-primary btn-block">Registrarse</button>
                </form>
                <p className="auth-card__links">
                    ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
                </p>
            </div>
        </main>
    )
}