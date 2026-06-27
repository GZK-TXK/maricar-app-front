import { useState, useEffect } from 'react'
import { CardUser } from '../../components/user/CardUser'
import { UserForm } from '../../components/user/UserForm'
import Swal from 'sweetalert2'

export const GestionUsuarios = () => {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const API = import.meta.env.VITE_API_URLBASE

    const fetchUsers = async () => {
        const res = await fetch(`${API}/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const data = await res.json()
        if (data.ok) setUsers(data.data)
    }

    useEffect(() => { fetchUsers() }, [])

    const handleSave = async (form) => {
        const isEdit = !!editingUser
        const url = isEdit ? `${API}/users/${editingUser._id}` : `${API}/users`
        const method = isEdit ? "PUT" : "POST"

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()

        if (data.ok) {
            Swal.fire("Guardado", isEdit ? "Usuario actualizado" : "Usuario creado", "success")
            setShowForm(false)
            setEditingUser(null)
            fetchUsers()
        } else {
            Swal.fire("Error", data.msg || "Error al guardar", "error")
        }
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        })
        if (!result.isConfirmed) return

        const res = await fetch(`${API}/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const data = await res.json()
        if (data.ok) {
            Swal.fire("Eliminado", "Usuario eliminado", "success")
            fetchUsers()
        } else {
            Swal.fire("Error", "No se pudo eliminar", "error")
        }
    }

    return (
        <main className="main-content">
            <h1>Gestión de Usuarios</h1>
            <button onClick={() => { setEditingUser(null); setShowForm(!showForm) }}>
                {showForm ? "Cerrar" : "Crear usuario"}
            </button>

            {showForm && (
                <UserForm user={editingUser} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingUser(null) }} />
            )}

            <div>
                {users.map(u => (
                    <CardUser
                        key={u._id}
                        user={u}
                        onEdit={(user) => { setEditingUser(user); setShowForm(true) }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </main>
    )
}