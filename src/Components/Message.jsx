import React, { useContext, useEffect, useRef } from 'react';
import './Messages.scss';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  if (!message) {
    return null;
  }

  const isCurrentUserMessage = message.senderId === currentUser.uid;
  const messageClass = isCurrentUserMessage ? 'messages_sent' : 'content__messages';

  return (
    <div className='messages' ref={ref}>
      <div className="info__messages">
        <img src={isCurrentUserMessage ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>Just Now</span>
      </div>
      <div className={messageClass}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
