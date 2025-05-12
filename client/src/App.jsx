import React from 'react'
import { HashRouter  as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './Components/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import AddInfluencer from './Components/admin/AddInfluencer'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import InfleuncerProfile from './pages/InfleuncerProfile'



const App = () => {
  return (
    <Router>
      {/* <div className='bg-white shadow-md sticky top-0 z-50'>  */}
<Navbar/>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path ="/" element = {<Home/>} />
        <Route path ="/login" element = {<Login/>} />
        <Route path ="/register" element = {<Register/>} />
        <Route path ="/auth/admin" element = {<AdminDashboard/>} />
        <Route path ="/auth/profile" element = {<Profile/>} />
        <Route path='/influencer/:id' element={<InfleuncerProfile/>}/>
        <Route path='/add-influencer' element={<AddInfluencer/>}/>
      </Routes>
      {/* </div> */}
      <ToastContainer/>
    </Router>
  )
}

export default App