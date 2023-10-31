import React , {useContext} from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import ForgetPassword from '../pages/ForgetPassword'
import Profile from '../pages/Profile'

import {Routes , Route, Navigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import ProfileDoctor from '../pages/Doctors/ProfileDoctor'

function Routers() {

  const {currentUser} = useContext(AuthContext)
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/services' element={<Services />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:id' element={<DoctorDetails />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/profileDoctor/:id' element={<ProfileDoctor />} />
      <Route path='*' element={<Home />} />
    </Routes>
  )
}

export default Routers