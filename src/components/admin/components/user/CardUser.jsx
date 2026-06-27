import Swal from 'sweetalert2'

export const CardUser = ({ user, onEdit, onDelete }) => {
    return (
        <div>
            <p><strong>{user.name} {user.surname}</strong></p>
            <p>Email: {user.email} | Rol: {user.role}</p>
            <p>Teléfono: {user.phone}</p>
            <button onClick={() => onEdit(user)}>Editar</button>
            <button onClick={() => onDelete(user._id)}>Eliminar</button>
        </div>
    )
}