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
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";

function Sidebar() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser} = useContext(AuthContext)

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



  const handleSelect = async () => {
    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{
    const res = await getDoc(doc(db, "chats", combineId));

    if(!res.exists()){
        await setDoc(doc(db,"chats",combineId), {messages:[]});

        await updateDoc (doc(db, "userChats", currentUser.uid),{
            [combineId+".userInfo"]:{
                uid:user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            },
            [combineId+".date"]: serverTimestamp()
        });

        await updateDoc (doc(db, "userChats", user.uid),{
            [combineId+".userInfo"]:{
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            },
            [combineId+".date"]: serverTimestamp()
        });
    }
    }catch(err) {

    }

    setUser(null);
    setUsername("")
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
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
        <div className="chats__container">
            <Chats/>
        </div>
    </div>
  )
}

export default Sidebar