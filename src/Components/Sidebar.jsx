import React from 'react'
import './Sidebar.scss'
import Chats from './Chats'
import logo from '../appLogo.png';
import {signOut} from "firebase/auth";
import { auth } from '../firebase';

function Sidebar() {
  return (
    <div className='sidebar__home'>
        <header className='header__sidebar'>
            <div className='user__information'>
                <img src={logo} alt="" />
                <span>Rajinder</span>
                <button onClick={()=>signOut(auth)}>Log Out</button>
            </div>
        </header>
        <div className="search__input">
            <input type="text" placeholder='Search'/>
        </div>
        <div className="chats__container">
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>
            <Chats/>

        </div>
    </div>
  )
}

export default Sidebar