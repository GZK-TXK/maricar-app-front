import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router'
import { useAuth } from '../../../AuthContext'

export const Register = () => {
    const [form, setForm] = useState({
        name: "", surname: "", email: "", password: "",
        birthday: "", phone: "", direction: ""
    })
    const [error, setError] = useState("")
    const { login, setAuthFromToken } = useAuth()
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, phone: Number(form.phone) })
            })
            const data = await res.json()

            if (!data.ok) {
                throw new Error(data.msg)
            }

            setAuthFromToken(data.data.token)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: 16, margin: "10px 0" }}>
            <h3>Crear cuenta</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <input name="surname" placeholder="Apellidos" value={form.surname} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
                <input name="phone" type="number" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
                <input name="direction" placeholder="Dirección" value={form.direction} onChange={handleChange} />
                <br />
                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes cuenta? <NavLink to="/login">Iniciar sesión</NavLink></p>
        </div>
    )
}