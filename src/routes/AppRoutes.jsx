import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Loader } from '../components/Loader'
import { PrivateRoute } from '../PrivateRoute'

const HomePage = lazy(() => import('../components/public/pages/HomePage').then(m => ({ default: m.HomePage })))
const Cars = lazy(() => import('../components/public/pages/Cars').then(m => ({ default: m.Cars })))
const CarDetail = lazy(() => import('../components/public/pages/CarDetail').then(m => ({ default: m.CarDetail })))
const Login = lazy(() => import('../Login').then(m => ({ default: m.Login })))
const Register = lazy(() => import('../components/public/pages/Register').then(m => ({ default: m.Register })))
const ForgotPassword = lazy(() => import('../components/public/pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })))
const ResetPassword = lazy(() => import('../components/public/pages/ResetPassword').then(m => ({ default: m.ResetPassword })))
const Dashboard = lazy(() => import('../components/user/pages/Dashboard').then(m => ({ default: m.Dashboard })))
const ReservationDetail = lazy(() => import('../components/user/pages/ReservationDetail').then(m => ({ default: m.ReservationDetail })))
const ReservationForm = lazy(() => import('../components/public/pages/ReservationForm').then(m => ({ default: m.ReservationForm })))
const BookingSuccess = lazy(() => import('../components/public/pages/BookingSuccess').then(m => ({ default: m.BookingSuccess })))
const BookingCancel = lazy(() => import('../components/public/pages/BookingCancel').then(m => ({ default: m.BookingCancel })))
const HomeAdmin = lazy(() => import('../components/admin/pages/HomeAdmin').then(m => ({ default: m.HomeAdmin })))
const AdminCars = lazy(() => import('../components/admin/pages/cars/AdminCars').then(m => ({ default: m.AdminCars })))
const CreateCar = lazy(() => import('../components/admin/pages/cars/CreateCar').then(m => ({ default: m.CreateCar })))
const EditCar = lazy(() => import('../components/admin/pages/cars/EditCar').then(m => ({ default: m.EditCar })))
const GestionUsuarios = lazy(() => import('../components/admin/pages/users/GestionUsuarios').then(m => ({ default: m.GestionUsuarios })))
const AdminReservation = lazy(() => import('../components/admin/pages/reservations/AdminReservation').then(m => ({ default: m.AdminReservation })))

export const AppRoutes = () => {
  return (
      <Suspense fallback={<Loader />}>
        <Routes>
          {/*PUBLIC*/}
          <Route path='/' element={<HomePage />} />
          <Route path='/cars' element={<Cars />} />
          <Route path="/car/:id" element={<CarDetail />} />

          {/*AUTH*/}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/*USER*/}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/reservations/:id" element={<PrivateRoute><ReservationDetail /></PrivateRoute>} />
          <Route path="/reservar/:carId" element={<PrivateRoute><ReservationForm /></PrivateRoute>} />
          <Route path="/reservar/confirmacion" element={<PrivateRoute><BookingSuccess /></PrivateRoute>} />
          <Route path="/reservar/cancelado" element={<PrivateRoute><BookingCancel /></PrivateRoute>} />

          {/*ADMIN*/}
          <Route path='/admin' element={<PrivateRoute adminOnly><HomeAdmin /></PrivateRoute>} />
          <Route path='/admin/cars' element={<PrivateRoute adminOnly><AdminCars /></PrivateRoute>} />
          <Route path='/admin/cars/create' element={<PrivateRoute adminOnly><CreateCar /></PrivateRoute>} />
          <Route path='/admin/cars/:id' element={<PrivateRoute adminOnly><EditCar /></PrivateRoute>} />
          <Route path='/admin/users' element={<PrivateRoute adminOnly><GestionUsuarios /></PrivateRoute>} />
          <Route path='/admin/reservations' element={<PrivateRoute adminOnly><AdminReservation /></PrivateRoute>} />
        </Routes>
      </Suspense>
  )
}