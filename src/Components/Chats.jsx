import React, { useContext, useEffect, useState } from 'react'
import './Chats.scss'
import { onSnapshot } from '@firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import {
  doc,
} from "firebase/firestore";
import {db} from '../firebase';
import { ChatContext } from '../Context/ChatContext';


function Chats() {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);


  useEffect(() => {
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
  
      return () => {
        unsub();
      };
    };
      console.log(Object.entries(chats))
    currentUser.uid && getChats();
    // eslint-disable-next-line
  }, [currentUser.uid]);

  const handleSelect = (chat) => {
    dispatch({type:"CHANGE_USER", payload: chat.userInfo})
  }

  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(([key, chat]) => (
        <div className='user__chats' key={key} onClick={()=>handleSelect(chat)}>
          {chat.userInfo && (
            <>
              <img src={chat.userInfo.photoURL} alt="" />
              <div className="user__info">
              <span id='title__chats'>{chat.userInfo.displayName}</span>
              <span id='lastMessage'>{chat?.lastMessage?.text}</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Chats