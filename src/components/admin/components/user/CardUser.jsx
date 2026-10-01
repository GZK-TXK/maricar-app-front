export const CardUser = ({ user, onEdit, onDelete }) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name + ' ' + (user.surname || ''))}&background=16a34a&color=fff&size=64`

    return (
        <article className="card-horizontal">
            <img src={avatarUrl} alt={user.name} className="card-avatar" />
            <div className="card-content">
                <h3>{user.name} {user.surname}</h3>
                <p className="hint">{user.email}</p>
                <span className="badge is-role">{user.role}</span>
                <p className="hint">Teléfono: {user.phone}</p>
                <div className="card-actions">
                    <button className="btn-secondary btn-sm" onClick={() => onEdit(user)}>Editar</button>
                    <button className="btn-danger btn-sm" onClick={() => onDelete(user._id)}>Eliminar</button>
                </div>
            </div>
        </article>
    )
}