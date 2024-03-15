import React, { useState } from "react";
import logo from "../appLogo.png";
import "./LoginRegister.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { doc, setDoc } from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [err, setErr] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      
      const res = await createUserWithEmailAndPassword(auth, email, password);

      
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

     
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.error(err); 
            setErr(err.message.split(": ")[1]); 
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.error(err); 
      setErr(err.message.split(": ")[1]); 
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="form__container">
        <span className="form__title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your name here" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <AddPhotoAlternateIcon />
            <span>Add Profile Picture</span>
          </label>
          {loading ? <div>Registering...</div> : <button>Sign Up</button>}
          {err && <span>{err}</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
