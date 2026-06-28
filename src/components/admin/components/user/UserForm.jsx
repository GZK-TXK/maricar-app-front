import { useState, useEffect } from 'react'

export const UserForm = ({ user, onSave, onCancel }) => {
    const [form, setForm] = useState({
        name: "", surname: "", email: "", password: "",
        birthday: "", phone: "", direction: "", role: "user"
    })

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                surname: user.surname || "",
                email: user.email || "",
                password: "",
                birthday: user.birthday ? user.birthday.split("T")[0] : "",
                phone: user.phone || "",
                direction: user.direction || "",
                role: user.role || "user",
            })
        }
    }, [user])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = { ...form }
        if (!payload.password) delete payload.password
        onSave(payload)
    }

    return (
        <div className="form-container">
            <h3>{user ? "Editar usuario" : "Crear usuario"}</h3>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <input name="surname" placeholder="Apellidos" value={form.surname} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                {!user && <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />}
                {user && <input name="password" type="password" placeholder="Nueva contraseña (dejar vacío si no cambia)" value={form.password} onChange={handleChange} />}
                <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
                <input name="phone" type="number" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
                <input name="direction" placeholder="Dirección" value={form.direction} onChange={handleChange} />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                </select>
                <br />
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    )
}