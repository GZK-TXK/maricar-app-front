import React from 'react'
import { Route, Routes } from 'react-router'
import {HomeAdmin, EditCar, CreateCar, AdminCars, GestionUsuarios} from '../components/admin/Pages' //archivo de barril desde index.js
import {HomePage} from '../components/public/Pages/HomePage'


export const AppRoutes = () => {
  return (
<Routes>
  <Route path='/' element={<HomePage />} />
  <Route path='/admin' element={<HomeAdmin />} />
  <Route path='/admin/cars' element={<AdminCars />} />
  <Route path='/admin/cars/create' element={<CreateCar />} />
  <Route path='/admin/cars/:id/edit' element={<EditCar />} />
  <Route path='/admin/users' element={<GestionUsuarios />} />
</Routes>
  )
}
