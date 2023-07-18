import React, { useContext, useEffect,useState } from 'react'
import Message from '../components/Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

function Messages() {

  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(() => {
   const onsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
    doc.exists() && setMessages(doc.data().messages);
   });

   return () =>{ 
    onsub()
  }
  }, [data.chatId])
  

  return (
    <div className='messages'>
      {
        messages.map(m =>(
          <Message message={m} key={m.id}/>
        ))
      }
    </div>
  )
}

export default Messages