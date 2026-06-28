import Swal from 'sweetalert2'

export const CardUser = ({ user, onEdit, onDelete }) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name + ' ' + (user.surname || ''))}&background=3b82f6&color=fff&size=64`

    return (
        <div className="card-horizontal">
            <img src={avatarUrl} alt={user.name} className="card-avatar" />
            <div className="card-content">
                <h3>{user.name} {user.surname}</h3>
                <p>Email: {user.email} | Rol: {user.role}</p>
                <p>Teléfono: {user.phone}</p>
                <div className="card-actions">
                    <button className="btn-accent" onClick={() => onEdit(user)}>Editar</button>
                    <button className="btn-danger" onClick={() => onDelete(user._id)}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
