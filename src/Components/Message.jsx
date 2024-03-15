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
  const texClass = isCurrentUserMessage ? 'text_sent' : 'text__recieved';
  const messageClass = isCurrentUserMessage ? 'message' : 'message__recieved';

  // console.log(message.date);

  const formatTime = (timestamp) => {
    try {
      // Convert Firebase Timestamp to JavaScript Date object
      const date = timestamp.toDate();

      // Format time using JavaScript Date object
      const options = { hour: 'numeric', minute: 'numeric' };
      return date.toLocaleTimeString(undefined, options);
    } catch (error) {
      console.error('Error formatting time:', error);
      return ''; // Return empty string in case of error
    }
  };

  return (
    <div className={messageClass} ref={ref}>
      <div className="info__messages">
        <img src={isCurrentUserMessage ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>{formatTime(message.date)}</span>
      </div>
      <div className={texClass}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
