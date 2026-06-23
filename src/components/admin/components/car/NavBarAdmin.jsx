import React from 'react'
import { NavLink } from 'react-router'

export const NavBarAdmin = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/admin/cars'>Coches</NavLink>
          <NavLink to='/admin'>HomeAdmin</NavLink>
          <NavLink to='/admin/users'>Usuarios</NavLink>          
        </li>
      </ul>
          </nav>
  )
}
