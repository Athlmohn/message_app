import React from 'react'
import SidePanel from '../components/SidePanel'
import MessagePanel from '../components/MessagePanel'

function Home() {
  return (
    <div className='home'>
      <div className='home-container'>
        <SidePanel/>
        <MessagePanel/>
      </div>
    </div>
  )
}

export default Home