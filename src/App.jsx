import { useState } from 'react'
import AuthProvider from "./contexts/auth.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from './pages/signup'
import Login from './pages/login'
import UpdateProfile from './pages/UpdateProfile.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

import Dashboard from './pages/dashboard.jsx'
import LogToday from './pages/log/LogToday.jsx'
import Progress from './pages/Progress.jsx'
import Settings from './pages/Settings.jsx'
import Friends from './pages/Friends.jsx'



import Nav from './components/Nav.jsx'
import PrivateRoutes from "./components/PrivateRoutes.jsx"

import './App.css'




function App() {
  const [count, setCount] = useState(0)



  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Nav />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/log-today' element={<LogToday />} />
            <Route path='/progress' element={<Progress/>} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/friends' element={<Friends />} />
            
          </Route>
          
          <Route path='/update-profile' element={<UpdateProfile />} />
        </Route>
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login />} />


      </Routes>

    </BrowserRouter>
  )
}

export default App
