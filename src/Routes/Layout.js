import React, { useContext } from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import { AuthContext } from '../context/AuthContext'


function Layout() {
    
    const {currentUser} = useContext(AuthContext)

    const ProtectedRoute = ({children}) =>{
      if (!currentUser){
        return <Navigate to="/login"/>
      }
      return children
    }

  return (
   <Router>
    <Routes>
        <Route path="/" element={ <ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
    </Routes>
   </Router>
  )
}

export default Layout