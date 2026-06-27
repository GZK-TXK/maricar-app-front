import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router'

export const Dashboard = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const avatarUrl = user?.name
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6b7280&color=fff&size=128`
        : ""

    return (
        <main className="main-content">
            {user && (
                <>
                    <img src={avatarUrl} alt={user.name} style={{ borderRadius: "50%", width: 128, height: 128 }} />
                    <h1>Panel de Usuario</h1>
                    <p>Bienvenido, {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Rol: {user.role}</p>
                </>
            )}
            <button onClick={handleLogout}>Cerrar sesión</button>
        </main>
    )
}