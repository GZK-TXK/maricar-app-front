import React from 'react'
import { NavLink } from 'react-router'

export const NavBarPublic = () => {
    return (
        <>
            <nav className='NavBarPublic'>

                {/*PUBLI*/}
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/cars'>Coches</NavLink>
                        <NavLink to='/Login'>Login</NavLink>
                    </li>
                </ul>

                {/*ADMIN*/}
                <ul>
                    <li>
                        <NavLink to='/admin'>HomeAdmin</NavLink>
                        <NavLink to='/admin/cars'>Coches</NavLink>
                        <NavLink to='/admin/users'>Usuarios</NavLink>
                    </li>
                </ul>

                {/*USER*/}
                <ul>
                    <li>
                        <NavLink to='/user/'>Mi perfil</NavLink>      
                        <NavLink to='/cars/'>Coches</NavLink>                
                        <NavLink to='/${user}/reservation'>Mis Reservas</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

//<NavLink to='/login'>Login</NavLink>