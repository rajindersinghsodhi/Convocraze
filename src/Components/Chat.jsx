import React from 'react'
import './Chat.scss'
import Message from './Message'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function Chat() {
  return (
    <div className='chat__home'>
        <div className="header__chat">
            <span>Arsh</span>
        </div>
        <div className="message__container">
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>

            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </div>
        <div className="input__chat">
            <input type="text" placeholder='Type a message'/>
            <input style={{display: "none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <AttachFileIcon/>
                </label>
            <SendIcon/>
        </div>
    </div>
  )
}

export default Chat