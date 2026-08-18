import React from 'react'
import { NavLink } from 'react-router'

export const NavBarAdmin = () => {
  return (
    <nav className='NavBarAdmin'>

      {/*PUBLI*/}
      <ul>
        <li>
          <NavLink to='/admin/cars'>Coches</NavLink>
          <NavLink to='/admin'>HomeAdmin</NavLink>
          <NavLink to='/admin/users'>Usuarios</NavLink>
          <NavLink to='/admin/reservations'>Reservas</NavLink>
        </li>
      </ul>

      {/*ADMIN*/}
      <ul>
        <li>
          <NavLink to='/admin/cars'>Coches</NavLink>
          <NavLink to='/admin'>HomeAdmin</NavLink>
          <NavLink to='/admin/users'>Usuarios</NavLink>
          <NavLink to='/admin/reservations'>Reservas</NavLink>
        </li>
      </ul>

      {/*USER*/}
      <ul>
        <li>
          <NavLink to='/admin/cars'>Coches</NavLink>
          <NavLink to='/admin'>HomeAdmin</NavLink>
          <NavLink to='/admin/users'>Usuarios</NavLink>
          <NavLink to='/admin/reservations'>Reservas</NavLink>
        </li>
      </ul>
    </nav>
  )
}