import React from 'react'
import logo from '../appLogo.png';
import './Messages.scss'

function Message() {
  return (
    <div className='messages'>
      <div className="info__messages">
        <img src={logo} alt="" />
        <span>Just Now</span>
      </div>
      <div className="content__messages">
        <p>I am here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
        {/* <img src={logo} alt="" /> */}
      </div>
    </div>
  )
}

export default Message