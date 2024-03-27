import React, { useContext, useEffect, useState } from 'react'
import './Chat.scss'
import Message from './Message'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ChatContext } from '../Context/ChatContext';
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import  chatImage from "../start_a_chat.png";

function Chat() {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    

    const { data } = useContext(ChatContext); 
    const { user } = data; 


    const [messages, setMessages] = useState([])


    const {currentUser} = useContext(AuthContext)


    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle progress or other state changes if needed
                },
                (error) => {
                    console.error("Error uploading image:", error);
                    // Handle the error if upload fails
                },
                () => {
                    // Upload completed successfully, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        })
                        .catch((error) => {
                            console.error("Error getting download URL:", error);
                            // Handle error getting download URL if needed
                        });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
    
        setText("");
        setImg(null);
    };

    

    useEffect(()=> {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        });

        return () => {
            unsub()
        }
    }, [data.chatId])
    
    // console.log(messages)

  return (
    <div className='chat__home'>
        <div className="header__chat">
            <img src={data.user.photoURL} alt="" />
            <span>{user.displayName}</span>
        </div>
        <div className="message__container">
                {messages.length === 0 && (
                    <div className="start__chat">
                        <img src={chatImage} alt="" />
                        <span>Start a new chat!</span>
                    </div>
                )}
                {messages.map(m => (
                    <Message message={m} key={m.id} />
                ))}
            </div>
        <div className="input__chat">
            <input type="text" placeholder='Type a message' onChange={e=>setText(e.target.value)} value={text}/>
            <input style={{display: "none"}} type="file" id='file' onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor="file" id='attachmemnt'>
                    <AttachFileIcon id='attachmemnt'/>
                </label>
            <SendIcon onClick={handleSend}/>
        </div>
    </div>
  )
}

export default Chat