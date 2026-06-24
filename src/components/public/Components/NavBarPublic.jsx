import React from 'react'
import { NavLink } from 'react-router'

export const NavBarPublic = () => {
    return (
        <>
            <nav className='NavBarPublic'>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/cars'>Coches</NavLink>
                        <NavLink to='/admin'>Admin Home </NavLink>
                        <NavLink to='/admin/cars'>Admin Coches </NavLink>
                        <NavLink to='/admin/cars/create'>Admin (temporal)</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

//<NavLink to='/login'>Login</NavLink>