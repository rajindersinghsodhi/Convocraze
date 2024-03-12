import React from 'react'
import logo from '../appLogo.png';
import './LoginRegister.scss';

function Login() {
  return (
    <div className='container'>
        <img src={logo} alt="" />
        <div className='form__container'>
            <span className='form__title'>Register</span>
            <form action="">
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password' />
                <input style={{display: "none"}} type="file" id='file'/>
                <button>Login</button>
            </form>
            <p>Don't have an account? Register Here</p>
        </div>
    </div>
  )
}

export default Login