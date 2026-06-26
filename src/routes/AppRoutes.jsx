import React from 'react'
import { Route, Router, Routes } from 'react-router'
import { HomeAdmin, EditCar, CreateCar, AdminCars, GestionUsuarios } from '../components/admin/Pages' //archivo de barril desde index.js
import { HomePage } from '../components/public/Pages/HomePage'
import { Cars } from '../components/public/Pages/Cars'
import { Login } from '../Login'
import { AuthProvider } from '../AuthContext'
import {PrivateRoute} from '../PrivateRoute'
import { Dashboard } from '../components/user/Pages/Dashboard'


export const AppRoutes = () => {
  return (
    <AuthProvider>
        <Routes>
          {/*PUBLIC*/}
          <Route path='/' element={<HomePage />} />
          <Route path='/cars' element={<Cars />} />
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
          <Route path='/admin' element={<HomeAdmin />} />
          <Route path='/admin/cars' element={<AdminCars />} />
          <Route path='/admin/cars/create' element={<CreateCar />} />
          <Route path='/admin/cars/:id' element={<EditCar />} />
          <Route path='/admin/users' element={<GestionUsuarios />} />

          {/*USER*/}


        </Routes>
    </AuthProvider>
  )
}
//<Route path='/login' element={<Login />} />  
