import React from 'react'
import AuthProvider from './contexts/auth.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SplitsProvider } from './contexts/splitContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthProvider>
      
        <App />
      
      </AuthProvider>

  </React.StrictMode>

)
