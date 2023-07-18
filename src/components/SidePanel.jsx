import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

function SidePanel() {
  return (
    <div className='sidepanel'>
     <Navbar/>
     <Search/>
     <Chats/>
    </div>
  )
}

export default SidePanel