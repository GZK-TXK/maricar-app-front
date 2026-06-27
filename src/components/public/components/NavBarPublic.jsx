import { NavLink } from 'react-router'
import { useAuth } from '../../../AuthContext'

export const NavBarPublic = () => {
    const { user, isAuthenticated, logout } = useAuth()

    return (
        <nav className='NavBarPublic'>
            {/* SECCIÓN PÚBLICA — siempre visible */}
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/cars'>Coches</NavLink>
                    {!isAuthenticated && <NavLink to='/login'>Login</NavLink>}
                    {!isAuthenticated && <NavLink to='/register'>Registro</NavLink>}
                </li>
            </ul>

            {/* SECCIÓN ADMIN — solo si role === "admin" */}
            {isAuthenticated && user?.role === "admin" && (
                <ul>
                    <li>
                        <NavLink to='/admin'>HomeAdmin</NavLink>
                        <NavLink to='/admin/cars'>Coches</NavLink>
                        <NavLink to='/admin/users'>Usuarios</NavLink>
                    </li>
                </ul>
            )}

            {/* SECCIÓN USER — solo si está logueado */}
            {isAuthenticated && (
                <ul>
                    <li>
                        <NavLink to='/dashboard'>Mi perfil</NavLink>
                        <NavLink to='/cars/'>Coches</NavLink>
                        <NavLink to={`/${user?.id}/reservation`}>Mis Reservas</NavLink>
                        <button onClick={logout}>Cerrar sesión</button>
                    </li>
                </ul>
            )}
        </nav>
    )
}