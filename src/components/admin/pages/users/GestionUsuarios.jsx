import { useState, useEffect } from 'react'
import { CardUser } from '../../components/user/CardUser'
import { UserForm } from '../../components/user/UserForm'
import { Pagination } from '../../components/Pagination'
import { usersApi } from '../../../../api/users.js'
import Swal from 'sweetalert2'

const PAGE_SIZE = 10

export const GestionUsuarios = () => {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    const fetchUsers = async () => {
        try {
            const data = await usersApi.list({ page, limit: PAGE_SIZE })
            setUsers(data.data)
            setPagination(data.pagination)
        } catch (err) {
            Swal.fire("Error", err.message, "error")
        }
    }

    useEffect(() => { fetchUsers() }, [page])

    const handleSave = async (form) => {
        const isEdit = !!editingUser
        try {
            if (isEdit) {
                await usersApi.update(editingUser._id, form)
            } else {
                await usersApi.create(form)
            }
            Swal.fire("Guardado", isEdit ? "Usuario actualizado" : "Usuario creado", "success")
            setShowForm(false)
            setEditingUser(null)
            fetchUsers()
        } catch (err) {
            Swal.fire("Error", err.message || "Error al guardar", "error")
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

        try {
            await usersApi.remove(id)
            Swal.fire("Eliminado", "Usuario eliminado", "success")
            fetchUsers()
        } catch (err) {
            Swal.fire("Error", err.message || "No se pudo eliminar", "error")
        }
    }

    return (
        <main className="main-content">
            <header className="page-head">
                <h1>Usuarios</h1>
                <p>Administra las cuentas de cliente</p>
            </header>

            <div className="page-actions">
                <button className="btn-primary" onClick={() => { setEditingUser(null); setShowForm(!showForm) }}>
                    {showForm ? "Cerrar" : "Crear usuario"}
                </button>
            </div>

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

            <Pagination pagination={pagination} onPageChange={setPage} />
        </main>
    )
}