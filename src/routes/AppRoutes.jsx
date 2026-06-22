import React from 'react'
import { Route, Routes } from 'react-router'
import {HomeAdmin, EditCar, CreateCar, AdminCars, GestionUsuarios} from '../components/admin/Pages' //archivo de barril desde index.js



export const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element= {<HomeAdmin/>}/>
        <Route path='/editcar' element= {<EditCar/>}/>
        <Route path='/createcar' element= {<CreateCar/>}/>
        <Route path='/admincars' element= {<AdminCars/>}/>
        <Route path='/users' element= {<GestionUsuarios/>}/>
    </Routes>
  )
}
