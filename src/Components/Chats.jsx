import React from 'react'
import logo from '../appLogo.png';
import './Chats.scss'

function Chats() {
  return (
    <div className='chats'>
      <img src={logo} alt="" />
      <span>Rajinder</span>
    </div>
  )
}

export default Chats