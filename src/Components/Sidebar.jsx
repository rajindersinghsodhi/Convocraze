import React, { useContext, useState } from 'react'
import './Sidebar.scss'
import Chats from './Chats'
import {signOut} from "firebase/auth";
import { auth } from '../firebase';
import {AuthContext} from '../Context/AuthContext'
import {db} from '../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    // setDoc,
    // doc,
    // updateDoc,
    // serverTimestamp,
    // getDoc,
  } from "firebase/firestore";

function Sidebar() {
    const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className='sidebar__home'>
        <header className='header__sidebar'>
            <div className='user__information'>
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Log Out</button>
            </div>
        </header>
        <div className="search__input">
            <input type="text" placeholder='Search' 
            onKeyDown={handleKey} 
            onChange={(e)=> setUsername(e.target.value)}
            value={username}/>
            {err && <span>User not found</span>}
            {user && <div className="userChat">
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
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