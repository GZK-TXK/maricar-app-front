import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router'
import { useAuth } from '../../../AuthContext'

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
            const res = await fetch(`${import.meta.env.VITE_API_URLBASE}/auth/register`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()

            if (!data.ok) {
                throw new Error(data.msg || "No se pudo completar el registro")
            }

            setSession(data.data.user)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="form-container">
            <h3>Crear cuenta</h3>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required maxLength={80} />
                <input name="surname" placeholder="Apellidos" value={form.surname} onChange={handleChange} maxLength={80} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Contraseña (mín. 8, mayúscula, minúscula y número)" value={form.password} onChange={handleChange} required minLength={8} />
                <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
                <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} required maxLength={20} />
                <input name="direction" placeholder="Dirección" value={form.direction} onChange={handleChange} maxLength={200} />
                <br />
                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes cuenta? <NavLink to="/login">Iniciar sesión</NavLink></p>
        </div>
    )
}