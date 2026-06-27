import React from 'react'
import { Route, Router, Routes } from 'react-router'
import { HomeAdmin, EditCar, CreateCar, AdminCars, GestionUsuarios } from '../components/admin/pages' //archivo de barril
import { HomePage } from '../components/public/pages/HomePage'
import { Cars } from '../components/public/pages/Cars'
import { Login } from '../Login'
import { PrivateRoute } from '../PrivateRoute'
import { Dashboard } from '../components/user/pages/Dashboard'
import { Register } from '../components/public/pages/Register'


export const AppRoutes = () => {
  return (
      <Routes>
        {/*PUBLIC*/}
        <Route path='/' element={<HomePage />} />
        <Route path='/cars' element={<Cars />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />


        {/*ADMIN*/}
        <Route path='/admin' element={<PrivateRoute adminOnly><HomeAdmin /></PrivateRoute>} />
        <Route path='/admin/cars' element={<PrivateRoute adminOnly><AdminCars /></PrivateRoute>} />
        <Route path='/admin/cars/create' element={<PrivateRoute adminOnly><CreateCar /></PrivateRoute>} />
        <Route path='/admin/cars/:id' element={<PrivateRoute adminOnly><EditCar /></PrivateRoute>} />
        <Route path='/admin/users' element={<PrivateRoute adminOnly><GestionUsuarios /></PrivateRoute>} />

        {/*USER*/}


      </Routes>
  )
}
//<Route path='/login' element={<Login />} />  
