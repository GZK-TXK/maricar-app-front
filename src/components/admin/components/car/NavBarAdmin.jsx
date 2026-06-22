import React from 'react'
import { NavLink } from 'react-router'

export const NavBarAdmin = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/admincars'>Coches</NavLink>
          <NavLink to='/'>HomeAdmin</NavLink>
          <NavLink to='/users'>Usuarios</NavLink>          
        </li>
      </ul>
          </nav>
  )
}
