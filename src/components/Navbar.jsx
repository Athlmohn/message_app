import React, { useContext } from 'react'
import {TbMessages} from 'react-icons/tb'
import {signOut} from 'firebase/auth'
import {auth} from '../Firebase'
import { AuthContext } from '../context/AuthContext'
function Navbar() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      < span className='logo'><TbMessages/></span>
      <div className='user'>
        <img src={currentUser.photoURL} alt="Avatar" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar