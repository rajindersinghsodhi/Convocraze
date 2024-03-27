import React, { useState } from 'react'
import logo from '../appLogo.png';
import './LoginRegister.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import {auth} from "../firebase.js";

function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='container'>
        <img src={logo} alt="" />
        <div className='form__container'>
            <span className='form__title'>Login to Convocraze</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password' />
                <input style={{display: "none"}} type="file" id='file'/>
                <button>Login</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Don't have an account? <Link to='/register'>Register Here</Link></p>
        </div>
    </div>
  )
}

export default Login