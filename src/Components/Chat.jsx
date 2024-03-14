import React, { useContext } from 'react'
import './Chat.scss'
import Message from './Message'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ChatContext } from '../Context/ChatContext';

function Chat() {

    const { data } = useContext(ChatContext);
    const { user } = data;

  return (
    <div className='chat__home'>
        <div className="header__chat">
            <span>{user.displayName}</span>
        </div>
        <div className="message__container">
            <Message/>
            <Message/>
            <Message/>
        </div>
        <div className="input__chat">
            <input type="text" placeholder='Type a message'/>
            <input style={{display: "none"}} type="file" id='file'/>
                <label htmlFor="file" id='attachmemnt'>
                    <AttachFileIcon id='attachmemnt'/>
                </label>
            <SendIcon/>
        </div>
    </div>
  )
}

export default Chat