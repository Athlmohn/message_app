import React, { useContext } from 'react'
import {IoVideocam,IoPersonAdd} from 'react-icons/io5'
import {SlOptionsVertical} from 'react-icons/sl'
import Messages from '../components/Messages'
import MessageInput from '../components/MesaageInput'
import { ChatContext } from '../context/ChatContext'
function MessagePanel() {

  const {data} = useContext(ChatContext);

  return (
    <div className='messagepanel'>
      <div className="messagepanel-info">
        <span>{data.user?.displayName}</span>
        <div className="messagepanel-icons">
          <IoVideocam/>
          <IoPersonAdd/>
          <SlOptionsVertical/>
        </div>
      </div>
      <Messages/>
      <MessageInput/>
    </div>
  )
}

export default MessagePanel