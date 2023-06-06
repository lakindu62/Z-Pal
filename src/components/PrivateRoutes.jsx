import React from 'react'
import { useAuth } from '../contexts/auth'
import {Route , Navigate , Outlet} from "react-router-dom"
import Dashboard from '../pages/dashboard'

export default function PrivateRoutes({...props}) {

    const {currentUser} = useAuth() 
   

  return (
    currentUser ? <Outlet /> : <Navigate to="/login" />
  )
}

