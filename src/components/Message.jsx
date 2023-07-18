import React, { useContext, useRef,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

function Message({message}) {
 
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  

  return (
    <div className= {`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
      <div className="message-info">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  )
}

export default Message